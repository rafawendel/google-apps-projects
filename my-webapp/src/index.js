// @ts-nocheck
import include from './html/include';

const doGet = () => HtmlService.createTemplateFromFile('page').evaluate();

global.doGet = doGet;
global.include = include;
