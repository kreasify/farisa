/******************************************************************************
 * This tutorial is based on the work of Martin Hawksey twitter.com/mhawksey  *
 * But has been simplified and cleaned up to make it more beginner friendly   *
 * All credit still goes to Martin and any issues/complaints/questions to me. *
 ******************************************************************************/

// if you want to store your email server-side (hidden), uncomment the next line
 var TO_ADDRESS = "rivebit.id@gmail.com";

// spit out all the keys/values from the form in HTML for email
// uses an array of keys if provided or the object to determine field order
function formatMailBody(obj, order) {
  var result = "";
  if (!order) {
    order = Object.keys(obj);
  }
  
  // loop over all keys in the ordered form data
  for (var idx in order) {
    var key = order[idx];
    result += "<h4 style='text-transform: capitalize; margin-bottom: 0'>" + key + "</h4><div>" + sanitizeInput(obj[key]) + "</div>";
    // for every key, concatenate an `<h4 />`/`<div />` pairing of the key name and its value, 
    // and append it to the `result` string created at the start.
  }
  return result; // once the looping is done, `result` will be one long string to put in the email body
}

// sanitize content from the user - trust no one 
// ref: https://developers.google.com/apps-script/reference/html/html-output#appendUntrusted(String)
function sanitizeInput(rawInput) {
   var placeholder = HtmlService.createHtmlOutput(" ");
   placeholder.appendUntrusted(rawInput);
  
   return placeholder.getContent();
 }

function doPost(e) {

  try {
    Logger.log(e); // the Google Script version of console.log see: Class Logger
    record_data(e);
    
    // shorter name for form data
    var mailData = e.parameters;
    var emailQuotaRemaining = MailApp.getRemainingDailyQuota();
    //var htmlBody = HtmlService.createHtmlOutputFromFile('mail_template').getContent();
    var html = HtmlService.createTemplateFromFile('mail');
    html.data = mailData;
    var htmlBody = html.evaluate().getContent();

    // names and order of form elements (if set)
    var orderParameter = e.parameters.formDataNameOrder;
    var dataOrder;
    if (orderParameter) {
      dataOrder = JSON.parse(orderParameter);
    }
    
    // determine recepient of the email
    // if you have your email uncommented above, it uses that `TO_ADDRESS`
    // otherwise, it defaults to the email provided by the form's data attribute
    var sendEmailTo = (typeof TO_ADDRESS !== "undefined") ? TO_ADDRESS : mailData.formGoogleSendEmail;
    
    // send email if to address is set
    // if (sendEmailTo) {
    //   MailApp.sendEmail({
    //     to: String(sendEmailTo),
    //     subject: "Sisa Confirmation Order: " + emailQuotaRemaining,
    //     // replyTo: String(mailData.email), // This is optional and reliant on your form actually collecting a field named `email`
    //     htmlBody: formatMailBody(mailData, dataOrder)
    //   });
    // }

    // MailApp.sendEmail({
    //   to: String(mailData.email),
    //   subject: "Konfirmasi Pesanan",
    //   // replyTo: String(mailData.email), // This is optional and reliant on your form actually collecting a field named `email`
    //   htmlBody: htmlBody,
    // });

    return ContentService    // return json success results
          .createTextOutput(
            JSON.stringify({"result":"success",
                            "data": JSON.stringify(e.parameters) }))
          .setMimeType(ContentService.MimeType.JSON);
  } catch(error) { // if error return this
    Logger.log(error);
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": error}))
          .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e){
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var values = sheet.getActiveSheet().getDataRange().getValues();
  var data = [];
  var id = Utilities.formatDate(new Date(), "GMT+7", "MMd");
  var d = new Date();
  var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
  };
  var waktu = [d.toLocaleString("id-ID", options)];

  for (var i =values.length - 1; i >= 1; i--) {
    var row = values[i];
    var feedback = {};
    feedback['waktu'] = d.toLocaleString('id-ID', options);
    feedback['id'] = id + '00' + i;
    feedback['nama'] = row[1];
    feedback['email'] = row[2];
    feedback['hp'] = row[3];
    feedback['alamat'] = row[4];
    feedback['kode_pos'] = row[5];
    feedback['berat'] = row[6];
    feedback['kurir'] = row[7];
    feedback['ongkir'] = row[8];
    feedback['total_ongkir'] = row[9];
    feedback['subtotal'] = row[10];
    feedback['total_bayar'] = row[11];
    feedback['nama_item_1'] = row[12];
    feedback['ukuran_item_1'] = row[13];
    feedback['harga_item_1'] = row[14];
    feedback['berat_item_1'] = row[15];
    feedback['jumlah_item_1'] = row[16];
    feedback['gambar_item_1'] = row[17];
    if (row[18] !== "") {
    feedback['nama_item_2'] = row[18];
    feedback['ukuran_item_2'] = row[19];
    feedback['harga_item_2'] = row[20];
    feedback['berat_item_2'] = row[21];
    feedback['jumlah_item_2'] = row[22];
    feedback['gambar_item_2'] = row[23];
    }
    if (row[24] !== "") {
    feedback['nama_item_3'] = row[24];
    feedback['ukuran_item_3'] = row[25];
    feedback['harga_item_3'] = row[26];
    feedback['berat_item_3'] = row[27];
    feedback['jumlah_item_3'] = row[28];
    feedback['gambar_item_3'] = row[29];
    }
    if (row[30] !== "") {
    feedback['nama_item_4'] = row[30];
    feedback['ukuran_item_4'] = row[31];
    feedback['harga_item_4'] = row[32];
    feedback['berat_item_4'] = row[33];
    feedback['jumlah_item_4'] = row[34];
    feedback['gambar_item_4'] = row[35];
    }
    if (row[36] !== "") {
    feedback['nama_item_5'] = row[36];
    feedback['ukuran_item_5'] = row[37];
    feedback['harga_item_5'] = row[38];
    feedback['berat_item_5'] = row[39];
    feedback['jumlah_item_5'] = row[40];
    feedback['gambar_item_5'] = row[41];
    }
    if (row[42] !== "") {
    feedback['nama_item_6'] = row[42];
    feedback['ukuran_item_6'] = row[43];
    feedback['harga_item_6'] = row[44];
    feedback['berat_item_6'] = row[45];
    feedback['jumlah_item_6'] = row[46];
    feedback['gambar_item_6'] = row[47];
    }
    if (row[48] !== "") {
    feedback['nama_item_7'] = row[48];
    feedback['ukuran_item_7'] = row[49];
    feedback['harga_item_7'] = row[50];
    feedback['berat_item_7'] = row[51];
    feedback['jumlah_item_7'] = row[52];
    feedback['gambar_item_7'] = row[53];
    }
    if (row[54] !== "") {
    feedback['nama_item_8'] = row[54];
    feedback['ukuran_item_8'] = row[55];
    feedback['harga_item_8'] = row[56];
    feedback['berat_item_8'] = row[57];
    feedback['jumlah_item_8'] = row[58];
    feedback['gambar_item_8'] = row[59];
    }
    //feedback['products'] = row[59];

    data.push(feedback);
  }

  return ContentService
  .createTextOutput(JSON.stringify(data))
  .setMimeType(ContentService.MimeType.JSON);
}


/**
 * record_data inserts the data received from the html form submission
 * e is the data received from the POST
 */
function record_data(e) {
  var lock = LockService.getDocumentLock();
  lock.waitLock(30000); // hold off up to 30 sec to avoid concurrent writing
  
  try {
    Logger.log(JSON.stringify(e)); // log the POST data in case we need to debug it
    
    // select the 'responses' sheet by default
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = e.parameters.formGoogleSheetName || "responses";
    var sheet = doc.getSheetByName(sheetName);
    
    var oldHeader = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var newHeader = oldHeader.slice();
    var fieldsFromForm = getDataColumns(e.parameters);
    //var row = [new Date()]; // first element in the row should always be a timestamp
    // var row = [Utilities.formatDate(new Date(), "GMT+7", "EEEE, d MMMM yyyy HH:mm:ss")];
    // https://stackoverflow.com/questions/2388115/get-locale-short-date-format-using-javascript
    var d = new Date();
    var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };
    var row = [d.toLocaleString("id-ID", options)];
    
    // loop through the header columns
    for (var i = 1; i < oldHeader.length; i++) { // start at 1 to avoid Timestamp column
      var field = oldHeader[i];
      var output = getFieldFromData(field, e.parameters);
      row.push(output);
      
      // mark as stored by removing from form fields
      var formIndex = fieldsFromForm.indexOf(field);
      if (formIndex > -1) {
        fieldsFromForm.splice(formIndex, 1);
      }
    }
    
    // set any new fields in our form
    for (var i = 0; i < fieldsFromForm.length; i++) {
      var field = fieldsFromForm[i];
      var output = getFieldFromData(field, e.parameters);
      row.push(output);
      newHeader.push(field);
    }
    
    // more efficient to set values as [][] array than individually
    var nextRow = sheet.getLastRow() + 1; // get next row
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);

    // update header row with any new data
    if (newHeader.length > oldHeader.length) {
      sheet.getRange(1, 1, 1, newHeader.length).setValues([newHeader]);
    }
  }
  catch(error) {
    Logger.log(error);
  }
  finally {
    lock.releaseLock();
    return;
  }

}

function getDataColumns(data) {
  return Object.keys(data).filter(function(column) {
    return !(column === 'formDataNameOrder' || column === 'formGoogleSheetName' || column === 'formGoogleSendEmail' || column === 'honeypot');
  });
}

function getFieldFromData(field, data) {
  var values = data[field] || '';
  var output = values.join ? values.join(', ') : values;
  return output;
}