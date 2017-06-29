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