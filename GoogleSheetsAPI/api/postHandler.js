'use strict';
const { GoogleSpreadsheet } = require('google-spreadsheet');
const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);

//Date array for getting numerical date based on month
let daysPerMonth = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335]

//Get current date, convert to CT (UTC-6) and convert to numerical date
let todayDate = new Date();
todayDate.setHours(todayDate.getHours() - 6);
let todayMonths = daysPerMonth[parseInt(todayDate.getMonth())];
let todayDay = parseInt(todayDate.getDate());
let numericalDay = todayMonths + todayDay;  

module.exports.postExpense = async event => {

  //Hook up with Google!
  await doc.useServiceAccountAuth({
    client_email: process.env.EMAIL,
    private_key: process.env.ACCESS_TOKEN,
  });
  
  //Load document
  await doc.loadInfo(); 

  //Get sheet within document
  const sheet = doc.sheetsByIndex[0];

  //Load document's cells
  await sheet.loadCells();

  //Get body from request (index to modify, and amount)
  let body = JSON.parse(event.body);
  let index = body.index;
  let amount = body.amount;

  //Get the cell to edit based on date and index
  let cellSelection = sheet.getCell(numericalDay, index);

  //Edit the value of the selected cell
  let newTotal = cellSelection.value + amount;
  cellSelection.value = newTotal;

  //Save the modified cell
  await sheet.saveUpdatedCells();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(
      {
        message: "success!",
        input: event,
      },
      null,
      2   
    ),
  };

};

