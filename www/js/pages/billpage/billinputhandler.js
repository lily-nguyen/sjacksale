(function ($, window) {
	
	function getNewRow () {
		var newRow = '<tr class="item">' +
					'<td><input class="subitem" type="text" id="name"></td>' +
	        		'<td><input class="subitem" type="text" id="price"></td>' +
	        		'<td><input class="subitem" type="text" id="quantity"></td>' +
	        		'<td><input class="subitem" type="text" id="total"></td>' +
	        		'</tr>';
		return newRow;
	}
	
	function addLastRow($el) {
		$el.after(getNewRow());
		var newRow = $el.next('.item');
		initialAddLastRow(newRow);
	}
	
	function isLastRow ($element) {
		var $nextItem = $element.next('.item');
		return $nextItem.length == 0;
	}
	
	function getRowParent ($element) {
		return $element.parents('.item');
	}
	
	function addLastRowEvent ($elements) {
		$elements.on("click", function () {
			var $parent = getRowParent($(this));
			if (isLastRow($parent)) {
				addLastRow($parent);
			}			
		})		
	}
	
	/**
	 * add event that if the last row is using, add new last row.
	 * @param $element. If a specified $element is defined, add the event for all its children ('.subitem'). 
	 * 			If not, add the event for all elements with class '.subitem'
	 * @returns
	 */
	function initialAddLastRow ($element) {
		
		if ($element) {
			$subitems = $element.find('.subitem')
		} else {
			$subitems = $('.subitem');
		}
		
		addLastRowEvent($subitems);
	}
	
	function initialEditSelectedRow () {
		
	}
	
	function initialSaveEdittedRow () {
		
	}
	
	var inputHanlder = {
		initial	: function () {
			initialEditSelectedRow();
			initialSaveEdittedRow();
			initialAddLastRow();			
		}
	}	
	
	module.exports = inputHanlder;

})($, window)