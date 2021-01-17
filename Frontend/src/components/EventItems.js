import React from "react";
import './../styles/ShowEvents.css';
export default function EventItems(props) {

  const months = ["","Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];

  //console.log(props.item.startTime);
  var disStart = props.item.startTime.split("T");
  var disEnd = props.item.endTime.split("T");
  var sdate = disStart[0].split("-");
  var edate = disEnd[0].split("-");
  var stime = disStart[1].split(":");
  var etime = disEnd[1].split(":");
  var samorpm = stime[0] >= 12 ? (((stime[0]-12 <=0) ? stime[0] : stime[0]-12)+":"+stime[1]+" PM") : (stime[0]+":"+stime[1]+" AM");
  var eamorpm = etime[0] >= 12 ? (((etime[0]-12 <=0) ? etime[0] : etime[0]-12)+":"+stime[1]+" PM") : (etime[0]+":"+etime[1]+" AM");

  return (
    <div className="list">
          <div className="listitem">
            <p><i><b>Event-{props.idx+1}</b></i></p>
            <p><i>Starts at : </i>{samorpm} , {sdate[2]+" "+months[Number(sdate[1])]+" "+sdate[0]+"(UTC)"}</p>
            <p><i>Ends on : </i>{eamorpm} , {edate[2]+" "+months[Number(edate[1])]+" "+edate[0]+"(UTC)"}</p>
          </div>
    </div>
  );
}
