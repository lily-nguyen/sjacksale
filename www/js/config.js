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