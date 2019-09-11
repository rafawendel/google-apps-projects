// @ts-nocheck

import initialize from './master/initilialize';
import sendConfirmationEmail from './master/confirmation';

global.initialize = initialize;
global.sendConfirmationEmail = sendConfirmationEmail;
