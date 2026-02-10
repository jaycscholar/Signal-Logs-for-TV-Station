/* 
THIS VERSION UPDATES THE DATA USING THE CELL HEADERS 
so makes it more flexible to add new columns without breaking the script. 
It also handles missing data gracefully by inserting empty strings 
for any headers that are not present in the incoming data. 
*/ 
     
function doPost(e) {

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  // Get header row
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  // Build row based on headers
  const row = headers.map(header => data[header] ?? "");

  sheet.appendRow(row);

  return ContentService.createTextOutput("Success");
}


