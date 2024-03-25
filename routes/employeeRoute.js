const express = require("express");

const router = express.Router();

const employeeController = require('../controllers/EmployeeController');


router.post('/add-emp', employeeController.createEmployee);

router.post('/userLogin', employeeController.userLogin)

// For Get Employees List API with VerifyToken, First need to hit generateToken method for userLogin then, need to pass Authorization: token value in headers of get employee list API
// router.get('/list',employeeController.verifyTokenHandler, employeeController.getEmployees);


router.get('/list', employeeController.getEmployees);


// Employee details by Id
router.get('/getEmployeeBy/:id', employeeController.singleEmployee);

// Update Employee Details by Id
router.put('/updateEmployee/:id', employeeController.updateEmployeeDetails);

//Delete Employee By Id
router.delete('/deleteEmployee/:id', employeeController.deleteEmployeeById);

module.exports = router;