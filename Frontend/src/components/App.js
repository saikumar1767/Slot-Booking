import { BrowserRouter as Router,Link,Route,Switch } from 'react-router-dom'
import './../styles/App.css';
import ShowEvent from "./ShowEvent";
import BookEvent from "./BookEvent";

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/bookEvent">
            <BookEvent/>
          </Route>
          <Route exact path="/showEvents">
            <ShowEvent/>
          </Route>
          <Route path="/">
            <div className="home">
              <h1>Slot Booking Portal</h1>
              <div className="homepage">  
                <Link to='/bookEvent' style={{textDecoration: "none"}}><button type="button">Book Event</button></Link>
                <Link to='/showEvents' style={{textDecoration: "none"}}><button type="button">Show Events</button></Link>
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
