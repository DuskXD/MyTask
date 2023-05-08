import mongoose from 'mongoose';


const Users = new mongoose.Schema({
    user_login: {type:String, unique: true, required: true},
    user_password: {type:String, required: true},
    user_name: {type:String, required: true},
    user_surname: {type:String, required: true},

})

export default mongoose.model('Users', Users);
