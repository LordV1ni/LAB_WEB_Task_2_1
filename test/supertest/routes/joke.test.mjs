import supertest from 'supertest';
import app from '../../../app.mjs';
import {globalTeardown} from "../setupTests.mjs";

describe('Jokes', () => {
    describe('GET jokes', () => {
        it('should return all jokes', async () => {
            const response = await supertest(app).get('/api/joke');
            expect(response.status).toBe(200);
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });
})

afterAll(async () => {
    await globalTeardown();  // close DB after all tests
});