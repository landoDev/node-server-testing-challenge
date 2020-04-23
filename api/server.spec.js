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

    describe('GET /force-users', () => {
        it('should return 200 OK', () => {
            return request(server).get('/force-users') 
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it('should return an array of users', () => {
            const expected = [{ id: 1, name: 'Darth Vader'}]
            return request(server).get('/force-users') 
            .then(res => {
                expect(res.body).toEqual(expect.arrayContaining(expected))
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
            // 204 doesn't return anything lol go figure
            return request(server).delete('/force-users/:id')
            .then(res => {
                expect(res.status).toBe(200);
            })
        });

        it('should remove a force user from db', async () => {
            return request(server).delete('/force-users/:id')
            .then(res => {
                expect(res.body.message).toBe('Force user successfully removed');
            })
        });
    });
});