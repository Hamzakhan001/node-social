const router=require("express").Router();
const User=require('../models/User')



router.put("/:id",async(req,res)=>{
	if(req.body.userId==req.params.id || req.body.isAdmin){
		if(req.body.password){
			try{
				const salt=await bcrypt.genSalt(10);
				req.body.password=await bcrypt.hash(req.body.password,salt);


			}
			catch(err){
				console.error(err)
				return res.status(500).json("You can update only your account!")
			}
		}
		try{
			const user=await User.findByIdAndUpdate(req.params.id,{
				$set:req.body
			})
			res.status(200).json("Account updated")

		}
		catch(err){
			console.error(err)
			return res.status(500).json("You can update only your account!")
		}
	}
	else{
		res.status(403).json("You can only update your account!")
	}
})

router.get("/",async (req,res)=>{
	let user=await User.find({email:req.body.email})
	if(!user){
		return res.status(500).send("User with this email doesn't exist!")
	}
	


	res.send("user route")
})


module.exports=router