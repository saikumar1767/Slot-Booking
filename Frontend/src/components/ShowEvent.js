import React, { useState } from "react";
//import { useHistory } from 'react-router-dom'
import './../styles/ShowEvents.css';
import EventItems from "./EventItems";


export default function ShowEvent(){
    
    const [items, setItems] = useState([]);
    const [starTime, setStartTime] = useState("");
    const [enTime, setEndTime] = useState("");
    
    const addItem = () => {
        fetch(`http://localhost:9997/getEvents?startTime=${starTime}:00.000Z&endTime=${enTime}:00.000Z`, {
          method: "GET",
         headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"  
        })
          .then((r) => r.json())
          .then((resp) => {
            setItems([]);
            items.push(resp);
            setItems(...items);
            setStartTime("");
            setEndTime("");
            document.getElementById("startT").value="";
            document.getElementById("endT").value="";
          })
          .catch(function(){
            console.log("Enter Valid Timings");
          });
      };

    const newStartTimeChanged = (evt) => {
        setStartTime(evt.target.value);
    };
    
    const newEndTimeChanged = (evt) => {
        setEndTime(evt.target.value);
    };

    return (
        <div className="home">
            <h2 style={{fontFamily: "ui-monospace"}}>List of Events</h2>
            <div className="homepage">
                <span><i>Start Time :</i><input type="datetime-local" id="startT" onChange={newStartTimeChanged} placeholder="start Time" required/></span>
                <span><i>End Time :</i><input type="datetime-local" id="endT"  onChange={newEndTimeChanged} placeholder="start Time" required/></span>
                <button
                id="btn"
                onClick={addItem}
                >
                Get Events
                </button>
                <div className="Events">
                    {Array.isArray(items) && items.map((item, idx) => (
                        <EventItems 
                        item={item}
                        key={item+":"+idx}
                        idx={idx}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}