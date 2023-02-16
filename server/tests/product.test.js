const mongoose = require("mongoose");
const request = require("supertest");
const { app } = require("../server");
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URL);
});
afterEach(async () => {
  await mongoose.connection.close();
});
describe("GET /api/portfolio/all", () => {
  it("should return all porfolios", async () => {
    const res = await request(app).get("/api/portfolio/all");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
describe("GET /api/portfolio/id", () => {
  it("should return some portfolio by id", async () => {
    const portfolios = await request(app).get("/api/portfolio/all");
    const res = await request(app).get(
      `/api/portfolio/${portfolios.body[0].linktitle}`
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(portfolios.body[0].title);
  });
});
describe("GET /api/user", () => {
  it("should return all users", async () => {
    const AllResponse = await request(app).get("/api/user/all");
    expect(AllResponse.statusCode).toBe(200);
    expect(AllResponse.body.length).toBeGreaterThan(0);
  });
  it("should return one user", async () => {
    const AllResponse = await request(app).get("/api/user/all");
    const OneResponse = await request(app).get(
      `/api/user/${AllResponse.body[0].username}`
    );
    expect(OneResponse.statusCode).toBe(200);
    expect(OneResponse.body).toBeDefined();
  });
});

describe("/POST loginRoute", () => {
  it("should return 400 status code with error message if login data is invalid", async () => {
    // send invalid login data
    const res = await request(app).post("/api/login").send({
      email: "",
      password: "",
    });
    expect(res.statusCode).toBe(400);
  });

  it("should return 404 status code if user is not found", async () => {
    // send valid login data, but no user with this email exists
    const res = await request(app).post("/api/login").send({
      email: "notExisting@test.com",
      password: "password",
    });
    expect(res.statusCode).toBe(404);
    // expect(res.body).toBe("Foydalanuvchi topilmadi");
  });

  it("should return 401 status code if the password is incorrect", async () => {
    // send valid login data with incorrect password
    const res = await request(app).post("/api/login").send({
      email: "ismatovvsanjarbek@gmail.com",
      password: "incorrect",
    });
    expect(res.statusCode).toBe(401);
  });

  it("should return 200 status code with message if logged in successfully", async () => {
    // send valid login data
    const res = await request(app).post("/api/login").send({
      email: "ismatovvsanjarbek@gmail.com",
      password: "12345678",
    });
    expect(res.statusCode).toBe(200);
    // expect(res.body).toBe("Login bajarildi!");
    expect(res.headers["x-token"]).toBeDefined();
  });
});
