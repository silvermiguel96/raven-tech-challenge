import { registerUser, loginUser } from "../services/auth.service";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response)=> {
  try {
    
    console.log("Register endpoint hit");

    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ message: "Validation failed", errors: result.error.errors });
    }

    const { username, email, password } = result.data;
    console.log("Received data:", { username, email, password });

    const newUser = await registerUser(username, email, password);
    console.log("User registered:", newUser);

    return res.status(201).json({ message: "Usuario registrado con éxito", user: newUser });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {

  
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ message: "Validation failed", errors: result.error.errors });
    }
    
    const { email, password } = req.body;

    const { token, user } = await loginUser(email, password);

    return res.status(200).json({ message: "Login exitoso", token, user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
