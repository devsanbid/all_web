import request from "supertest";
import app from "../../app";
import UserModelSchema from "../../models/user.model";

// top-level -> suite
//

describe("Integration Auth: ", () => {
  beforeAll(async () => {
    await UserModelSchema.deleteMany();
  })

  // grouped/nest
  describe("POST /api/v1/auth/register", () => {
    test("should validate user", () => {
      async () => {
        const res = await request(app).post("/api/v1/auth/register").send({
          'firstName': 'Sandy',
          'lastName': "Dai"
        })

        // exppect -> to be 
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);

      }
    })
  })

})
