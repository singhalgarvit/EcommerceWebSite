const mongoose=require("mongoose")


mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce-Website');
mongoose.connection.on('connected', () => console.log('Connected'));
mongoose.connection.on('error', () => console.log('Connection failed with - ',err))

const CustomerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String
    },
    pincode:{
        type:Number
    },
    cart:{
        type:Array
    }
});

const ProductSchema=new mongoose.Schema({
    productName:{
        type:String
    },
    price:{
        type:Number
    },
    warranty:{
        type:Number
    },
    images:{
        type:Array
    }
})

const CustomerDetails=mongoose.model("CustomerDetails",CustomerSchema);
const ProductList=mongoose.model("ProductList",ProductSchema);

module.exports={
CustomerDetails : CustomerDetails,
ProductList : ProductList
}
