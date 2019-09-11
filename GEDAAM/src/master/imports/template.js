import sendConfirmationEmail from '../confirmation-mail';

const groupsJSONList = ss
  .getDataRange()
  .getValues()
  .map(row => JSON.parse(row[0]));
sendConfirmationEmail(groupsJSONList, []);
