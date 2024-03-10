const Employee = require("../../models/Employee");
const mongoose = require("mongoose");

const createEmployee = async (req, res) => {
    console.log('triggered..')
    debugger;
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
        const employees = await Employee.find(request.params);
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
    console.log('params', req.params)
    try {
       await this.singleEmployee1(req.params.id)
        //  const id = mongoose.Types.ObjectId(req.params.id); // conversion bases on model in mongoDG
        // console.log('id', id)
        // const employeeDetails = await Employee.findById(req.params.id);
        // if (!employeeDetails) {
        //     res.status(404).json({ 'message': 'Sorry!, No Employeed found ' })
        // } else {
        //     res.status(201).json(employeeDetails)
        // }
    } catch (error) {
        console.log('server Error.... ', error)
    }

}
const  singleEmployee1= async (req, res) => {
    console.log('id',typeof req.params.id)

    try {
        const employee = await Employee.findOne({ _id:  req.params.id });
        console.log('Found employee:',employee);
        res.status(201).json(employee);
    } catch (error) {
        console.error('Error finding employee:', error);
    }
}

module.exports = { createEmployee, getEmployees, singleEmployee1 }