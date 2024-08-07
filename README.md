# Group 18 - StudySpotter: UBC’s hottest study spot finder

[![Deploy to Render](https://github.com/ubc-cpsc455-2024S/project-18_fps_addicts/actions/workflows/deploy.yml/badge.svg)](https://github.com/ubc-cpsc455-2024S/project-18_fps_addicts/actions/workflows/deploy.yml)


## Project Description

Welcome to StudySpotter, the ultimate solution for UBC students 
on the hunt for the perfect study spot! Say goodbye to the frustration 
of wandering around campus looking for a place to study. Our app provides 
real-time updates on the best study locations, complete with amenities, a local chat box 
to connect with fellow students, and the ability to calculate the walking distance between 
two spots. With StudySpotter, you can effortlessly find and reserve your ideal study space, 
ensuring you always have the perfect environment to hit the books and ace your exams. 
Get ready to revolutionize your study sessions with StudySpotter!

## Why did we create this?

As a UBC student, finding a place to study can be a challenging task. Despite the abundance of libraries, study lounges, and quiet spaces, prime locations often fill up quickly, especially during midterm and final season. Whether you're trying to find a spot for yourself or a group of friends, it can be a draining task to find the perfect place where everyone's needs are satisfied. From jam packed areas to a lack of available outlets, students are having to navigate around different areas of the campus to secure the right spot, which can be a time-consuming process. As such, we wish to lighten this burden by providing a tool that will help mitigate the need for students to stress over finding the perfect spot that will suit their needs.

## Project task requirements:

- Minimal requirements:
  * A map of campus which highlights all known study spots. ✅
  * The ability to select each study spot and be provided with basic information such as capacity, power port availibilty, etc ✅
  * A robust interface for desktop users ✅
- Standard requirements:
  * A local chatbox for each study spot where users can chat with each other. ✅
  * Robustness for mobile browsers ✅
  * Ability to select distance from one study spot to another point on the map. ✅
  * Addition of study spots booking links from various websites, such as the UBC library website. ✅
- Stretch requirements:
  * Account creations and authenication via student email to keep chatbox free of bots ✅
  * Implement frequency of study spots display on maps ❌
  * Chat auto moderation ✅

## Units 1-5 Tech
- **Unit 1 HTML, CSS, & Javascript:**
  -  Our entire codebase uses aspects of HTML and CSS (styling). All backend is done using Javascript (e.g. web scraping script, NodeJS)
- **Unit 2 React and Redux:**
  - The entire front-end is implemented using React components. As for Redux, we have a store that contains a reducer for the user, profile, and session slices.
- **Unit 3 Express and NodeJS:**
  - We used Express and NodeJS for implementing the backend servers for the chat box and users.
- **Unit 4 NoSQL and MongoDB:**
  - We used MongoDB to store all user information who log into our web app via the Google Authentication API.
- **Unit 5 Release Engineering:**
  - We deployed our project on render.com using GitHub Actions.

## Our Above and Beyond Feature
We implemented a local chat box for each study spot available on the map. This feature allows user to chat with other students in that area, facilitating possible new connections.

The main technology used to implement this was socketIO. When a message is sent, it generates a unique UUID. This message is then sent to the server where it is broadcasted to all other connected clients. One of the biggest issues that we encountered while implementing this feature was getting multiple clients to connect to the server over the network. To overcome this, we used concepts from the DHCP protocol, which is how computers connect to the wifi. Adapting this, our server is able to broadcast the ip address to the network where another client can receive it and in response, send its ip address to the destination that the server sent out. Once the server acquires the IP address of the client, it can establish a connection to it and begin sending messages to and from it. 


## Future Improvements and Next Steps
- The ability to favourite spots and display them on the user's profile.
- Parse Room Booking websites so that users can do bookings through our website.
- Ability for users to add their reviews to the study spots.

One of our stretch goals was to provide live statistics of the study spot but found that there were many complications that came with it. Thus, this is a feature we would like to implement in the future so that users can gauge the busyness of their desired study spot.

## Team Members and Contributions

- Dylan Zhang: Black Ops III enthusiast.
  - Worked on setting up Google Authentication and MongoDB to store all users who log into our web app.
- Gurmandeep Bal: Minecraft Architect
  - Worked on the local chat box for each study spot, troubleshooting and ensuring that multiple clients were able to connect to the server over the network. Also, deployed the project on render.
- Crystal Yim: Squishmallow connoisseur 
  - Worked on the distance measurement feature, allowing users to estimate their walking distance and time between two study spots.
- Allison Kong: Just your average gamer :)
  - Worked on obtaining the study spot data by writing a script that scrapes information from the UBC learning spaces website. Also worked on the About page.
- Linus Chen: Mobile games?
  - Worked on Room Bookings and Github Actions for deployment.


## Test Account Credentials:

**email:** studyspotteruser@gmail.com

**password:** Studyspottertest18!

 
## Prototype Images
### Landing Page
<img src="images/sketch_1.jpg" width="300px">

### Study Spot Details
<img src="images/sketch_2.jpg" width="300px">

### Create an Account 
<img src="images/sketch_3.jpg" width="300px">


## References

**For Google Authentication API:**

https://developers.google.com/identity/protocols/oauth2/web-server

**For Geocoding API:**

https://maps.co/help/

**For Leaflet API:**

https://leafletjs.com/reference.html




