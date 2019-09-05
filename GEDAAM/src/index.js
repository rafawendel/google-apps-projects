// @ts-nocheck
/**
 * @OnlyCurrentDoc
 */

import CONS from './config/main';
import initialize from './master/_initilialize';
import duplicateHandler from './master/duplicates';
import certificateSheet from './certificates/data-get';

global.CONS = CONS;
global.initialize = initialize;
global.duplicateHandler = duplicateHandler;
global.certificateSheet = certificateSheet;
