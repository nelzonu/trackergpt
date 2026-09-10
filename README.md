# Daily Expense Tracker

1. Create a Google Spreadsheet.
2. Create columns:
Date | Amount | Category | Notes

3. Open Google Apps Script and paste:

function doPost(e){
 const sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
 const data=JSON.parse(e.postData.contents);

 sheet.appendRow([data.date,data.amount,data.category,data.notes]);

 return ContentService.createTextOutput(JSON.stringify({success:true}))
 .setMimeType(ContentService.MimeType.JSON);
}

function doGet(){
 const sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
 const values=sheet.getDataRange().getValues();

 const result=[];

 for(let i=1;i<values.length;i++){
  result.push({
   date:String(values[i][0]),
   amount:values[i][1],
   category:values[i][2],
   notes:values[i][3]
  });
 }

 return ContentService.createTextOutput(JSON.stringify(result))
 .setMimeType(ContentService.MimeType.JSON);
}

4. Deploy as Web App:
   - Execute as Me
   - Anyone can access

5. Copy the Web App URL into app.js

6. Upload files to GitHub Pages.
