function notifyFolderModification()
{
  var today = new Date();
  var MS_PER_MINUTE = 60000;
  var myStartDate = new Date(today - 5 * MS_PER_MINUTE);
  
  var folders = DriveApp.getFolders();
  
  while (folders.hasNext()) 
 {
   var folder = folders.next();
   var fileSearchQuery = 'modifiedDate > "'+myStartDate.toISOString()+'"';
   var files = folder.searchFiles(fileSearchQuery);
   while (files.hasNext())
   {
     file = files.next();
     var row = []
     row.push(file.getName(),file.getId(),file.getSize());
     Logger.log(folder.getName());
     Logger.log(file.getName());
     var email = Session.getActiveUser().getEmail();
     var subject = "Folder Update Alert - "+folder.getName();
     var message = "Folder updated - "+folder.getName()+" with file - "+file.getName();
     MailApp.sendEmail(email, subject, message);
   }
 }
}
