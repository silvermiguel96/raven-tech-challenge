import { findUserByEmail, createUser } from "../repositories/auth.repository";
import { generateToken, hashPassword, comparePassword } from "../utils/auth";
import { ApiError } from "../utils/errorHandler";

export const registerUser = async (username: string, email: string, password: string) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new ApiError(401, "El correo ya está registrado", [
      "Por favor, intente con otro correo electrónico."
    ]);
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await createUser(username, email, hashedPassword);

  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new ApiError(404, "Usuario no encontrado", [
      "Por favor, asegúrese de que la contraseña o correo es correcta.."
    ]);
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(403, "Contraseña incorrecta", [
      "Por favor, asegúrese de que la contraseña o correo es correcta."
    ]);
  }

  const token = generateToken(user.id.toString(), user.email);

  return { token, user };
};