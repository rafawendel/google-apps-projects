import CONS from '../config/main';
import formsDataHashGenerator from './raw/forms-hash-gen';
import duplicateHandler from './raw/duplicates-handler';
import generateTab from './base/sheet-generator';
import StudentFormResponse from '../classes/student-form-response';
import createFormObjects from './jsonhandler';
import studentGenerator from './studentgen';
import groupsMapper from './groupsmap';
import groupsGenerator from './groupsgen';
import studentDistributor from './distribution';
import exportObj from './exports/exportjson';
import exportGroups from './exports/exportgroups';
import exportWaitlist from './exports/exportwaitlist';

const initialize = () => {
  const ss = CONS.planilha.usarAtiva // Spreadsheet object
    ? SpreadsheetApp.getActiveSpreadsheet()
    : SpreadsheetApp.openById(CONS.planilha.id);

  /** Tabs required by modules:
   *  Raw    => Tabs that contain basal data (read-only) that will be interpreted
   *  Hash   => Tabs used for code to interpret raw data
   *  Export => Tabs that will contain data processed to be readable (write-only)
   *  LIST   => Tabs containing ranges that will be converted to arrays
   *  JSON   => Tabs that will be filled with stringified objects
   */
  const studentsFormsTab = ss.getSheetByName(CONS.abas.formsAlunos); // Raw forms data
  const studentsFormsHashTab = generateTab(CONS.abas.controleFormsAlunos); // Hash for forms data interpretation
  const groupsTab = ss.getSheetByName(CONS.abas.turmas); // Raw groups alias LIST
  const bonusTab = ss.getSheetByName(CONS.abas.bonus); // Raw bonuses LIST
  const groupsControlTab = generateTab(CONS.abas.controleTurmas); // Raw groups properties LIST
  const studentJSONTab = generateTab(CONS.abas.JSONAlunos).hideSheet(); // Students JSON LIST (hidden)
  const groupsJSONTab = generateTab(CONS.abas.JSONTurmas).hideSheet(); // Groups JSON LIST (hidden)
  const finalGroupsTab = generateTab(CONS.abas.listaFinal); // Export final list
  const waitlistTab = generateTab(CONS.abas.listaEspera); // Export waitlist

  const responsesHash = formsDataHashGenerator(
    studentsFormsHashTab,
    CONS.atualizar.controleAlunos,
    new StudentFormResponse()
  );

  /* Code that will prompt Spreadsheet user to confirm that data is ready to be read by interpreter
  try {
    SpreadsheetApp.getUi().
  } catch (error) {
    
  } */
  const registerColumn = studentsFormsTab.getRange(responsesHash.register[0]).getColumn();

  const filteredContent = duplicateHandler(studentsFormsTab, registerColumn);
  const duplicatesSheet = generateTab(CONS.abas.duplicatas).hideSheet();
  const size = studentsFormsTab.getLastColumn();
  duplicatesSheet.getRange(1, 1, filteredContent.length, size).setValues(filteredContent);

  const formObject = createFormObjects(duplicatesSheet, responsesHash);
  const groupsMap = groupsMapper(groupsTab);
  const studentObjects = studentGenerator(formObject, groupsMap, bonusTab);
  exportObj(studentJSONTab, studentObjects);
  const groupsObjects = groupsGenerator(groupsControlTab, groupsMap);
  const [finalStudents, finalGroups] = studentDistributor(studentObjects, groupsObjects);
  exportObj(groupsJSONTab, finalGroups);
  exportGroups(finalGroups, finalGroupsTab);
  exportWaitlist(finalStudents, waitlistTab);

  if (!CONS.criar.duplicatas) {
    ss.deleteSheet(duplicatesSheet);
  } else {
    duplicatesSheet.showSheet();
  }
};

export default initialize;
