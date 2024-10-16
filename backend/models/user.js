const mongoose=require("mongoose");

const RegisteruserSchema=new mongoose.Schema({
	Name : {
		type:String,
		required : true
	},
	email : {
		type:String,
		required : true,
		unique:true
	},
	password: {
		type:String,
		required : true
	},
    center_id: {
        type: String,
        required: true
    }
})

const Registeruser=new mongoose.model("Users",RegisteruserSchema);

module.exports=Registeruser;