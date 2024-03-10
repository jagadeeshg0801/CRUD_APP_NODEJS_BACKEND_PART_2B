const express = require("express");

const router = express.Router();

const employeeController = require('../controllers/EmployeeController');


router.post('/add-emp', employeeController.createEmployee);


// For Get Employees List
router.get('/list', employeeController.getEmployees);

router.get('/employee/:id', employeeController.singleEmployee1)

module.exports = router;