require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const morgan = require("morgan")
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');

const app = express();

app.use(express.json());
app.post("/khalti-api",async(req, res)=> {
  const payload=req.body;
  const khaltiResponse= await axios.post('https://a.khalti.com/api/v2//epayment/initiate/',payload,{
headers:{
  Authorization:'key live_secret_key_68791341fdd94846a146f0457ff7b455',
},
  }
  );
  console.log(khaltiResponse);
});



app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));




app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(helmet())
app.use(compression());

app.use("/user", require("./routes/userRouter"));
app.use("/api", require("./routes/categoryRouter"));
app.use("/api", require("./routes/productRouter"));
app.use("/api", require("./routes/upload"));
app.use("/api", require("./routes/orderRouter"));

const URI = process.env.MONGO_URL;
const PORT = process.env.PORT;

mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
  },
  (err) => {
    if (err) throw err;
    console.log("DATABASE CONNECTED...");
  }
);

app.use(express.static(path.join(path.join(__dirname,"./build"))));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,"./build/index.html"))
})

app.use(function (req, res, next) {
  res.status(404);
  res.send('404 Not Found');
})

app.listen(PORT, () => {
  console.log(`SERVER IS CONNECTED TO PORT ${PORT}`);
});