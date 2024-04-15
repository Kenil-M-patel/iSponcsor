const express = require('express');
const app = express();
const port = 5000;
var fs = require('fs')

let usersList = require('./data.json');


// middleware plug in

app.use(express.urlencoded({extended: false}))

// Route to test the JSON object

// GET to send the JSON object
app.get('/api/users', (req, res) => { 
  return res.json(usersList);
});


app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = usersList.user.find(user => user.id == id);

  return res.json(user)

  // try {
  //   const id = Number(req.params.id);

  //   // Validate id
  //   if (isNaN(id)) {
  //     return res.status(400).json({ error: "Invalid id" });
  //   }

  //   const user = usersList.find(user => user.id === id);

  //   if (!user) {
  //     return res.status(404).json({ error: "User not found" });
  //   }

  //   res.json(user);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: "Internal server error" });
  // }

})

// POST to create a new user

app.post('/api/users', (req, res) => {
  const body = req.body 
  usersList.user.push({...body , id: usersList.length})

  fs.writeFile("./data.json", JSON.stringify(usersList), (err) => {

    return res.json({status: "user added with" , id: usersList})
  })
})

// patch to update an existing user data

app.patch("/api/users/:id", (req, res) => {
  return res.json({status:"panding..."})
})

// DELET to delete an existing user
app.delete("/api/users/:id", (req, res) => {
const body = req.body
 const id = Number(req.params.id);
 const userIndex = usersList.users.find(user => user.id == id);
 usersList.users.splice(userIndex, 1);

 fs.writeFileSync('./data.json', JSON.stringify(usersList), (err)=> {
   return res.json({status: "deleted" })
 })

})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
