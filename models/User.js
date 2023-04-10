const mongoose=require("mongoose");


const UserSchema=new mongoose.Schema({
	username:{
		type:String,
		required:true,
		min:3,
		max:20,
		unique:true
	},
	email:{
		type:String,
		required:true,
		unique:true,
		max:50
	},
	password:{
		type:String,
		required:true,
		min:8,
		max:50
	},
	profilePicture:{
		type:String,
		default:"",
	},
	followers:{
		type:Array,
		default:[]
	},
	followings:{
		type:Array,
		default:[]
	},
	isAdmin:{
		type:Boolean,
		default:false
	}

})