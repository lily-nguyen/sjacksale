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