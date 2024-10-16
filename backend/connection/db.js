const mongoose=require("mongoose");
const mongoDB="mongodb+srv://rohankumarrkb555:uqzPFxGHkmNHZX9q@cluster0.lbab8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//"mongodb+srv://rohankumarbehera5:TfaXjfTAcQrSXPLu@cluster0.wcsgcec.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
 
mongoose.connect(mongoDB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
     
   
}).then(() => console.log('connecting to database successful'))
.catch(err => console.error('could not connect to mongo DB', err));

 