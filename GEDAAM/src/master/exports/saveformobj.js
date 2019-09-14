if (CONS.criar.jsons) {
  const jsonTab = generateTab('JSONs').sheet.activate();
  jsonTab.clear();
  Object.keys(jsons).forEach((key, r) => {
    Object.keys(jsons[key]).forEach((label, c) => {
      jsonTab.getRange(r, c, 1, 1).setValue(jsons[key][label]);
    });
  });
}
