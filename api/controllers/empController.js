'use strict';

var mongoose = require('mongoose'),
	mongoXlsx = require('mongo-xlsx'),
	emp = mongoose.model('Employees'),
	multer  = require('multer');
  


// Method to upload file and parse data to MongoDB
exports.saveFile = function(req, res) {
	

	var storage =   multer.diskStorage({
	  destination: function (req, file, callback) {
	    callback(null, './uploads');
	  },
	  filename: function (req, file, callback) {
	    callback(null, file.originalname);
		  }
		});

	// uploading the file with paramter 'file'
	var upload = multer({ storage : storage}).single('file');


	upload(req,res,function(err) {
        if(err) {
            return res.send("Error uploading file.");
        }

        var filename = req.file.originalname;
        var model = null;
        
        // Converts excel data to mongo
	  	mongoXlsx.xlsx2MongoData("./uploads/"+filename, model, function(err, mongoData) {
		  	emp.insertMany(mongoData, function(err, emp) {
		    if (err) {
		        if(err.code == 11000) {
		            return res.status(401).json({ message: 'Duplicate Entry '});
		        }
		        else {
		            return res.send( err );
		        }
	    	}
		     
		    res.json({status:"success"});
		  }); 
		});
        

    });
	
	
	

};

// Method gives the list of employees
exports.getEmployeDetails = function(req, res){
	emp.find(function(err, emplist) {
    if (err) throw err;
    res.json(emplist);
  });

};

// Method to update the existing employee
exports.saveEmp = function(req, res){
	emp.findByIdAndUpdate(req.body._id,req.body,function(err, emp){
		if (err) {
	        if(err.code == 11000) {
	            return res.status(401).json({ message: 'Duplicate Entry '});
	        }
	        else {
	            return res.send( err );
	        }
    	}
		res.send(req.body);
	})
}
