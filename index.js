import express, { request, response } from "express";
import data from "./data/mock.json" assert { type: "json" };

const app = express();

const PORT = 3000;

//using the public folder at the rootof the project
app.use(express.static("public"));

// Using the image folder at the route /images
app.use("/images", express.static("images"));

//using express.json and express.urlencoded
// app.use(express.json());

app.use(express.urlencoded({ extended: true }));


//get
app.get("/", (request, response) => {
 response.json(data);
});

//POST - express.json and express.urlencoded
app.post("/item",(request, response) =>{
  console.log(request.body);
  response.send(request.body);
})

//get - redirect method
app.get("/redirect", (request, response) => {
response.redirect("http://www.linkedin.com")
 });

//Route chaining
app.route("/class")
.get((request, response) => {
  // response.send("Retrieve class info");
  throw new Error();
})
.post((request, response) => {
  response.send("Create class info");
})
.put((request, response) => {
  response.send("Update class info");
});


//get with next
app.get("/next", (request, response, next) => {
console.log("This responce will send by the next function");
next();
},
(request, response) =>{
  response.send("I just set up a route with a second callback.")
}
);

//get with routing parameters 
app.get("/class/:id", (request, response) => {
  const studentId = Number(request.params.id);

  const student =  data.filter((student) => student.id === studentId)
  response.send(student)
})

//post
app.post("/create", (request, response) => {
  response.send("This is a POST request at /create");
});
//put
app.put("/edit", (request, response) => {
  response.send("This is a PUT request at /edit");
});
//delete
app.delete("/delete", (request, response) => {
  response.send("This is a DELETE request at /delete");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");

})

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  // console.log(data);
});
