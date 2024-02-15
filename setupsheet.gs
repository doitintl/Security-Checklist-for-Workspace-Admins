//Script will delete existing sheets and copy each sheet from the public template file.

function setupSheet() {
  // Prompt the user for confirmation
  var ui = SpreadsheetApp.getUi();
  var response = ui.alert('Warning', 'This will delete any existing data in the sheet, including any notes or completed checklists. Do you want to continue?', ui.ButtonSet.YES_NO);

  // Check user's response
  if (response === ui.Button.NO) {
    // If the user chooses not to continue, exit the function
    return;
  }

  // Document ID of the template file
  var templateFileId = '1rbgKhzDYDmPDKuyx9_qR3CWpTX_ouacEKViuPwAUAf8';

  // Open the template file
  var templateFile = SpreadsheetApp.openById(templateFileId);

  // Get all sheets from the template file
  var templateSheets = templateFile.getSheets();

  // Get the current active spreadsheet (user's sheet)
  var currentSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  // Loop through each sheet in the template file and copy it to the user's sheet
  for (var i = 0; i < templateSheets.length; i++) {
    var sheetName = templateSheets[i].getName();

    // Check if a sheet with the same name already exists in the user's sheet
    var existingSheet = currentSpreadsheet.getSheetByName(sheetName);

    // If a sheet with the same name exists, delete it
    if (existingSheet) {
      currentSpreadsheet.deleteSheet(existingSheet);
    }

    // Copy the sheet from the template file to the user's sheet
    templateSheets[i].copyTo(currentSpreadsheet).setName(sheetName);
  }

  // Delete "Sheet1" if it exists in the user's sheet
  var sheet1 = currentSpreadsheet.getSheetByName('Sheet1');
  if (sheet1) {
    currentSpreadsheet.deleteSheet(sheet1);
  }

  // Set the document title to "Security Checklist for Workspace Admins"
  currentSpreadsheet.rename('Security Checklist for Workspace Admins');

  // Inform the user that the setup is complete
  ui.alert('Sheet Setup Complete', 'The sheets have been successfully set up.', ui.ButtonSet.OK);
}