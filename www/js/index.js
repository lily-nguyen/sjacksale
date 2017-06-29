(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var jFile = {
		
	/**
	 * contentF: body of the file
	 */
	contentF : null,
	
	/**
	 * nameF: name of the file
	 */
	nameF : null,
	
	/**
	 * formatF : format of the file
	 */
	formatF : null,
	
    initial: function (name, content, formatFile) {
    	this.nameF = name;
    	this.contentF = content;
    	this.formatF = formatFile;
    },

    /**
     * create a new file and save content to the file
     */
    createFile : function () {
    	var file = [];
    	file.push(this.nameF);
    	file.push(this.contentF);
    	file.push(this.formatF);
    	window.FileDatabase.file.createFile(file);
    },
    
    onErrorCreateFile : function (e) {
    	console.log("Create file fail...");
    },
    
    onErrorLoadFs : function (e) {
    	console.log("File system fail...");
    },
    
    writeFile : function (file) {
    	/*
    	file.createWriter(function (fileWriter) {

            fileWriter.onwriteend = function() {
                console.log("Successful file write...");
            };

            fileWriter.onerror = function (e) {
                console.log("Failed file write: " + e.toString());
            };

            dataObj = new Blob([contentF], { type: 'text/csv' });

            fileWriter.write(dataObj);
        });    	*/
    	
        // TODO: write content to file
    },
    
    isRights : function () {
    	return false;
    },
    
    grantRights : function () {
    	window.FileDatabase.file.grantRights();
    }
};

module.exports = jFile;

},{}],2:[function(require,module,exports){
var data = {
	
	/**
	 * 	order of items need to be guaranteed
	 */
	billing : [
		{'id' : 'name',
			'title' : 'Ten San Pham',
			'show' : true
		},
		{'id' : 'prize',
			'title' : 'Gia',
			'show' : true
		},
		{'id' : 'quantity',
			'title' : 'So Luong',
			'show' : true
		},
		{'id' : 'total',
			'title' : 'Thanh Tien',
			'show' : true
		}]	
}

var config = {
		
	getShowData	: function (page) {
		// TODO: make it only one instance
		var itms = data[page];
		
		var itemsId = [];
		for (var i = 0; i < itms.length; i++) {
			if (('show' in itms[i]) && (itms[i]['show'])) {
				itemsId.push(itms[i].id);
			}
			
		}
		return itemsId;
	},
	
	getFullShowData : function (page) {
		// TODO: make it only one instance
		var itms = data[page];
		
		var items = [];
		for (var i = 0; i < itms.length; i++) {
			if (('show' in itms[i]) && (itms[i]['show'])) {
				items.push(itms[i]);
			}
			
		}
		return items;
	}
}

module.exports = config;
},{}],3:[function(require,module,exports){
var jFile = require('./common/jfile');

configure = function () {
	// TODO: check that whether the database folder permission is granted, if it is not, request it
	if (!isDatabaseFolderRights()) {
		grantRights();
	} else {
		
	}
}

function isDatabaseFolderRights () {
	return jFile.isRights();
} 

function grantRights () {
	return jFile.grantRights();
}


module.exports = configure;
},{"./common/jfile":1}],4:[function(require,module,exports){
var CSV = {
		
	NEWLINE	 : "\r\n",
	SEPERATED : ",",
	CSV_FORMAT : 'text/csv'		
		
}

module.exports.CSV = CSV;
},{}],5:[function(require,module,exports){
var billPage = require('./page/billpage');
var configure = require('./configuration');
var app = {
    // Application Constructor
    initialize : function() {
    	alert("initialize");
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady : function() {
        this.initial('deviceready');
    },
    
    initial : function () {
    	configure();
    	billPage.initial();
    }
};

app.initialize();
},{"./configuration":3,"./page/billpage":6}],6:[function(require,module,exports){
var jFile = require('../common/jfile');
var tableConfig = require('../config');
var fileFormat = require('../fileformat').CSV;

var billPage = {
		
	initial	: function () {
		$(".submit-bill").on("click", this.createBill);
	},
	
	createBill : function () {
		var bill = billView.writeToFile(billView.getBill());
		jFile.initial(billView.getFileName(), bill, fileFormat.CSV_FORMAT); 
		jFile.createFile();
	}
}

var billView = {
	
	TOTAL_NAME : 'Tong Cong',	
		
	getBill : function () {
		var billObject = {title : {}, items:[], total: 8000};
		billObject.items.push({name:"San Pham A", prize: 20, quantity: 300, total: 6000});		
		billObject.items.push({name:"San Pham B", prize: 10, quantity: 200, total: 2000});
		return billObject;
	},
	
	getData : function (key, items) {
		for (var i = 0; i < items.length; i++) {
			if (items[i].id === key) {
				return items[i];
			}
		}
	
		return '';
	},
	
	getTitle : function (showIds, fullData) {
		var title = this.getData(showIds[0], fullData).title;
		
		for (var i = 1; i < showIds.length; i++) {
			data = this.getData(showIds[i], fullData);
			title += fileFormat.SEPERATED + data.title;
		}
		
		return title;
	},
	
	/**
	 * showData: 
	 */
	getBodyItem : function (showIds, contentItem) {
		var item = "";
		for (var i = 0; i < showIds.length; i++) {
			item += contentItem[showIds[i]] + fileFormat.SEPERATED;
		}
		
		item = item.substring(0, item.length - fileFormat.SEPERATED.length);
		
		return item;
	},
	
	getBody : function (showIds, content) {
		
		if (content.length == 0) {return "";}
		
		var body = this.getBodyItem(showIds, content[0]);
		
		for (var i = 1; i < content.length; i++) {
			body += fileFormat.NEWLINE + this.getBodyItem(showIds, content[i]);
		}
		
		return body;
	},
	
	getTotal : function (showIds, totalItem) {
		var total = "";
		
		for (var i = 1; i < showIds.length - 2; i++) {
			total += fileFormat.SEPERATED;
		}
		
		total += fileFormat.SEPERATED + this.TOTAL_NAME;
		total += fileFormat.SEPERATED + totalItem;
		
		return total;
	},
	
	/**
	 * convert bill object to string
	 * TODO: using iostream instead of
	 */
	writeToFile : function (content) {
		var showIds = tableConfig.getShowData('billing');
		var data = this.getTitle(showIds, tableConfig.getFullShowData('billing'));
		data = data + fileFormat.NEWLINE + this.getBody(showIds,content.items);
		data = data + fileFormat.NEWLINE + this.getTotal(showIds, content.total);
		return data;
	},
	
	getFileName : function () {
		return 'testexportfile';
	}

}

module.exports = billPage;
},{"../common/jfile":1,"../config":2,"../fileformat":4}]},{},[5]);
