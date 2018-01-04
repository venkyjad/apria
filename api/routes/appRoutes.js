'use strict';

module.exports = function(app) {
	var fileOperations = require('../controllers/empController');
	
	
	app.route('/employees')
		.post(fileOperations.saveFile)
		.get(fileOperations.getEmployeDetails)
		.patch(fileOperations.saveEmp);

};