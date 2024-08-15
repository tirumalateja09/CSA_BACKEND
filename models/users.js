const mongoose = require('mongoose');


const { Schema } = mongoose;


const usersSchema = new Schema({
    firstName : { type: String, required: [true, 'First name is a required field'], },
    secondName : { type: String, required: [true, 'Last name is a required field'], },
    mobile : { type: Number, required: [true, 'Mobile number is a required field']},
    email: { type: String, required: [true, 'Email is a required field'],  },
    token: String,
    password : { type: String, required: [true, 'Password field is required'] }
}, {
    timestamps: true
})


module.exports = mongoose.model('userdetail', usersSchema);





