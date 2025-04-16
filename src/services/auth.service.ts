import { AppDataSource } from "../config/data-source"; 
import { User } from "../entities/User";
import { config } from "../config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerUser = async (username: string, email: string, password: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const existingUser = await userRepository.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("El correo ya está registrado");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = userRepository.create({
    username,
    email,
    password: hashedPassword,
    createdAt: new Date(),
  });

  await userRepository.save(newUser);

  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { email } });
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Contraseña incorrecta");
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });

  return { token, user };
};
