const router = require("express").Router();
// const { schema } = require("mongoose");
const { Account } = require("../models/account.model");
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await Account.findOne({ username: req.body.username });
    if (!user) return res.status(401).send({ message: "Invalid Username " });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Password" });

    const token = user.generateAuthToken();
    res.status(200).send({
      data: token,
      message: "Loggin in Successfull",
    });
  } catch (error) {
    res.status(500).send({ message: " auth Server error" + error });
    console.log(error);
  }
});

const validate = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(4).max(20).required().label("Username"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
