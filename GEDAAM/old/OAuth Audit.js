// This script will do the OAuth audit, and will provide details such as which apps are installed by which users
// Goldy Arora - G Suite Certified Consultant - www.goldyarora.com 
// Written on May 3, 2017

function OAuthCheck() {
  
 
  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getSheetByName("OAuth")
  var values = sheet.getDataRange().getValues()
  var fileArray = [["User's Email Id", "Application Name", "Client Id","Is this Native App", "Is this Anonymous", "Scopes Granted"]]
  
  for(i=1; i <values.length; i++)
  {
    
    var userKey = values[i][0]
    var clientid = "my_customer"
    
   
        try {
   var Token = AdminDirectory.Tokens.list(userKey).items
   for (j=0; j <Token.length; j++){
     var displayText = Token[j].displayText
   var userName = Token[j].userKey
   var clientId = Token[j].clientId
   var anonymous = Token[j].anonymous
   var native = Token[j].nativeApp
   var scopes = Token[j].scopes
   
     fileArray.push([userKey, displayText,clientId,native,anonymous,scopes])
        
                    
   }}
    catch (e){
      Logger.log(e.message)}
 
  Logger.log(fileArray)
  
  }
var range = sheet.getRange(1,2,fileArray.length,6).setValues(fileArray)
}