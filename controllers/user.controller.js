import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

export const registerUser = asyncHandler(async (req, res) => {
  //---------
  const { username, email, password, isAdmin } = req.body;
  if (!username || !email || !password) {
    throw new Error("please fill all the inputs");
  }
  //-------------
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exits with this email");
  }
  //-----------
  const hash = bcrypt.hashSync(password, 10);

  //------------
  const newUser = new User({
    email,
    password: hash,
    username,
    isAdmin
  });
  //------------
  try {
    const user = await newUser.save();
    createToken(res, user._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("all field are required");
  }

  const userExists = await User.findOne({ email });
  if (!userExists) {
    throw new Error("Invalid Credentials");
  }
  if (userExists) {
    const validPassword = bcrypt.compareSync(password, userExists.password);
    if (!validPassword) {
      throw new Error("Invalid Credentials");
    }
    createToken(res, userExists._id);
    res.status(201).json(userExists);

    return;
  }
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httyOnly: true,
    expires: new Date(0),
  });

  res.status(201).json({ message: "user logout sucessfully" });
});

export const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.statu(401).json({ message: "user not found !!!" });
  }
});

export const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username;
    user.email = req.body.email;

    if (req.body.password) {
      const hash = bcrypt.hashSync(req.body.password, 10);
      user.password = hash;
    }

    const updatedUser = await user.save();

    res.status(201).json(updatedUser);
  } else {
    res.status(401);
    throw new Error("user not found !!!");
  }
});

//admin
export const allUser = asyncHandler(async (req, res) => {
  const allUser = await User.find({});
  res.status(200).json(allUser);
});

export const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(401);
      throw new Error("admin user cant be delete !!!");
    } else {
      await User.deleteOne(user._id);
      res.status(201);
      res.send("user has been deleted !!!");
    }
  } else {
    res.status(401);
    throw new Error(" user not found !!!");
  }
});

export const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(401);
      throw new Error("Admin user cannot be edit !!!");
    } else {
      user.username = req.body.username;
      user.email = req.body.email;
      user.isAdmin = req.body.isAdmin;

      await user.save();
      res.status(201).json(user);
    }
  } else {
    res.status(401);
    throw new Error("user not found !!!");
  }
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(201).json(user);
  } else {
    res.status(401);
    throw new Error("user not found !!!");
  }
});
