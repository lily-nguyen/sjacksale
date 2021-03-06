var billDataHandler = {
	
	TOTAL_NAME : 'Tong Cong',	
	
	getBill : function () {
		return "";
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
	convertToString : function (content) {
		var showIds = tableConfig.getShowData('billing');
		var data = this.getTitle(showIds, tableConfig.getFullShowData('billing'));
		data = data + fileFormat.NEWLINE + this.getBody(showIds,content.items);
		data = data + fileFormat.NEWLINE + this.getTotal(showIds, content.total);
		return data;
	},
	
	getFileName : function () {
		return 'testexportfile.csv';
	}

}

module.exports = billDataHandler;