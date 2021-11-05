const parser = new (require('simple-excel-to-json').XlsParser)();

const   doc = parser.parseXls2Json('./demo1.xlsx');


console.log(doc[0]);