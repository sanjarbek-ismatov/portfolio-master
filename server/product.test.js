const mongoose = require("mongoose");
const request = require("supertest");
const { app } = require("./server");
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
      `/api/portfolio/${
        portfolios.body[0].author.username
      }_${portfolios.body[0].title.replace(" ", "+")}`
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
