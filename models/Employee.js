const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email:{
        type: String,
        required : true
    },
    phone:{
        type: Number,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    }
});

module.exports = mongoose.model('Employee', employeeSchema)