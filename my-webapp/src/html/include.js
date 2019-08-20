const include = dependency => HtmlService.createHtmlOutputFromFile(dependency).getContent();

export default include;
