import CONS from '../config/main';
import getJSONFromTab from './imports/get-json';
import StudentFormResponse from '../classes/student-form-response';
import formsDataHashGenerator from './raw/forms-hash-gen';
import createObjectFromSheetInput from './raw/sheet-object-gen';
import studentGenerator from './students/student-gen';
import studentDistributor from './distribution';
import exportGroups from './exports/exportgroups';
import generateTab from '../base/sheet-generator';

const update = (log = []) => {
  const ss = CONS.planilha.usarAtiva // Spreadsheet object
    ? SpreadsheetApp.getActiveSpreadsheet()
    : SpreadsheetApp.openById(CONS.planilha.id);

  const groupsJSONTab = ss.getSheetByName(CONS.abas.JSONTurmas);
  const studentJSONTab = ss.getSheetByName(CONS.abas.JSONAlunos);
  const remainingStudentsFormsTab = ss.getSheetByName(CONS.abas.formsRemanescentes);
  const studentsFormsHashTab = ss.getSheetByName(CONS.abas.controleFormsAlunos);
  const bonusTab = ss.getSheetByName(CONS.abas.bonus);
  const finalGroupsTab = generateTab('Novas Inscrições');

  const responsesHash = formsDataHashGenerator(studentsFormsHashTab, StudentFormResponse);
  const studentFormsObject = createObjectFromSheetInput(
    remainingStudentsFormsTab,
    responsesHash,
    'timestamp'
  );

  const groupsObjectList = getJSONFromTab(groupsJSONTab);
  const newStudentObjects = studentGenerator(studentFormsObject, groupsObjectList, bonusTab);
  Logger.log(studentFormsObject);
  const oldStudentObjects = getJSONFromTab(studentJSONTab);
  const [finalStudents, finalGroups] = studentDistributor(newStudentObjects, groupsObjectList);
  const allStudentObjects = oldStudentObjects.concat(finalStudents);
  exportGroups(finalGroupsTab, finalGroups, allStudentObjects);

  Logger.log(log);
};

export default update;
