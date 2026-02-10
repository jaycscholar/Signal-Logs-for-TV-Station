Check Logs Page
================

Overview
--------
Check Logs Page is a lightweight web page for viewing and reviewing log entries.
It is designed to be simple to run and easy to connect to a Google Sheets log source.

Features
--------
- Simple, static HTML page for quick log review
- Works with a Google Apps Script-backed data source
- Easy to host locally or on any static host

Getting Started
---------------
1) Open [index.html](index.html) in a browser.
2) If you are using the Google Sheets backend, set it up as described below.

Usage
-----
- Load the page and review the log entries.
- Refresh to pull the latest entries from the source.

Google Sheets Script
--------------------
The [apsScriptForGoogleSheets.JS](apsScriptForGoogleSheets.JS) file contains the
Google Apps Script used to expose logs stored in a Google Sheet.

Suggested setup:
1) Create a Google Sheet to hold logs.
2) Open Extensions -> Apps Script.
3) Paste the script from [apsScriptForGoogleSheets.JS](apsScriptForGoogleSheets.JS).
4) Deploy as a Web App and copy the deployment URL.
5) Update the page configuration (if needed) to point to that URL.

Configuration
-------------
- If your page needs a script URL or sheet ID, document it here and where to set it.
- Add any expected column names for the log sheet.

Troubleshooting
---------------
- If the page is blank, verify the Web App URL and deployment permissions.
- If no data loads, confirm the sheet has data and the script has access.

License
-------
Add a license here if you plan to share or distribute this project.
 