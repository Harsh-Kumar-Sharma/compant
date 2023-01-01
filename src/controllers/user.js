const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const valid = function (input) {
  if (typeof input === undefined || typeof input === null) {
    return false;
  }
  if (typeof input === "string" && input.trim().length > 0) {
    return true;
  }
  if (typeof input === "number" && input.toString().trim().length > 0) {
    return true;
  }
  if (typeof input === "object" && input.length > 0) {
    return true;
  }
};

const createUser = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data) == 0) {
      return res
        .status(400)
        .send({ status: false, message: "body can't be empty" });
    }

    if (!valid(data.Name)) {
      return res
        .status(400)
        .send({ status: false, message: "Name is required" });
    }
    if (!valid(data.PhoneNumber)) {
      return res
        .status(400)
        .send({ status: false, message: "PhoneNumber is required" });
    }
    if (!valid(data.Pincode)) {
        return res
          .status(400)
          .send({ status: false, message: "Pincode is required" });
      }
      if (!valid(data.Aadhar_no)) {
        return res
          .status(400)
          .send({ status: false, message: "Aadhar is required" });
      }
      if (/^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$/.test(data.Aadhar_no)) {
        return res
          .status(400)
          .send({ status: false, message: "Aadhar is required" });
      }
      if (!valid(data.password)) {
        return res
          .status(400)
          .send({ status: false, message: "Password is required" });
      }
      if (!valid(data.usertype)) {
        return res
          .status(400)
          .send({ status: false, message: "usertype is required" });
      }
      if (!["User","Admin"].includes(data.usertype)) {
        return res
          .status(400)
          .send({ status: false, message: "please provide correct user type" });
      }
    if (!/^[6-9]\d{9}$/gi.test(data.PhoneNumber)) {
      return res
        .status(400)
        .send({
          status: false,
          message:
            "Please provide a valid Indian phone number",
        });
    }
    if((/^(?=.*[A-Z0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/)
    .test(data.password)){
      return res
      .status(400)
      .send({
        status: false,
        message:
          "Please provide a valid password",
      });
    }
    

    let isUnique = await userModel.findOne({$or:[{PhoneNumber: data.PhoneNumber},{Aadhar_no:data.Aadhar_no}]});
    if (isUnique) {
      return res
        .status(400)
        .send({
          status: false,
          message: `User already exist please provide aadhar and PhoneNumber unquie.`,
        });
    }
    

    if (data.password.trim().length < 8 || data.password.trim().length > 15) {
      return res
        .status(400)
        .send({
          status: false,
          message:
            "Password should be of minimum 8 characters & maximum 15 characters",
        });
    }

    //encrypting password
    const saltRounds = 10;
    hash = await bcrypt.hash(data.password, saltRounds);

    data.password = hash;

    const newUser = await userModel.create(data);

    return res
      .status(201)
      .send({ status: true, message: "success", data: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

/*-------------------------user login api ---------------------------------*/
const userLogin = async function (req, res) {
  try {
    let data = req.body;

    let { PhoneNumber, password } = data;

    if (!PhoneNumber)
      return res
        .status(400)
        .send({ status: false, message: "PhoneNumber required to login" });

        if (!/^[6-9]\d{9}$/gi.test(data.PhoneNumber)) {
          return res
            .status(400)
            .send({
              status: false,
              message:
                "Please provide a valid Indian phone number with country code (+91..)",
            });
        }

    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "Password required to login" });
        
        if((/^(?=.*[A-Z0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/)
        .test(data.password)) {
      return res
        .status(400)
        .send({
          status: false,
          message:
            "Invalid Password Format! Password Should be 8 to 15 Characters and have a mixture of uppercase and lowercase letters and contain one symbol and then at least one Number.",
        });
    }

    const userData = await userModel.findOne({ email: email });
    if (!userData) {
      return res
        .status(401)
        .send({
          status: false,
          message: "Invalid Login Credentials! You need to register first.",
        });
    }

    let checkPassword = await bcrypt.compare(password, userData.password);

    if (checkPassword) {
      let payload = {
        userId: userData["_id"].toString(),
        Batch: "Plutonium",
        Project: "Products Management",
        iat: Date.now(),
        exp: Date.now(),
      };

      const token = jwt.sign({ payload }, "Alone but Happy", {
        expiresIn: 60 * 60,
      });

      let obj = { userId: userData["_id"], token: token };

      return res
        .status(200)
        .send({ status: true, message: "User login successfull", data: obj });
    } else {
      return res.status(401).send({ status: false, message: "Wrong Password" });
    }
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

module.exports = { createUser, userLogin };
