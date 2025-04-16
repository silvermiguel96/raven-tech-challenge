import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);

export const findUserByEmail = async (email: string) => {
  return await userRepository.findOne({ where: { email } });
};

export const createUser = async (username: string, email: string, hashedPassword: string) => {
  const user = userRepository.create({
    username,
    email,
    password: hashedPassword,
    createdAt: new Date(),
  });
  return await userRepository.save(user);
};

export const findById = async (id: string) => {
  return await userRepository.findOne({ where: { id } });
};