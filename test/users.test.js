const request = require('supertest')
const app = require('../app')

describe("GET /", () => {
    it("Should get all data", async () => {
        const res = await request(app).get('/')
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('length')
        expect(res.body.length).toBeGreaterThanOrEqual(0)
    })
})

describe("GET /:id", () => {
    it("Should get data", async () => {
        const res = await request(app).get('/0')
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('data')
    })

    it("Should not found data.", async () => {
        const res = await request(app).get('/7')
        expect(res.statusCode).toBe(404)
        expect(res.body).toHaveProperty('msg')
    })
})

describe("POST /", () => {

    describe("Create new user", () => {

        const data = {
            "name": "Lucas",
            "age": 21,
            "country": "Brazil"
        }

        it("Should respond with a 200 status code.", async () => {
            const response = await request(app).post("/").send(data)
            expect(response.statusCode).toBe(200)
        })
        it("Should specify json in the content type header.", async () => {
            const response = await request(app).post("/").send(data)

            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })
        it("When some field is missing.", async () => {
            const users = [
                {
                    "name": "Lucas",
                    "age": 21,
                },
                {
                    "age": 21,
                    "country": "Brazil"
                },
                {
                    "name": "Lucas",
                    "country": "Brazil"
                },
                {}
            ]
            for (const user of users) {
                const response = await request(app).post("/").send(user)

                expect(response.statusCode).toBe(400)
            }
        })
    })
})