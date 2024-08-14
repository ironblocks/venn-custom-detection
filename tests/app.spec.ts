import { name, version } from '@root/package.json'
import request from 'supertest'

import { app, server } from '@/app'

describe('Service Tests', () => {
    afterAll(async () => {
        server.close()
    })

    describe('App Controller', () => {
        test('version', async () => {
            // Arrange
            const expectedData = { version, name }

            // Act
            const response = await request(app).get('/version')

            // Assert
            expect(response.status).toBe(200)
            expect(response.body).toEqual(expectedData)
        })

        test('health check', async () => {
            // Arrange
            const expectedData = { message: 'OK' }

            // Act
            const response = await request(app).get('/health-check')

            // Assert
            expect(response.status).toBe(200)
            expect(response.body).toEqual(expectedData)
        })
    })
})
