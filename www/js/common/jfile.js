var jFile = {
		
	NEWLINE	 : "\r\n",
	SEPERATED : ",",
		
	contentF : null,
	
    initial: function (content) {
    	contentF = content;
    },

    createFile : function () {
    	
    	$this = this;
    	
    	window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) {

    	    console.log('file system open: ' + dirEntry.name);
    	    dirEntry.getFile("fileToAppend.csv", {create: true, exclusive: false}, function(fileEntry) {
    	    	
    	    	$this.writeFile(fileEntry);
    	    	
            }, this.onErrorCreateFile);

    	}, this.onErrorLoadFs); 
    	
    },
    
    onErrorCreateFile : function (e) {
    	console.log("Create file fail...");
    },
    
    onErrorLoadFs : function (e) {
    	console.log("File system fail...");
    },
    
    writeFile : function (file) {
    	file.createWriter(function (fileWriter) {

            fileWriter.onwriteend = function() {
                console.log("Successful file write...");
            };

            fileWriter.onerror = function (e) {
                console.log("Failed file write: " + e.toString());
            };

            dataObj = new Blob([contentF], { type: 'text/csv' });

            fileWriter.write(dataObj);
        });    	
    }
};

module.exports = jFile;
