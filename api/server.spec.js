const request = require('supertest')

const server = require('./server');
const db = require('../data/dbConfig')

describe('server', () => {
    describe('GET /', () => {
        it('should return 200 OK', () => {
            return request(server).get('/') 
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
    });

    describe("POST /force-users", () => {
        beforeEach(async () =>{
            await db('force-users').truncate()
        })
        it('should return 201 on success', () => {
            return request(server).post('/force-users')
            .send({name: 'Darth Vader'})
            .then(res => {
                expect(res.status).toBe(201);
            })
        });

        it('should add a force user to db and return the added user', async function() {
            const forceUser = 'Darth Vader';
            const existing = await db('force-users').where({name: forceUser});
            expect(existing).toHaveLength(0)
            await request(server).post('/force-users')
            .send({name: forceUser})
            .then(res => {
                expect(res.body).toMatchObject({name: forceUser});
            })

            const inserted = await db('force-users').where({name: forceUser});
            expect(inserted).toHaveLength(1)
        });
    });

    describe("DELETE /force-users", async () => {
        it('should return 204 on successful delete', () => {
            return request(server).delete('/force-users/:id')
            .then(res => {
                expect(res.status).toBe(204);
            })
        });

        it('should remove a force user to db', async function() {
            const hobbitName = 'gaffer';
            const existing = await db('hobbits').where({name: hobbitName});
            expect(existing).toHaveLength(0)
            await request(server).post('/hobbits')
            .send({name: hobbitName})
            .then(res => {
                expect(res.body.message).toBe("Hobbit created successfully");
            })

            const inserted = await db('hobbits').where({name: hobbitName});
            expect(inserted).toHaveLength(1)
        });
    });
});