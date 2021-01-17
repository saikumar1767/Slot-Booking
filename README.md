# SLOT-BOOKING
Theme : The Slot-Booking Project theme is to make appointment booking between people a lot easier which avoids the usual process of exchanging mails between people till they find a convenient time.

## Technology Stack:
 - MongoDB for database storage.
 - Express.js and Node.js
 - HTML, CSS, Javascript, ReactStrap, React.js for Frontend.
 
The Steps to Setup the project locally are as follows:

1.Firstly, install all the dependencies for both frontend and backend with the command:
  ### `npm install`
2.Install MongoDB, and start the server on the port 27017.
3.Then, make sure the local ports 3000 and 9997 are available in your pc, then run the command for both as:
  ### `npm start`
Note: The End ports 3000 is for hosting FrontEnd and 9997 is for hosting backend.

## The scenarios covered in this slot-booking application are:

  (Front-End)
  - The Landing page, which dislpays two option, Book Slot and View Events.
  - In the Book Slot, when clicked on it, will be directed to booking page, which has date picker and time zone.
  - When clicked on Get Slots button, the available slots with the respective date and time zone will be shown below.
  - The Date picker has date list from current date(disables previous dates) only and the different time zones are :
    - Asia/Calcutta(GMT+05:30),
    - America/New_York(GMT-05:00),
    - Australia/Sydney(GMT+11:00),
    - Europe/London(GMT+00:00).
  - There won't be collisions between slot timings and bookings as, once the slot is booked by some person, which will not be visible under the free slots.
  - Once clicked on one of the available free slots, the slot at that particular time will be booked successfully and will be moved to the list of events section.
  - Now, for getting list of Available Events(Events section), which are to checked by admin/organizer for his planning of particular day will be shown.
  - In this Get Events page, the admin/organizer enters the start data and time, end date and time and when clicked on Get Events button, the list of events for that particular time period will be shown.
  - By checking this list of events, the admin/organizer can be pre-planned for that particular day.
  
  (Back-End Server)
  - In Backend, there are four REST API calls which the server serves, namely:
    - /freeSlots : This api call, gets the date and timezone via request and serves the respective available time slots to frontend.
    - /createFreeSlots : This api call, gets the start date and time, end date and time and duration via request and creates list of free slots accordingly.
    - /createEvent : This api call, gets the start date and time, end date and time and time zone via request and creates the event accordingly.
    - /getEvents : This api call, gets the start date and time, end date and time via request and sends back the list of booked events to frontend.
    - If already booked slot, is agian booked then server throws the 422 error.
    
    Note: For better storage purpose, all the event and slot timings are stored in GMT/UTC format only and are converted to respective time zones when they are requested.
    
   (Back-End Database)
   - Here, MongoDB database is used to store the data and the database name used is 'slotbooking'.
   - In the database, two collections are created namely:
     - events,
     - slots
   - In the events collection, the Schema designed which has start date and time, end date and time, duration, timezone.
   - In the slots collection, the Schema designed which also has start date and time, end date and time, isBooked, timezone and eventId.
   - When a particular slot is booked, then isBooked flag is set to true and eventId is set to respective eventId, so that a slot once booked must not be shown again.
