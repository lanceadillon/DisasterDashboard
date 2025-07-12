/**
 * @file server.js
 * @author Lance Dillon
 * @description This server-side script is responsible for generating and
 * periodically sending randomized mock social media posts related to disasters.
 * It uses Socket.IO to broadcast these posts in real-time to connected clients,
 * categorizing them by problem type (Fire, Flood, Power, Medical) and priority
 * level (Low, Medium, High, Critical).
 *
 * @requires express - Web framework for Node.js.
 * @requires http - Node.js HTTP module for creating the server.
 * @requires socket.io - Real-time bidirectional event-based communication.
 * @requires random-name - Library to generate random names for mock posts.
 * @requires lorem-ipsum - Library to generate random Lorem Ipsum text for post content.
 * @requires cors - Middleware for enabling Cross-Origin Resource Sharing.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {
  cors: {
     origin: 'http://localhost:8080', // Explicitly allow frontend origin
        methods: ["GET", "POST"], // Allow GET/POST for handshake
        credentials: true
  }
});
var random = require('random-name');
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const cors = require('cors');
// setup lorem ipsum random text generator
const lorem = new LoremIpsum({});

// When a connection is made, loop forever sending randomly generated social 
// media post content...
io.on('connection', async function(socket){

    console.log("A connection is made...");

    while (true)
    {
      // Randomly generate the post content
      var typePost = Math.floor(Math.random() * 10);
      var postContent = lorem.generateWords(Math.floor(Math.random() * 42) + 3)

      // Randomly generate a fire, flood, power or medical problem
      var typeProblem = Math.floor(Math.random() * 4);
      var problemType = "";
      if (typeProblem == 0) problemType = "Fire";
      else if (typeProblem == 1) problemType = "Flood"
      else if (typeProblem == 2) problemType = "Power"
      else if (typeProblem == 3) problemType = "Medical"

      // Randomly generate the priority level of the problem
      var typePriority = Math.floor(Math.random() * 4);
      var priorityLevel = "";
      if (typePriority == 0) priorityLevel = "Low";
      else if (typePriority == 1) priorityLevel = "Medium"
      else if (typePriority == 2) priorityLevel = "High"
      else if (typePriority == 3) priorityLevel = "Critical"

      // build the social media post content
      post = 
      {
        name: random.first() + " " + random.last(),
        image: "http://localhost:3000/images/" + 
               (Math.floor(Math.random() * 114) + 1) + ".jpg",
        problem: problemType,
        priority: priorityLevel,
        content: postContent,
        timestamp: new Date().toISOString()
      }

      console.log(post);

      // emit the post
      io.emit('social_media_post', post);

      // wait some amount of time until sending the next post
      var nextPostTime = (Math.floor(Math.random() * 10) + 1) * 500;
      await new Promise(r => setTimeout(r, nextPostTime)).catch( error => console.error("error") );
    }

});

app.get("/", function(req,res) {
  res.sendFile(__dirname + "/index.html");
});

// Sends back the image files when they are requested
app.get(/^(.+)$/, function(req,res){
  res.sendFile(__dirname + req.params[0]);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
    