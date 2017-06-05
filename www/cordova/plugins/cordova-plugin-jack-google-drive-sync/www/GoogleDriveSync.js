var exec = require('cordova/exec');

var success = function () {
	console.log("success from google drive sync");
}

var error = function () {
	console.log("error from google drive sync");
}

exports.GoogleDriveSync = function(arg0, success, error) {
    exec(success, error, "GoogleDriveSync", "syncFile", [arg0]);
};
