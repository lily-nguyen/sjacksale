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
       
    isRights : function () {
    	return false;
    },
    
    grantRights : function () {
    	window.FileDatabase.file.grantRights();
    }
};

module.exports = jFile;
