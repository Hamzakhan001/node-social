const router=require("express").Router();
const User=require("../models/User");
const bcrypt=require("bcrypt")

//register 
router.post("/register",async (req,res)=>{
	const user=await User.find({email:req.body.email})
	if(user){
		res.status(400).send("User with this email already exists!")
		return;
	}
	try{

	const salt=await bcrypt.genSalt(10);
	const hashedpass=await bcrypt.hash(req.body.password,salt)


	const newUser=new User({
		username:req.body.user,
		email:req.body.email,
		password:hashedpass
	})
	await newUser.save();
	res.status(200).send(newUser)
}
catch(err){
	console.error(err)
}
})


//login
router.post("/login",async (req,res)=>{
	const user=await User.findOne({email:req.body.email})
	if(!user){
		return res.status(404).send("User not found!")
	}
	try{
	const validPassword=await bcrypt.compare(req.body.password,user.password);
	if(!validPassword){
		return res.status(404).send("Wrong Password!");
	}
	res.status(200).send(user)
}
catch(err){
	console.error(err)
}
})


module.exports=router