import CONS from '../config/main';
import formsDataHashGenerator from './raw/forms-hash-gen';
import generateTab from '../base/sheet-generator';
import StudentFormResponse from '../classes/student-form-response';
import createObjectFromSheetInput from './raw/sheet-object-gen';
import studentGenerator from './students/student-gen';
import groupsMapper from './groups/group-mapper';
import groupsGenerator from './groups/groups-gen';
import studentDistributor from './distribution';
import exportObj from './exports/exportjson';
import exportGroups from './exports/exportgroups';

const initialize = (log = []) => {
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
  const studentJSONTab = generateTab(CONS.abas.JSONAlunos); // .hideSheet(); // Students JSON LIST (hidden)
  const groupsJSONTab = generateTab(CONS.abas.JSONTurmas); // .hideSheet(); // Groups JSON LIST (hidden)
  const finalGroupsTab = generateTab(CONS.abas.listaFinal); // Export final list

  const responsesHash = formsDataHashGenerator(studentsFormsHashTab, StudentFormResponse);
  const studentFormsObject = createObjectFromSheetInput(
    studentsFormsTab,
    responsesHash,
    'timestamp'
  );

  const groupsObjects = groupsGenerator(groupsControlTab, groupsMapper(groupsTab));
  const studentObjects = studentGenerator(studentFormsObject, groupsObjects, bonusTab);
  const [finalStudents, finalGroups] = studentDistributor(studentObjects, groupsObjects);

  // Export all the final processed data, this should prompt user
  exportObj(studentJSONTab, studentObjects);
  exportObj(groupsJSONTab, finalGroups);
  exportGroups(finalGroupsTab, finalGroups, finalStudents);

  Logger.log(log);
};

export default initialize;
