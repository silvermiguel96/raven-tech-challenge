// src/tests/auth.controller.test.ts
import request from "supertest";
import app from "../app";
import { AppDataSource } from "../config/data-source";

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

let token: string;

describe("Auth Endpoints", () => {

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({
        username: "testuser",
        email: "testuser@example.com",
        password: "Test1234!"
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("email", "testuser@example.com");
  });

  it("should login an existing user", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "testuser@example.com",
        password: "Test1234!"
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("email", "testuser@example.com");
  });

  it("should fail login with wrong password", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "testuser@example.com",
        password: "WrongPassword!"
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message");
  });

  it("should login an existing user and get a token", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "testuser@example.com",
        password: "Test1234!"
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("should perform a calculation operation using the token", async () => {
    expect(token).toBeDefined();

    const calcRes = await request(app)
      .post("/api/v1/calculate")
      .set("Authorization", `Bearer ${token}`)
      .send({
        operation: "ADDITION",
        operandA: 10,
        operandB: 5
      });

    expect(calcRes.statusCode).toEqual(200);
    expect(calcRes.body).toHaveProperty("result");
    expect(calcRes.body.result).toEqual("15");
  });

  it("should perform a subtraction operation using the token", async () => {
    const calcRes = await request(app)
      .post("/api/v1/calculate")
      .set("Authorization", `Bearer ${token}`)
      .send({
        operation: "SUBTRACTION",
        operandA: 20.3,
        operandB: 5.7
      });

    expect(calcRes.statusCode).toEqual(200);
    expect(calcRes.body).toHaveProperty("result");
    expect(calcRes.body.result).toEqual("14.6");
  });

  it("should perform a multiplication operation using the token", async () => {
    const calcRes = await request(app)
      .post("/api/v1/calculate")
      .set("Authorization", `Bearer ${token}`)
      .send({
        operation: "MULTIPLICATION",
        operandA: 3.5,
        operandB: 2
      });

    expect(calcRes.statusCode).toEqual(200);
    expect(calcRes.body).toHaveProperty("result");
    expect(calcRes.body.result).toEqual("7");
  });

  it("should perform a division operation using the token", async () => {
    const calcRes = await request(app)
      .post("/api/v1/calculate")
      .set("Authorization", `Bearer ${token}`)
      .send({
        operation: "DIVISION",
        operandA: 10,
        operandB: 2
      });

    expect(calcRes.statusCode).toEqual(200);
    expect(calcRes.body).toHaveProperty("result");
    expect(calcRes.body.result).toEqual("5");
  });

  it("should fail division by zero", async () => {
    const calcRes = await request(app)
      .post("/api/v1/calculate")
      .set("Authorization", `Bearer ${token}`)
      .send({
        operation: "DIVISION",
        operandA: 10,
        operandB: 0
      });

    expect(calcRes.statusCode).toEqual(400);
    expect(calcRes.body).toHaveProperty("message");
    expect(calcRes.body.message).toBe("No se puede dividir por cero.");
  });

  it("should perform a power operation using the token", async () => {
    const calcRes = await request(app)
      .post("/api/v1/calculate")
      .set("Authorization", `Bearer ${token}`)
      .send({
        operation: "POWER",
        operandA: 2,
        operandB: 3
      });

    expect(calcRes.statusCode).toEqual(200);
    expect(calcRes.body).toHaveProperty("result");
    expect(calcRes.body.result).toEqual("8");
  });

  it("should fail to calculate square root of a negative number", async () => {
    const calcRes = await request(app)
      .post("/api/v1/calculate")
      .set("Authorization", `Bearer ${token}`)
      .send({
        operation: "SQUARE_ROOT",
        operandA: -9
      });

    expect(calcRes.statusCode).toEqual(400);
    expect(calcRes.body.errors).toHaveProperty("message");
    expect(calcRes.body.errors.message).toBe("No se puede calcular la raíz cuadrada de un número negativo.");
  });

  it("should perform a square root operation using the token", async () => {
    const calcRes = await request(app)
      .post("/api/v1/calculate")
      .set("Authorization", `Bearer ${token}`)
      .send({
        operation: "SQUARE_ROOT",
        operandA: 16
      });

    expect(calcRes.statusCode).toEqual(200);
    expect(calcRes.body).toHaveProperty("result");
    expect(calcRes.body.result).toEqual("4");
  });

  it("should fail when operandA is out of range", async () => {
    const calcRes = await request(app)
      .post("/api/v1/calculate")
      .set("Authorization", `Bearer ${token}`)
      .send({
        operation: "ADDITION",
        operandA: 1000001,
        operandB: 5
      });

    expect(calcRes.statusCode).toEqual(400);
    expect(Array.isArray(calcRes.body.errors)).toBe(true);
    expect(calcRes.body.errors.length).toBeGreaterThan(0);
    expect(calcRes.body.errors[0]).toHaveProperty("message");
    expect(calcRes.body.errors[0].message).toBe("Operand A debe estar entre -1,000,000 y 1,000,000");
  });

  it("should fail when operandB is out of range", async () => {
    const calcRes = await request(app)
      .post("/api/v1/calculate")
      .set("Authorization", `Bearer ${token}`)
      .send({
        operation: "ADDITION",
        operandA: 10,
        operandB: 1000001
      });

    expect(calcRes.statusCode).toEqual(400);
    expect(Array.isArray(calcRes.body.errors)).toBe(true);
    expect(calcRes.body.errors.length).toBeGreaterThan(0);
    expect(calcRes.body.errors[0]).toHaveProperty("message");
    expect(calcRes.body.errors[0].message).toBe("Operand B debe estar entre -1,000,000 y 1,000,000");
  });

});
