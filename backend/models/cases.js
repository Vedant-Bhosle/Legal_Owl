
const mongoose = require('mongoose')
const { Schema } = mongoose;
const casesSchema = new mongoose.Schema({

    summary: {
        type: String,
        required: true
    }
    ,
    links: {
        type: String,
        required: true
    },
    keywords:{
        type: String,
        required: true
    }

})
const Case = new mongoose.model("Case", casesSchema)
module.exports = Case;