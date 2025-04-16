import { findUserByEmail, createUser } from "../repositories/auth.repository";
import { generateToken, hashPassword, comparePassword } from "../utils/auth";

export const registerUser = async (username: string, email: string, password: string) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("El correo ya está registrado");
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await createUser(username, email, hashedPassword);

  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Contraseña incorrecta");
  }

  const token = generateToken(user.id.toString(), user.email);

  return { token, user };
};
