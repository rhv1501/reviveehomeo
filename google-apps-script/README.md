# Google Apps Script Setup

Use this script as the backend for the frontend submission flow.

1. Open Google Apps Script and create a new project.
2. Paste the contents of [Code.gs](Code.gs) into the default script file.
3. Link the script to a Google Sheet that contains two tabs named:
   - Normal Enquiries
   - Online Consultations
4. If the script is not bound to the sheet, set a script property named `SPREADSHEET_ID` to the target Google Sheet ID.
5. Deploy as a Web App and allow access from anyone.
6. Copy the deployed Web App URL into `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL`:

   `https://script.google.com/macros/s/AKfycbyg6dCLPJBqbqRVv-E_gDHzHpyRlbalVI7hmwrTj6yiSW-QdTcpX0zQZe89QDQ1hDwsGA/exec`

If you already have older test data or a polluted layout, run `resetLeadSheets()` once from the Apps Script editor after saving the script. That will rebuild both tabs using the clean column set below.

The frontend already sends these fields:

- `sheetName`
- `formType`
- `pagePath`
- `submittedAt`
- `submittedAtIso`
- `timezone`
- `name`
- `email`
- `phone`
- `mobile`
- `age`
- `gender`
- `subject`
- `natureOfProblem`
- `preferredDate`
- `preferredTime`
- `mode`
- `message`
