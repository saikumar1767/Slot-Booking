const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json()); // added body key to req
//app.set('trust proxy',1);
app.use(cors({
  credentials: true,
  origin: ["http://localhost:3000","https://localhost:3000"]
}));

// connect - must edit
const db = mongoose.createConnection("mongodb://localhost:27017/slotbooking", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// schema
const eventSchema = new mongoose.Schema({
  startTime: Date,
  endTime: Date,
  duration: Number,
  timeZone: String
});

const slotSchema = new mongoose.Schema({
    startTime: Date,
    endTime: Date,
    isBooked: Boolean,
    timeZone: String,
    eventId: mongoose.Schema.Types.ObjectId
});

// model
const eventModel = db.model("event", eventSchema);
const slotModel = db.model("slot", slotSchema);

const isNullOrUndefined = (val) => val === null || val === undefined;

// backend apis
app.get("/freeSlots", async (req, res) => {
    const param = req.query;
    var zone = param.timeZone;

    var smillis = new Date(param.Date).getTime();
    var emillis = new Date(param.Date).getTime()+(23*60*60000)+(59*60000)+(59000);

    switch(zone){
        case "Asia/Calcutta"    : smillis=smillis-(5*60*60000)-(30*60000);
                                  emillis=emillis-(5*60*60000)-(30*60000);
                                  break;

        case "America/New_York" : smillis=smillis+(5*60*60000);
                                  emillis=emillis+(5*60*60000);
                                  break;

        case "Australia/Sydney": smillis=smillis-(11*60*60000);
                                 emillis=emillis-(11*60*60000);
                                 break;
    }

    var sTime = new Date(smillis).toJSON();
    var eTime = new Date(emillis).toJSON();

    try{
        const freeslot = await slotModel.find({isBooked: false , 
            startTime: { $gte: sTime },
            endTime: { $lt: eTime }
        });
        res.status(200).send(freeslot);
    }catch(e){
        res.sendStatus(404);
    }
});

app.post("/createfreeSlots", async (req, res) => {
    const body = req.body; //body has stardatetime, enddatetime
    const duration = body.duration;
    //here assuming each slot as 30min
    //now creating 30min slots into slots collection
    let ssplitdatetime= body.startTime.toString().split("T");
    let stime=ssplitdatetime[1].split(":");
    let shrs=parseInt(stime[0]);
    let smin=parseInt(stime[1]);

    let esplitdatetime= body.endTime.toString().split("T");
    let etime=esplitdatetime[1].split(":");
    let ehrs=parseInt(etime[0]);
    
    body.isBooked = false;
    body.eventId = null;
    
    while(shrs<ehrs){
        if(shrs<=9 && smin<=9)
            body.startTime = ssplitdatetime[0]+"T0"+shrs+":0"+smin+":00.000Z";
        else if(shrs<=9)
            body.startTime = ssplitdatetime[0]+"T0"+shrs+":"+smin+":00.000Z";
        else if(smin<=9)
            body.startTime = ssplitdatetime[0]+"T"+shrs+":0"+smin+":00.000Z";
        else
            body.startTime = ssplitdatetime[0]+"T"+shrs+":"+smin+":00.000Z";

        smin=smin+duration; //can change duration here and create slots accordingly.
        if(smin>=60){
            smin=smin-60;
            shrs=shrs+1;
        }
        if(shrs<=9 && smin<=9)
            body.endTime = ssplitdatetime[0]+"T0"+shrs+":0"+smin+":00.000Z";
        else if(shrs<=9)
            body.endTime = ssplitdatetime[0]+"T0"+shrs+":"+smin+":00.000Z";
        else if(smin<=9)
            body.endTime = ssplitdatetime[0]+"T"+shrs+":0"+smin+":00.000Z";
        else
            body.endTime = ssplitdatetime[0]+"T"+shrs+":"+smin+":00.000Z";

        const newSlot = new slotModel(body);
        await newSlot.save();
    }
    res.sendStatus(201);
});

app.post("/createEvent", async (req, res) => {
    const addevent = req.body;
    try{
        var zone = addevent.timeZone;

        var smillis = new Date(addevent.startTime).getTime();
        var emillis = new Date(addevent.endTime).getTime();

        switch(zone){
            case "India"    : smillis=smillis-(5*60*60000)-(30*60000);
                              emillis=emillis-(5*60*60000)-(30*60000);
                              break;

            case "USA"      : smillis=smillis+(5*60*60000);
                              emillis=emillis+(5*60*60000);
                              break;

            case "Australia": smillis=smillis-(11*60*60000);
                              emillis=emillis-(11*60*60000);
                              break;
        }

        var sTime = new Date(smillis).toJSON();
        var eTime = new Date(emillis).toJSON();

        const slotFree = await slotModel.findOne( { isBooked: false , startTime: sTime, endTime: eTime});
        console.log(slotFree);
        if(!isNullOrUndefined(slotFree)){
            const newEvent = new eventModel(addevent);
            await newEvent.save();
            slotFree.isBooked = true;
            slotFree.eventId = newEvent._id;
            await slotFree.save();
            res.status(201).send(newEvent);
        }
        else{
            res.sendStatus(422);
        }
    }catch(e){
        res.sendStatus(404);
    }
});

app.get("/getEvents", async (req,res) => {
    const param=req.query;
    const listEvents = await eventModel.find({ startTime: { $gte: param.startTime}, endTime: { $lt: param.endTime} });
    res.status(200).send(listEvents);
});

//app.listen(process.env.PORT);
app.listen(9997);
