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

router.delete("/:id",async (req,res)=>{
	if(req.body.userId==req.params.id || req.body.isAdmin){

		try{
			const user=await User.deleteOne(req.params.id);
			res.status(200).json("Account has been upadated")
		}
		catch(err){
			res.status(500).json(err)
		}

	}
	else{
		return res.status(403).json("You can delete only your account")
	}
})


module.exports=router