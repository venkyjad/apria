'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Schema for employee
var employeeSchema  = new Schema({
  emp_id:{type:Number,unique:true},
  name:String,
  dept:String,
  city:String,
  salary:Number
})


module.exports = mongoose.model('Employees', employeeSchema);