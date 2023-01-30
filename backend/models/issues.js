
const mongoose = require('mongoose')
const { Schema } = mongoose;
const IssueSechema = new mongoose.Schema({



    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     require: true,
    //     ref: 'user'
    // },
    state: {
        type: String,
        required: true
    }
    ,
    city: {
        type: String,
        required: true
    },
    employeestatus:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required: true
    }


})
const Issue = new mongoose.model("Issue", IssueSechema)
module.exports = Issue;