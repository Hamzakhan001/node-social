const express=require("express");
const app=express();
const helmet=require("helmet");
const morgan=require("morgan")
const userRouter=require("./routes/users")
const authRouter=require("./routes/auth")



const port=8080;
dotenv.config();
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true},()=>{
	console.log("Connected to database")
})


//middleware
app.use(express.json())
app.use(helmet());
app.use(morgan("common"));

app.get("/",(req,res)=>{
	res.send("welcome!")
})

app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)


app.listen(port,()=>{
	console.log("sever listening")
})