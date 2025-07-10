import { test, expect, APIRequestContext } from '@playwright/test';

test.describe('Restful Booker API Test Suite', () => {
    let apiContext: APIRequestContext;
    const baseURL = 'https://restful-booker.herokuapp.com';
    let bookingId: number;
    let token: string;
    test.beforeAll(async ({ playwright }) => {
        // Ստեղծում ենք հիմնական context
        apiContext = await playwright.request.newContext({
            baseURL,
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
            },
        });
        // Ստանում ենք թոքեն /auth endpoint-ից
        const authResponse = await apiContext.post('/auth', {
            data: { username: 'admin', password: 'password123' },
        });
        expect(authResponse.ok()).toBeTruthy(); // Ստուգում ենք՝ արդյոք հաջող էր
        const authData = await authResponse.json();
        token = authData.token;
        console.log('Ստացված թոքեն:', token);
        // Ստեղծում ենք նոր context
        apiContext = await playwright.request.newContext({
            baseURL,
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
                'Cookie': `token=${token}`, // Թոքենը փոխանցում ենք որպես Cookie
            },
        });
    });
    // ստանալ բոլոր booking ID-ները
    test('GET all booking IDs', async () => {
        const response = await apiContext.get('/booking');
        expect(response.ok()).toBeTruthy();
        const data = await response.json();
        console.log('GET /booking response:', data);
        expect(Array.isArray(data)).toBe(true);
    });
    //ստեղծել նոր booking
    test('POST create new booking', async () => {
        const newBooking = {
            firstname: 'John',
            lastname: 'Doe',
            totalprice: 123,
            depositpaid: true,
            bookingdates: {
                checkin: '2023-07-01',
                checkout: '2023-07-10',
            },
            additionalneeds: 'Breakfast',
        };
        const response = await apiContext.post('/booking', { data: newBooking });
        expect(response.status()).toBe(200);
        const data = await response.json();
        console.log('POST /booking response:', data);
        expect(data).toHaveProperty('bookingid');

        bookingId = data.bookingid; // Պահել ենք ստեղծված booking-ի ID-ն
    });

    // ստանալ կոնկրետ booking ըստ ID-ի
    test('GET single booking by ID', async () => {
        const response = await apiContext.get(`/booking/${bookingId}`);
        expect(response.status()).toBe(200);
        const data = await response.json();
        console.log(`GET /booking/${bookingId} response:`, data);
        expect(data.firstname).toBe('John');
    });

    // թարմացնել booking-ի ամբողջ ինֆոն
    test('PUT update booking info', async () => {
        const updatedBooking = {
            firstname: 'Jane',
            lastname: 'Smith',
            totalprice: 456,
            depositpaid: false,
            bookingdates: {
                checkin: '2023-08-01',
                checkout: '2023-08-10',
            },
            additionalneeds: 'Lunch',
        };

        const response = await apiContext.put(`/booking/${bookingId}`, {
            data: updatedBooking,
        });
        expect(response.status()).toBe(200);
        const data = await response.json();
        console.log(`PUT /booking/${bookingId} response:`, data);
        expect(data.firstname).toBe('Jane');
    });

    // թարմացնել booking-ը մասամբ։միայն անունը
    test('PATCH partially update booking info', async () => {
        const partialUpdate = {
            firstname: 'Janet',
        };

        const response = await apiContext.patch(`/booking/${bookingId}`, {
            data: partialUpdate,
        });
        expect(response.status()).toBe(200);
        const data = await response.json();
        console.log(`PATCH /booking/${bookingId} response:`, data);
        expect(data.firstname).toBe('Janet');
    });

    //ջնջել bookingը
    test('DELETE booking', async () => {
        const response = await apiContext.delete(`/booking/${bookingId}`);
        console.log(`DELETE /booking/${bookingId} status:`, response.status());
        expect([201, 200]).toContain(response.status());
    });
});
