const expressAsyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const generateToken = require("../config/jsonToken");

const createUser = expressAsyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await userModel.findOne({ email: email });
  console.log(findUser);
  if (!findUser) {
    const newuser = await userModel.create(req.body);
    res.json(newuser);
  } else {
    throw new Error("User already exists");
  }
});

const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const finduser = await userModel.findOne({ email: email });
  if (finduser && (await finduser.isPasswordmatched(password))) {
    res.json({
      _id: finduser._id,
      firstname: finduser?.firstname,
      lastname: finduser?.lastname,
      email: finduser?.email,
      mobile: finduser?.mobile,
      token: generateToken(finduser._id),
    });
  } else {
    throw new Error("invalid credentials");
  }
});

const GetAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    throw new Error("no users found ");
  }
});

const GetUserbyId = expressAsyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById({ _id: id });
    res.json(user);
  } catch (error) {
    throw new Error("user not found ");
  }
});

const DeleteUserbyId = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findByIdAndDelete({ _id: id });
  try {
    if (user) {
      res.json(user);
    } else {
      throw new Error("user not found ");
    }
  } catch (error) {
    throw new Error("user not found ");
  }
});

const UpdateUser = expressAsyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const finduser = await userModel.findByIdAndUpdate(
      { _id: id },
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(finduser);
  } catch (error) {
    throw new Error("user not found");
  }
});

module.exports = {
  createUser,
  login,
  GetAllUsers,
  GetUserbyId,
  DeleteUserbyId,
  UpdateUser,
};
