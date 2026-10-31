/**
 * =========================================================================
 * Er. Sunil Pal — Civil Engineer (Boisar, MH)
 * Automated Google Sheets Lead Capture & Instant Email Alert System
 * =========================================================================
 * 
 * Target Email: softer7985@gmail.com
 * Office: Shop No. 7, Bldg No. 10B, Sodhi Residency, Vrindavan Nagari, Boisar
 */

var ADMIN_EMAIL = "softer7985@gmail.com";
var SHEET_NAME = "Website Leads";

/**
 * Initializes table headers automatically if sheet is empty.
 */
function setupSheetHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    var headers = [
      "Date & Time",
      "Reference ID",
      "Enquiry Type",
      "Client Name",
      "Mobile Number",
      "Email Address",
      "Service / Requirement",
      "Location / Area",
      "Budget Range",
      "Client Message / Notes",
      "Lead Status"
    ];
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#0F766E"); // Teal header
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
}

/**
 * Handles incoming POST requests from the website form.
 */
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();
    setupSheetHeaders(sheet);

    var data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    } else {
      data = {};
    }

    var now = new Date();
    var formattedDate = Utilities.formatDate(now, "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");

    var row = [
      formattedDate,
      data.id || "ESP-" + now.getTime(),
      data.type || "General Enquiry",
      data.clientName || "Prospective Client",
      data.phone || "",
      data.email || "-",
      data.serviceOrType || "-",
      data.location || "-",
      data.budget || "-",
      data.messageOrNotes || "-",
      "New Lead"
    ];

    sheet.appendRow(row);

    // Prepare direct click links for email
    var cleanPhone = String(data.phone || "").replace(/\D/g, "");
    var waLink = "https://wa.me/91" + cleanPhone;
    var callLink = "tel:" + cleanPhone;

    var emailSubject = "🚨 New Website Lead: " + (data.clientName || "Client") + " [" + (data.serviceOrType || data.type) + "]";

    var emailHtml = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #ffffff;">' +
      '<div style="background: #080E1E; padding: 22px; color: #ffffff; text-align: center;">' +
        '<h2 style="margin: 0; color: #2DD4BF; font-size: 20px; letter-spacing: 0.5px;">Er. Sunil Pal — Civil Engineer</h2>' +
        '<p style="margin: 6px 0 0 0; font-size: 13px; color: #94a3b8;">New Client Website Enquiry Notification</p>' +
      '</div>' +
      '<div style="padding: 24px;">' +
        '<div style="background: #f0fdfa; border-left: 4px solid #0D9488; padding: 12px 16px; margin-bottom: 20px; border-radius: 4px;">' +
          '<div style="font-size: 17px; font-weight: bold; color: #0f172a;">' + (data.clientName || "Client") + '</div>' +
          '<div style="font-size: 13px; color: #0f766e; margin-top: 3px;">Ref ID: <b>' + (data.id || "-") + '</b> &bull; ' + (data.type || "Enquiry") + '</div>' +
        '</div>' +
        '<table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">' +
          '<tr><td style="padding: 9px 0; color: #64748b; width: 38%; border-bottom: 1px solid #f1f5f9;">Mobile Number:</td><td style="padding: 9px 0; font-weight: bold; color: #0f172a; border-bottom: 1px solid #f1f5f9;"><a href="' + callLink + '" style="color: #0D9488; text-decoration: none;">' + (data.phone || "-") + '</a></td></tr>' +
          '<tr><td style="padding: 9px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Service / Type:</td><td style="padding: 9px 0; font-weight: bold; color: #0f172a; border-bottom: 1px solid #f1f5f9;">' + (data.serviceOrType || "-") + '</td></tr>' +
          '<tr><td style="padding: 9px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Location / Area:</td><td style="padding: 9px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">' + (data.location || "-") + '</td></tr>' +
          '<tr><td style="padding: 9px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Budget Range:</td><td style="padding: 9px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">' + (data.budget || "-") + '</td></tr>' +
          '<tr><td style="padding: 9px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Email Address:</td><td style="padding: 9px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">' + (data.email || "-") + '</td></tr>' +
          '<tr><td style="padding: 9px 0; color: #64748b; vertical-align: top;">Requirement / Notes:</td><td style="padding: 9px 0; color: #334155; line-height: 1.5;">' + (data.messageOrNotes || "-") + '</td></tr>' +
        '</table>' +
        '<div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #f1f5f9;">' +
          '<a href="' + waLink + '" style="background: #10B981; color: #ffffff; padding: 12px 22px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; margin-right: 12px; font-size: 14px;">Chat on WhatsApp</a>' +
          '<a href="' + callLink + '" style="background: #0D9488; color: #ffffff; padding: 12px 22px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 14px;">Call Directly</a>' +
        '</div>' +
      '</div>' +
      '<div style="background: #f8fafc; padding: 14px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">' +
        'Recorded in Google Sheet Register &bull; Boisar, Palghar &bull; Er. Sunil Pal Practice' +
      '</div>' +
    '</div>';

    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: emailSubject,
      htmlBody: emailHtml
    });

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      id: data.id,
      timestamp: formattedDate
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Health check endpoint (for testing via browser URL).
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    message: "Er. Sunil Pal Lead Capture Webhook is running successfully."
  })).setMimeType(ContentService.MimeType.JSON);
}
