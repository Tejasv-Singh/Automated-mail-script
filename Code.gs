/**
 * ============================================================================
 * COLD EMAIL AUTOMATION SCRIPT (Google Sheets + Gmail)
 * ============================================================================
 * * INSTRUCTIONS:
 * 1. Open your Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Paste this code.
 * 4. Update the "CONFIGURATION" section below.
 * 5. Run 'sendColdEmails'.
 */

// --- CONFIGURATION: EDIT THIS SECTION ---
const SENDER_NAME = "Your Name";
const SENDER_ROLE = "Lead Organizer, Your Event Name";
const ORGANIZATION = "Your Organization / Institute";
const BROCHURE_LINK = "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing"; 
const EMAIL_SUBJECT = "Partnership Opportunity: Your Event x [Company Name]";

// --- EMAIL BODY TEMPLATE ---
function getEmailBody(firstName, company, position, personalNote) {
  return `Hi ${firstName},

${personalNote}

I am reaching out to you as the ${SENDER_ROLE} at ${ORGANIZATION}.

I saw that you are driving initiatives at ${company} as the ${position}, and I believe this could be a great alignment.

We are hosting a major event this upcoming season and would love to have ${company} onboard as a partner. This partnership would help you connect with top talent and amplify your brand presence within our community.

You can view our sponsorship deck here:
${BROCHURE_LINK}

Would you be open to a brief 5-minute chat next week to discuss potential synergy?

Best regards,

${SENDER_NAME}
${SENDER_ROLE}
${ORGANIZATION}`;
}

// --- MAIN FUNCTION ---
function sendColdEmails() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var startRow = 2; // Data starts on row 2 (skipping header)
  var numRows = sheet.getLastRow() - 1; 
  
  if (numRows < 1) {
    Logger.log("No data found.");
    return;
  }

  // Fetch all data (Columns A to I)
  var data = sheet.getRange(startRow, 1, numRows, 9).getValues();

  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    
    // Column Mapping
    var firstName = row[0];       // Col A
    var email = row[2];           // Col C
    var position = row[4];        // Col E
    var company = row[5];         // Col F
    var personalNote = row[7];    // Col H (Custom icebreaker)
    var status = row[8];          // Col I (Status tracking)

    // Check: Email exists AND Status is empty (to prevent duplicates)
    if (email && status === "") {
      
      // Fallback if no personal note is provided
      if (!personalNote) {
        personalNote = "I hope you are having a productive week.";
      }

      var dynamicSubject = EMAIL_SUBJECT.replace("[Company Name]", company);
      var body = getEmailBody(firstName, company, position, personalNote);

      try {
        // --- ACTION: CREATE DRAFT ---
        // We create a draft instead of sending immediately for safety.
        GmailApp.createDraft(email, dynamicSubject, body);
        
        // Update Status
        sheet.getRange(startRow + i, 9).setValue("Draft Created");
        
        // --- HUMAN MIMICRY DELAY ---
        // Random wait between 90 to 190 seconds to avoid spam filters
        var minDelay = 90000;
        var maxDelay = 190000;
        var randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
        
        Logger.log(`Draft created for ${email}. Waiting ${randomDelay/1000} seconds...`);
        Utilities.sleep(randomDelay);
        
      } catch (e) {
        Logger.log(`Error with ${email}: ${e.toString()}`);
        sheet.getRange(startRow + i, 9).setValue("Error: " + e.toString());
      }
    }
  }
}