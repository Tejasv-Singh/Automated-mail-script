# 📧 Google Sheets Cold Email Automator

A simple, safe, and free system to send personalized cold emails directly from Google Sheets using Google Apps Script. 

**Features:**
* 🚀 **Zero Cost:** Runs entirely on Google's free ecosystem.
* 🔒 **Safe Mode:** Creates Gmail Drafts by default (so you can review before sending).
* 🤖 **Anti-Spam:** Includes randomized time delays (90s - 190s) to mimic human behavior.
* ✨ **Personalization:** Supports custom "icebreaker" lines for every contact.

## 🛠️ Setup Guide

### 1. Prepare your Google Sheet
Create a new Google Sheet and set up the **first row** (headers) exactly like this:

| Col | Header Name | Description |
| :--- | :--- | :--- |
| **A** | First Name | The recipient's first name |
| **B** | Last Name | The recipient's last name |
| **C** | Email | The recipient's email address |
| **D** | Email Validity | (Optional) Notes on if email is valid |
| **E** | Position | e.g., "CTO", "HR Manager" |
| **F** | Company Name | e.g., "Google", "Microsoft" |
| **G** | Website | (Optional) For your reference |
| **H** | Personal Note | **Crucial:** A unique sentence for each person (e.g., "I loved your article on X") |
| **I** | Status | **Leave Empty.** The script writes "Draft Created" here. |

### 2. Install the Script
1. Open your Google Sheet.
2. Go to **Extensions** > **Apps Script**.
3. Delete any code currently in the editor.
4. Copy and paste the code from `Code.gs` in this repository.
5. Edit the **Configuration Section** at the top of the file with your details:
   ```javascript
   const SENDER_NAME = "John Doe";
   const BROCHURE_LINK = "[https://drive.google.com](https://drive.google.com)...";

   Click the Save icon (💾).

### 3. Run It
   Ensure the function sendColdEmails is selected in the top toolbar.

   Click Run.

   Grant Permissions: Google will ask for permission to access your Gmail and Sheets. Click "Review Permissions" -> "Allow".

   Note: If you see "Google hasn't verified this app", click Advanced > Go to (Unsafe) to proceed. (It's safe—it's your own code).

### 4. Check your Drafts
   Go to your Gmail Drafts folder. You will see personalized emails ready to be reviewed and sent!

### ⚠️ Anti-Spam Best Practices
   To avoid having your Gmail account flagged:

   Don't disable the delay: The script waits 1.5 - 3 minutes between emails. This is intentional.

   Volume: Do not send more than 50 emails/day if you have a new account. Max 400/day for established accounts.

   Clean Data: Ensure your email list is verified. High bounce rates will get you blocked.

### 📄 License
This project is open source. Feel free to modify and use it for your outreach campaigns!