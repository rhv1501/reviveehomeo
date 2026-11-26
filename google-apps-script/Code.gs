const CONFIG = {
  normalSheetName: "Normal Enquiries",
  onlineSheetName: "Online Consultations",
  ctaClicksSheetName: "CTA Clicks",
  timestampFormat: "yyyy-MM-dd HH:mm:ss",
  timezone: Session.getScriptTimeZone(),
};

const UTM_HEADERS = [
  "UTM Source",
  "UTM Medium",
  "UTM Campaign",
  "UTM Term",
  "UTM Content",
];

const SHEET_SCHEMAS = {
  [CONFIG.normalSheetName]: [
    "Timestamp",
    "Submitted At (ISO)",
    "Timezone",
    "Name",
    "Email",
    "Phone",
    "Age",
    "Gender",
    "Subject",
    "Message",
    "Page Path",
    ...UTM_HEADERS,
  ],
  [CONFIG.onlineSheetName]: [
    "Timestamp",
    "Submitted At (ISO)",
    "Timezone",
    "Name",
    "Email",
    "Mobile",
    "Age",
    "Nature of Problem",
    "Preferred Date",
    "Preferred Time",
    "Mode",
    "Message",
    "Page Path",
    ...UTM_HEADERS,
  ],
  [CONFIG.ctaClicksSheetName]: [
    "Timestamp",
    "Submitted At (ISO)",
    "Timezone",
    "Button Type",
    "Button Location",
    "Page Path",
    ...UTM_HEADERS,
  ],
};

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({
      ok: true,
      message: "Revivee Homeo Clinic Apps Script is running.",
    }),
  ).setMimeType(ContentService.MimeType.JSON);
}

function resetLeadSheets() {
  const spreadsheet = getSpreadsheet();

  Object.entries(SHEET_SCHEMAS).forEach(([sheetName, headers]) => {
    let sheet = spreadsheet.getSheetByName(sheetName);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
    } else {
      sheet.clear();
      const maxColumns = sheet.getMaxColumns();
      if (maxColumns > headers.length) {
        sheet.deleteColumns(headers.length + 1, maxColumns - headers.length);
      }
      if (sheet.getMaxColumns() < headers.length) {
        sheet.insertColumnsAfter(sheet.getMaxColumns(), headers.length - sheet.getMaxColumns());
      }
    }

    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  });

  return spreadsheet;
}

function doPost(e) {
  try {
    const payload = parsePayload(e);
    const sheetName = resolveSheetName(payload);
    const sheet = getOrCreateSheet(sheetName);
    const row = buildRow(payload, sheetName);

    normalizeSheetLayout(sheet, SHEET_SCHEMAS[sheetName]);
    sheet.appendRow(headersToRow(sheet, row, SHEET_SCHEMAS[sheetName]));

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true, sheetName }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        ok: false,
        error: String(error && error.message ? error.message : error),
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function parsePayload(e) {
  const raw = (e && e.parameter) || {};
  if (Object.keys(raw).length > 0) {
    return raw;
  }

  if (!e || !e.postData || !e.postData.contents) {
    return {};
  }

  const contentType = (e.postData.type || "").toLowerCase();
  if (contentType.includes("application/json")) {
    return JSON.parse(e.postData.contents);
  }

  return e.parameter || {};
}

function resolveSheetName(payload) {
  const incoming = String(
    payload.sheetName || payload.formType || "",
  ).toLowerCase();

  if (incoming.includes("cta") || incoming.includes("click")) {
    return CONFIG.ctaClicksSheetName;
  }

  if (incoming.includes("online")) {
    return CONFIG.onlineSheetName;
  }

  return CONFIG.normalSheetName;
}

function getOrCreateSheet(sheetName) {
  const spreadsheet = getSpreadsheet();
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  return sheet;
}

function getSpreadsheet() {
  const scriptProperties = PropertiesService.getScriptProperties();
  const spreadsheetId = scriptProperties.getProperty("SPREADSHEET_ID");

  if (spreadsheetId) {
    return SpreadsheetApp.openById(spreadsheetId);
  }

  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (activeSpreadsheet) {
    return activeSpreadsheet;
  }

  throw new Error(
    "Set the SPREADSHEET_ID script property or bind this script to the target Google Sheet.",
  );
}

function buildUtmFields(payload) {
  return {
    "UTM Source": payload.utm_source || "",
    "UTM Medium": payload.utm_medium || "",
    "UTM Campaign": payload.utm_campaign || "",
    "UTM Term": payload.utm_term || "",
    "UTM Content": payload.utm_content || "",
  };
}

function buildRow(payload, sheetName) {
  const submittedAt = payload.submittedAt
    ? String(payload.submittedAt)
    : Utilities.formatDate(new Date(), CONFIG.timezone, CONFIG.timestampFormat);
  const utmFields = buildUtmFields(payload);

  if (sheetName === CONFIG.ctaClicksSheetName) {
    return {
      Timestamp: submittedAt,
      "Submitted At (ISO)": payload.submittedAtIso || new Date().toISOString(),
      Timezone: payload.timezone || CONFIG.timezone,
      "Button Type": payload.buttonType || "",
      "Button Location": payload.buttonLocation || "",
      "Page Path": payload.pagePath || "",
      ...utmFields,
    };
  }

  if (sheetName === CONFIG.onlineSheetName) {
    return {
      Timestamp: submittedAt,
      "Submitted At (ISO)": payload.submittedAtIso || new Date().toISOString(),
      Timezone: payload.timezone || CONFIG.timezone,
      Name: payload.name || "",
      Email: payload.email || "",
      Mobile: payload.mobile || "",
      Age: payload.age || "",
      "Nature of Problem": payload.natureOfProblem || "",
      "Preferred Date": payload.preferredDate || "",
      "Preferred Time": payload.preferredTime || "",
      Mode: payload.mode || "",
      Message: payload.message || "",
      "Page Path": payload.pagePath || "",
      ...utmFields,
    };
  }

  return {
    Timestamp: submittedAt,
    "Submitted At (ISO)": payload.submittedAtIso || new Date().toISOString(),
    Timezone: payload.timezone || CONFIG.timezone,
    Name: payload.name || "",
    Email: payload.email || "",
    Phone: payload.phone || "",
    Age: payload.age || "",
    Gender: payload.gender || "",
    Subject: payload.subject || "",
    Message: payload.message || "",
    "Page Path": payload.pagePath || "",
    ...utmFields,
  };
}

function normalizeSheetLayout(sheet, requiredHeaders) {
  sheet.getRange(1, 1, 1, requiredHeaders.length).setValues([requiredHeaders]);
  sheet.setFrozenRows(1);

  const maxColumns = sheet.getMaxColumns();
  if (maxColumns > requiredHeaders.length) {
    sheet.deleteColumns(
      requiredHeaders.length + 1,
      maxColumns - requiredHeaders.length,
    );
  }
}

function headersToRow(sheet, rowObject, requiredHeaders) {
  const headers =
    requiredHeaders ||
    sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  return headers.map((header) => rowObject[header] ?? "");
}
