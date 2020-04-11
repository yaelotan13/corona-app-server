# corona-app-server

# Description
This is the server code base for a corona hot map app.
The app offers a quick survey which tests the known coronavirus symptoms and a map showing the spread of the coronavirus around your current area.

# Getting Started
To get this app up and running on you local machine, start by cloning or downloading it.
Then, navigate to the downloaded directory and install all the dependencies: 
npm install 

To start the see the app running, you need to have the corona-app-ui code as well:

   - clone/download the corona-app-ui 
   - navigate the the corona-app-ui directory
   - install it's dependencies: npm install
   - start the server:
   
     - using npm: npm start
     - using docker: 
         - docker build -t server . --build-arg ENV=production
         - docker run -p 5000:5000 server
   - in the corona-app-ui directory, start the app using the command: npm start
   
# Build with 

Node.JS 

Express

Docker

# Authors
This app is based on a group app made with the awesomes:

Nir Shidlansik

Daniel Soifer

Ran Shieber

Vladimir Kraykin

   
  

