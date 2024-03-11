const express = require("express");

const router = express.Router();

const employeeController = require('../controllers/EmployeeController');


router.post('/add-emp', employeeController.createEmployee);


// For Get Employees List
router.get('/list', employeeController.getEmployees);

// Employee details by Id
router.get('/getEmployeeBy/:id', employeeController.singleEmployee);

// Update Employee Details by Id
router.put('/updateEmployee/:id', employeeController.updateEmployeeDetails);

//Delete Employee By Id
router.delete('/deleteEmployee/:id', employeeController.deleteEmployeeById);

module.exports = router;