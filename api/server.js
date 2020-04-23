const express = require("express");
const db = require('../data/dbConfig')
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/force-users", (req, res) => {
    // if time
});

server.post("/force-users", (req, res) => {
    const forceUser = req.body
    // return res.status(200).json(forceUser);
    return db('force-users').insert(forceUser)
    .then(sensitive => {
        console.log('promise', forceUser)
      res.status(201).json(forceUser);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.delete("/force-users/:id", (req, res) => {
    // const hobbitInfo = req.body;
  
    // Hobbits.(hobbitInfo)
    //   .then(hobbits => {
    //     res.status(201).json({ message: 'Hobbit created successfully'});
    //   })
    //   .catch(error => {
    //     res.status(500).json(error);
    //   });
});

module.exports = server;