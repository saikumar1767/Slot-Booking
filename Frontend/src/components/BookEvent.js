//import { BrowserRouter as Router,Route,Switch, useHistory } from 'react-router-dom'
import './../styles/BookEvents.css';
import React, { useState } from "react";
import SlotItems from './SlotItems';
import * as moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookEvent(){

    const [items, setItems] = useState([]);
    const [selectDate, setDate] = useState(new Date());
    const [selectZone, setZone] = useState("");
   
    const getSlots = () => {
        fetch(`http://localhost:9997/freeSlots?Date=${selectDate.toISOString().substring(0,10)}&timeZone=${selectZone}`, {
          method: "GET",
         headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"  
        })
          .then((r) => r.json())
          .then((resp) => {
            setItems([...resp]);
            setDate("");
            setZone("");
            document.getElementById("dateId").value="";
            document.getElementById("times").value="none";
          })
          .catch(function(){
            //window.location.reload();
            console.log("Enter Valid Timings");
          });
      };

    const newZoneChanged = (evt) => {
        setZone(evt.target.value);
    }

    return (
        <div className="home">
            <h2 style={{fontFamily: "ui-monospace"}}>Book an Event</h2>
            <div className="homepage">
                <div className="inputElements">
                    <span><i>Select Date :</i><DatePicker id="dateId" selected={selectDate} onChange={date => setDate(date)}  minDate={moment().toDate()} required/></span>
                    <label><i>TimeZone : </i> 
                    <select name="times" id="times" defaultValue="none" onChange={newZoneChanged}>
                        <option value="none" disabled hidden>Select a TimeZone</option>
                        <option value="Asia/Calcutta">Asia/Calcutta(GMT+05:30)</option>
                        <option value="America/New_York">America/New_York(GMT-05:00)</option>
                        <option value="Australia/Sydney">Australia/Sydney(GMT+11:00)</option>
                        <option value="Europe/London">Europe/London(GMT+00:00)</option>
                    </select>
                    </label>
                </div>
                <button id="btn" onClick={getSlots}>Get Slots</button>
            </div>
            <h2 style={{fontFamily: "ui-monospace"}}>List of Free Slots</h2>
            <div className="Slots">
                    {Array.isArray(items) && items.map((item, idx) => (
                        <SlotItems
                        item={item}
                        zone={selectZone}
                        key={item+":"+idx}
                        idx={idx}
                        />
                    ))}
                </div>
            </div>
    );
}