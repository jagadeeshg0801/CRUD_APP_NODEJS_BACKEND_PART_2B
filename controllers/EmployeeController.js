const e = require("express");
const Employee = require("../models/Employee");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotEnv = require('dotenv');

dotEnv.config();
const secret_key = process.env.SECRET_TOKEN;

const userLogin = async (req, res) => {
    try {
        const { name, email } = req.body;
        const employees = await Employee.find();
        const findEmp = employees.find(ele => ele.name == name && ele.email == email);
        if (findEmp) {
            const tokenObj = { 'name': name, 'id': findEmp.id, 'email': email };
            const token = jwt.sign(tokenObj, secret_key, { expiresIn: '1m' })
            if (token)
                res.status(201).json({ 'status': true, 'token': token, 'msg': 'User Logged In Successfully!!' });
        } else {
            res.status(500).json({ status: 'Employee not found' })
        }
    } catch (error) {
        console.log('err', error)
        res.status(500).json({ status: 'Something Went wrong!', error })
    }
}

const verifyTokenHandler = async (req, res, next) => {
    try {
        const token = req.header['authorization'];
        if (token) {
            const verified = jwt.verify(token.split(' ')[1], secret_key);
            if (verified) {
              next();
            }
            else {
                res.status(403).json({ 'status': false, 'msg': 'Token missed in headers', token: null });
            }
        } else {
            res.status(403).json({ 'status': false, 'msg': 'Invalid Token', token: null })
        }
    }catch(error){
            res.status(403).json({ 'status': false, 'msg': 'Something Went Wrong', token: null })
    }
}

const createEmployee = async (req, res) => {
    console.log('triggered..')
    try {
        const { name, email, phone, city } = req.body;
        console.log('res', req)
        const employee = new Employee({ name, email, phone, city })
        await employee.save();
        res.status(201).json(employee)
    } catch (error) {
        console.log('Server Error', error)
    }

}


//get all employee list
const getEmployees = async (request, response) => {

    try {
        const employees = await Employee.find();
        const formattedEmployees = employees.map(ele => {
            console.log('ele', ele)
            return { name: ele.name, email: ele.email, city: ele.city, phone: ele.phone, 'id': ele._id }
        })
        response.status(200).json({ data: formattedEmployees, count: formattedEmployees.length });
    } catch (error) {
        console.log('server Error', error)
    }
}

//get employee details by id
const singleEmployee = async (req, res) => {
    console.log('id', typeof req.params.id)

    try {
        const employee = await Employee.findOne({ _id: req.params.id });
        console.log('Found employee:', employee);
        if (employee) {
            res.status(201).json({ "res": employee });
        }
        else {
            res.status(402).json({ msg: 'No Employee Available with id :: ' + req.params.id });
        }
    } catch (error) {
        console.error('Error finding employee:', error);
    }
}


// update employee details by Id
const updateEmployeeDetails = async (req, res) => {
    try {
        const { name, email, city, phone } = req.body;
        const employee = await Employee.findByIdAndUpdate(req.params.id, {
            name, email, city, phone
        })
        if (!!employee) {
            res.status(202).json(employee);
        } else {
            console.log("No Details found..!")
        }
    } catch (error) {
        console.log('Update failed due to....', error)
    }
}

const deleteEmployeeById = async (req, res) => {
    const emp = await Employee.findByIdAndDelete(req.params.id);
    if (emp) {
        res.status(202).json(emp);
    } else {
        res.status(404).json("No Employee Found")
    }
}

module.exports = { createEmployee, getEmployees, singleEmployee, updateEmployeeDetails, deleteEmployeeById, userLogin , verifyTokenHandler}