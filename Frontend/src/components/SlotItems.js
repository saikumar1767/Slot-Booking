import React, { useEffect, useState } from "react";
import './../styles/BookEvents.css';

export default function SlotItems(props) {

  const [items, setItems] = useState([]);
  
  let smillis=new Date(props.item.startTime);
  let emillis=new Date(props.item.endTime);
  const [sTime, setS] = useState(new Date(smillis).toJSON())
  const [eTime ,setE] = useState(new Date(emillis).toJSON());
  var disStart = sTime.split("T");
  var disEnd = eTime.split("T");
  var stime = disStart[1].split(":");
  var etime = disEnd[1].split(":");
  var samorpm = stime[0] >= 12 ? (((stime[0]-12 <=0) ? stime[0] : stime[0]-12)+":"+stime[1]+" PM") : (stime[0]+":"+stime[1]+" AM");
  var eamorpm = etime[0] >= 12 ? (((etime[0]-12 <=0) ? etime[0] : etime[0]-12)+":"+etime[1]+" PM") : (etime[0]+":"+etime[1]+" AM");

  useEffect(() => {
    switch(props.zone){
      
      case "Asia/Calcutta" : setS(new Date(new Date(props.item.startTime).getTime()+(5*60*60000)+(30*60000)).toJSON());
                             setE(new Date(new Date(props.item.endTime).getTime()+(5*60*60000)+(30*60000)).toJSON());
                             disStart = sTime.split("T");
                             disEnd = eTime.split("T");
                             stime = disStart[1].split(":");
                             etime = disEnd[1].split(":");
                             samorpm = stime[0] >= 12 ? (((stime[0]-12 <=0) ? stime[0] : stime[0]-12)+":"+stime[1]+" PM") : (stime[0]+":"+stime[1]+" AM");
                             eamorpm = etime[0] >= 12 ? (((etime[0]-12 <=0) ? etime[0] : etime[0]-12)+":"+etime[1]+" PM") : (etime[0]+":"+etime[1]+" AM");
                             break;

      case "America/New_York" : setS(new Date(new Date(props.item.startTime).getTime()-(5*60*60000)).toJSON());
                                setE(new Date(new Date(props.item.endTime).getTime()-(5*60*60000)).toJSON());
                                disStart = sTime.split("T");
                                disEnd = eTime.split("T");
                                stime = disStart[1].split(":");
                                etime = disEnd[1].split(":");
                                samorpm = stime[0] >= 12 ? (((stime[0]-12 <=0) ? stime[0] : stime[0]-12)+":"+stime[1]+" PM") : (stime[0]+":"+stime[1]+" AM");
                                eamorpm = etime[0] >= 12 ? (((etime[0]-12 <=0) ? etime[0] : etime[0]-12)+":"+etime[1]+" PM") : (etime[0]+":"+etime[1]+" AM");
                                break;

      case "Australia/Sydney" :  setS(new Date(new Date(props.item.startTime).getTime()+(11*60*60000)).toJSON());
                                 setE(new Date(new Date(props.item.endTime).getTime()+(11*60*60000)).toJSON());
                                 disStart = sTime.split("T");
                                 disEnd = eTime.split("T");
                                 stime = disStart[1].split(":");
                                 etime = disEnd[1].split(":");
                                 samorpm = stime[0] >= 12 ? (((stime[0]-12 <=0) ? stime[0] : stime[0]-12)+":"+stime[1]+" PM") : (stime[0]+":"+stime[1]+" AM");
                                 eamorpm = etime[0] >= 12 ? (((etime[0]-12 <=0) ? etime[0] : etime[0]-12)+":"+etime[1]+" PM") : (etime[0]+":"+etime[1]+" AM");
                                 break;
    }

    
  },[props.item.startTime,props.item.endTime]);
  
  
  const bookSlot = () => {
    fetch('http://localhost:9997/createEvent', {
        method: "POST",
        body: JSON.stringify({ startTime: props.item.startTime, endTime: props.item.endTime, Duration: 30, timeZone: props.zone }),
       headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      })
        .then((r) => r.json())
        .then((resp) => {
          console.log("Got data from POST backend", resp);
          setItems([]);
          items.push(resp);
          setItems(...items);
          document.getElementById("dateId").value="";
          document.getElementById("times").value="none";
          window.alert("Slot Booked Successfully !!!");
          window.location.reload();
          //onClick={()=>bookSlot()}
        })
        .catch(function(){
          window.location.reload();
          console.log("Enter Valid Timings");
        });
  }

  return (
    <div className="list" >
          <div className="listitem">
            <p><i><b>Slot-{props.idx+1}</b></i></p>
            <p><i>Starts at : </i>{samorpm}</p>
            <p><i>Ends on : </i>{eamorpm}</p>
          </div>
    </div>
  );
}
