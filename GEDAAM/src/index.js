// @ts-nocheck
/**
 * @OnlyCurrentDoc
 */

import initialize from './master/_initilialize';
import certificateSheet from './certificates/data-get';
import sendConfirmationEmail from './master/confirmation';

global.initialize = initialize;
global.certificateSheet = certificateSheet;
global.sendConfirmationEmail = sendConfirmationEmail;
