// @ts-nocheck

import initialize from './master/initilialize';
import sendConfirmationEmail from './master/confirmation-mail';

const onOpen = () => {
  SpreadsheetApp.getUi()
    .createMenu('Funções')
    .addItem('initialize', 'initialize')
    .addToUi();
};

global.initialize = initialize;
global.sendConfirmationEmail = sendConfirmationEmail;
global.onOpen = onOpen;
