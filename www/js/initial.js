var billPage = require('./page/billpage');
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
    	billPage.initial();
    }
};

app.initialize();