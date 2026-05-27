export type LeadSheetName = "Normal Enquiries" | "Online Consultations";

type SubmissionContext = {
  sheetName: LeadSheetName;
  formType: string;
  pagePath: string;
};

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL?.trim();

const pad = (value: number) => String(value).padStart(2, "0");

const formatTimestamp = (date: Date) => {
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const offsetMinutes = -date.getTimezoneOffset();
  const offsetSign = offsetMinutes >= 0 ? "+" : "-";
  const offsetHours = pad(Math.floor(Math.abs(offsetMinutes) / 60));
  const offsetRemainder = pad(Math.abs(offsetMinutes) % 60);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${offsetSign}${offsetHours}:${offsetRemainder}`;
};

const toFormBody = (entries: Record<string, string>) => {
  const params = new URLSearchParams();

  Object.entries(entries).forEach(([key, value]) => {
    params.append(key, value);
  });

  return params;
};

export const buildSubmissionRecord = (
  context: SubmissionContext,
  fields: Record<string, string>,
) => {
  const now = new Date();

  return {
    sheetName: context.sheetName,
    formType: context.formType,
    pagePath: context.pagePath,
    submittedAt: formatTimestamp(now),
    submittedAtIso: now.toISOString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "local",
    ...Object.fromEntries(
      Object.entries(fields).filter(([, value]) => value.trim() !== ""),
    ),
  };
};

export const buildNormalEnquirySubmission = (params: {
  name: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  subject: string;
  message: string;
  pagePath: string;
}) =>
  buildSubmissionRecord(
    {
      sheetName: "Normal Enquiries",
      formType: "Normal Contact Enquiry",
      pagePath: params.pagePath,
    },
    {
      name: params.name,
      email: params.email,
      phone: params.phone,
      age: params.age,
      gender: params.gender,
      subject: params.subject,
      message: params.message,
    },
  );

export const buildOnlineConsultationSubmission = (params: {
  name: string;
  email: string;
  mobile: string;
  age: string;
  natureOfProblem: string;
  preferredDate: string;
  preferredTime: string;
  mode: string;
  message: string;
  pagePath: string;
}) =>
  buildSubmissionRecord(
    {
      sheetName: "Online Consultations",
      formType: "Online Consultation",
      pagePath: params.pagePath,
    },
    {
      name: params.name,
      email: params.email,
      mobile: params.mobile,
      age: params.age,
      natureOfProblem: params.natureOfProblem,
      preferredDate: params.preferredDate,
      preferredTime: params.preferredTime,
      mode: params.mode,
      message: params.message,
    },
  );

export const submitLeadToAppsScript = async (
  record: Record<string, string>,
) => {
  if (!APPS_SCRIPT_URL) {
    throw new Error(
      "Missing NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL. Add your deployed Apps Script web app URL to the frontend environment.",
    );
  }

  const response = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: toFormBody(record).toString(),
  });

  return response;
};