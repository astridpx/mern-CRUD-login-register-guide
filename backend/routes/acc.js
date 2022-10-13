const router = require("express").Router();
const bcrypt = require("bcrypt");

// import the schema and function validate
const { Account, validate } = require("../models/account.model");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    //   This will determine is the username is already exist
    const user = await Account.findOne({ username: req.body.username });
    if (user)
      return res.status(409).send({ message: "Username is already exist" });

    //   This will hash the password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // This will create the user
    await new Account({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User Registered Successfully" });

    // catch error
  } catch (error) {
    res.status(500).send({ message: "Internal Servers Acc Error" + error });
  }
});

module.exports = router;
