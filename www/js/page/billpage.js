var jFile = require('../common/jfile');
var tableConfig = require('../common/config');

var billPage = {
		
	initial	: function () {
		$(".submit-bill").on("click", this.createBill);
	},
	
	createBill : function () {
		var bill = billView.writeToFile(billView.getBill());
		jFile.initial(bill); 
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
			title += jFile.SEPERATED + data.title;
		}
		
		return title;
	},
	
	/**
	 * showData: 
	 */
	getBodyItem : function (showIds, contentItem) {
		var item = "";
		for (var i = 0; i < showIds.length; i++) {
			item += contentItem[showIds[i]] + jFile.SEPERATED;
		}
		
		item = item.substring(0, item.length - jFile.SEPERATED.length);
		
		return item;
	},
	
	getBody : function (showIds, content) {
		
		if (content.length == 0) {return "";}
		
		var body = this.getBodyItem(showIds, content[0]);
		
		for (var i = 1; i < content.length; i++) {
			body += jFile.NEWLINE + this.getBodyItem(showIds, content[i]);
		}
		
		return body;
	},
	
	getTotal : function (showIds, totalItem) {
		var total = "";
		
		for (var i = 1; i < showIds.length - 2; i++) {
			total += jFile.SEPERATED;
		}
		
		total += jFile.SEPERATED + this.TOTAL_NAME;
		total += jFile.SEPERATED + totalItem;
		
		return total;
	},
	
	writeToFile : function (content) {
		var showIds = tableConfig.getShowData('billing');
		var data = this.getTitle(showIds, tableConfig.getFullShowData('billing'));
		data = data + jFile.NEWLINE + this.getBody(showIds,content.items);
		data = data + jFile.NEWLINE + this.getTotal(showIds, content.total);
		return data;
	}

}

module.exports = billPage;