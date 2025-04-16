import { registerSchema, loginSchema } from "../schemas/auth.schema";
import { registerUser, loginUser } from "../services/auth.service";
import { formatZodErrors } from "../utils/zodErrorFormatter";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response)=> {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ errors: formatZodErrors(result.error) });
    }

    const { username, email, password } = result.data;

    const newUser = await registerUser(username, email, password);

    return res.status(201).json({ message: "Usuario registrado con éxito", user: newUser });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {

  
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ errors: formatZodErrors(result.error) });
    }
    
    const { email, password } = result.data;

    const { token, user } = await loginUser(email, password);

    return res.status(200).json({ message: "Login exitoso", token, user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
