const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const bcrypt=require("bcrypt");
const {CustomerDetails,ProductList} = require("./mongodb");


// this is a sample comment for git repo........
//changes on develop branch......
  
const tempelatePath = path.join(__dirname, "../tempelates");
app.use(express.static("public"));

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", tempelatePath);
app.use(express.urlencoded({extended: false}));


app.get("/", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login"); 
});

app.get("/admin", (req, res) => {
  res.render("admin"); 
});



app.post("/signup", async (req, res) => {
  const hashPassword= await bcrypt.hash(req.body.password, 10);
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  };

  const checkUser = await CustomerDetails.findOne({email: req.body.email});
  if (!checkUser) {
    CustomerDetails.insertMany([data]);
    res.render("home");
  } else {
    res.send("User Already Registered");
  }
});

app.post ("/login", async (req, res) => {
  const check = await CustomerDetails.findOne({email: req.body.email});
  try {
      const compareHashPassword= await bcrypt.compare(req.body.password, check.password);
      if (compareHashPassword){
        res.render("home");
      } else {
        res.send("Wrong Password");
      }
    } catch {
      res.send("UserName Not Found");
    }
});

app.post("/admin", async (req,res)=>{
  const data={
    productName:req.body.productName,
    price:req.body.price,
    warranty:req.body.warranty,
    images:[req.body.image01,req.body.image02,req.body.image03,req.body.image04]
  }
  ProductList.insertMany([data]);
  res.render("home");
});

app.listen(4000, () => {
  console.log("port connected");
});
