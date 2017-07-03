var jFile = require('../../common/jfile');
var tableConfig = require('../../config');
var billInputHanlder = require('./billinputhandler'); 
var billDataHandler = require('./billdatahandler');
var fileFormat = require('../../fileformat').CSV;

var billPage = {
		
	initial	: function () {
		billInputHanlder.initial();
		$(".submit-bill").on("click", this.createBill);
	},
	
	createBill : function () {
		var bill = billDataHandler.convertToString(billDataHandler.getBill());
		jFile.initial(billDataHandler.getFileName(), bill, fileFormat.CSV_FORMAT); 
		jFile.createFile();
	}
}

module.exports = billPage;