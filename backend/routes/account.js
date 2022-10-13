const router = require("express").Router();

// import the models
let Person = require("../models/person.model");

// HOME This will get all the record
router.route("/").get((req, res) => {
  Person.find()
    .then((account) => res.json(account))
    .catch((err) => res.status(400).json("Error :" + err));
});

//  Add This will Add new record
router.route("/add").post((req, res) => {
  const fullname = req.body.fullname;
  const username = req.body.username;
  const age = req.body.age;
  const password = req.body.password;

  const newPerson = new Person({ fullname, username, age, password });

  newPerson
    .save()
    .then((account) => res.json("New Record Successfully Added"))
    .catch((err) => res.status(400).json("Error :" + err));
});

// GET CRUD || DETAILS
router.route("/:id").get((req, res) => {
  Person.findById(req.params.id)
    .then((acc) => res.json(acc))
    .catch((err) => res.status(400).json("Error :" + err));
});

//  DELETE CRUD
router.route("/:id").delete((req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then((acc) => res.json("Record Was Succesfullly Deleted"))
    .catch((err) => res.status(400).json("Error :" + err));
});

// UPDATE CRUD
router.route("/update/:id").post((req, res) => {
  Person.findById(req.params.id)
    .then((acc) => {
      acc.fullname = req.body.fullname;
      acc.username = req.body.username;
      acc.age = req.body.age;
      acc.password = req.body.password;

      acc
        .save()
        .then(() => res.json("Record Was Updated Successfully"))
        .catch((err) => res.status(400).json("Error :" + err));
    })
    .catch((err) => res.status(400).json("Error :" + err));
});

module.exports = router;
