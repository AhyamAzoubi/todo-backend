import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).send(users);
  } catch (error) {
    console.log({ message: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const newUser = req.body;
    // prüfen ,dass email-Adresse nicht mehrfach in Datenbank sind
    const existedUser = await UserModel.findOne({ email: newUser.email });
    if (existedUser) {
      const error = new Error("Diese E-mail-Adesse existiert bereits");
      error.statusCode = 400;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const { firstName, lastName, email, _id } = await UserModel.create({
      ...newUser,
      password: hashedPassword,
    });
    res.status(201).send({ firstName, lastName, email, _id });
  } catch (error) {
    res.send({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      const error = new Error(
        `Es gibt keinen User mit der ID ${req.params.id}`
      );
      error.statusCode = 404;
      throw error;
    }
    res.send(user);
  } catch (error) {
    res.send({ message: error.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      const error = new Error(
        `Es gibt keinen User mit der id ${req.params.id}`
      );
      throw error;
    }
    res.send(user);
  } catch (error) {
    res.send({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const userData = req.body;
    const JWT_KEY = process.env.JWT || "SECRET_KEY";
    const userFromDb = await UserModel.findOne({ email: userData.email });
    if (!userFromDb) {
      const error = new Error(
        `Es gibt keinen User mit der email ${userData.email}`
      );
      error.statusCode = 401;
      throw error;
    }
    const checkPassword = await bcrypt.compare(
      userData.password,
      userFromDb.password
    );
    if (!checkPassword) {
      const error = new Error(`Invalid Password or Invalid E-Mail`);
      error.statusCode = 402;
      throw error;
    }
    const token = jwt.sign(
      {
        email: userData.email,
        userId: userFromDb._id,
      },
      JWT_KEY,
      { expiresIn: "3h" }
    );
    res.send({
      message: `Login Successful. Hallo ${userFromDb.firstName} ${userFromDb.lastName}`,
      token,
    });
  } catch (error) {
    res.send({ message: error.message });
  }
};

export { getUsers, addUser, getUserById, deleteUserById, login };
