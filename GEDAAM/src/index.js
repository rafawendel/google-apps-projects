// @ts-nocheck

import initialize from './master/initilialize';
import sendConfirmationEmail from './master/features/confirmation-mail';
import update from './master/update';

const onOpen = () => {
  SpreadsheetApp.getUi()
    .createMenu('Funções')
    .addItem('initialize', 'initialize')
    .addItem('update', 'update')
    .addItem('send confirmation emails', 'sendConfirmationEmail')
    .addToUi();
};

global.initialize = initialize;
global.update = update;
global.sendConfirmationEmail = sendConfirmationEmail;
global.onOpen = onOpen;
