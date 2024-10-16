const express=require("express");
const app=express();
const  hbs = require("hbs");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const exphbs = require('express-handlebars');
const path=require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());  //app to use cookie parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const static_path=path.join(__dirname,"./public");
const template_path=path.join(__dirname,"../templates");
app.use(express.static(static_path));
require("./connection/db");
hbs.registerHelper('range', function(start, end, options) {
  let result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
});
hbs.registerHelper('findBooking', function(hour_slot, currentHour) {
    console.log(hour_slot);
    console.log(currentHour);
    for (index in hour_slot){
        if(currentHour == hour_slot[index].hour)return hour_slot[index];
    }
    return null;
});
app.set("view engine","hbs");
app.set("views",template_path);


const bookingController=require("./controllers/bookingController");
const sportController=require("./controllers/sportController");
const centerController=require("./controllers/centerController");
const loginController=require("./controllers/loginController");

const port=5050;

// Routes for bookings
app.post("/bookedSlots",bookingController.getBookings);
app.post('/createBooking', bookingController.createBooking);
app.post("/schedule",bookingController.viewBookings);

// Routes for centers
app.get('/centers/:centerId/sports', centerController.getSportsByCenter);
app.post('/centers', centerController.createCenter);

// // Routes for sports
app.get('/sports', sportController.getSport);
app.post('/sports', sportController.createSport);
app.get('/courts',sportController.getCourt);



app.get('/',(req,res)=>{
    res.render("index");
})

app.get('/login',(req,res)=>{
    res.render("login");
})
app.post('/login',loginController.signup);

app.get('/booking',(req,res)=>{
    res.render("booking");
})

app.get('/schedule',async (req,res)=>{
    let records = await bookingController.viewBookings(req,res);
    let courts = new  Array(records.length);
// let records = [{hour_slot:[{booked_by:'teri_maa',hour:14}]}];
let ret  = [];
console.log(req.query)
for(record of records){

    let arr = new Array(24);
    for(let i = 0; i < 24; i++){
        arr[i] = {booked_by: "free",hour:i};
    }
    for (let i = 0; i < record.hour_slot.length; i++) {
        let hour = record.hour_slot[i].hour;
        arr[hour - 1].booked_by = record.hour_slot[i].booked_by;
    }
    ret.push(arr);
}
console.log(ret);
res.render("schedule", { courts: courts, records: ret });

})

app.listen(port,(error)=>{
    if(error){
        console.log(error);
    }
    console.log("Server is running at "+port);
})
