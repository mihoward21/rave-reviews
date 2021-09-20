import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app.js';
import { TEST_PRODUCT_DATA } from './utils.js'

chai.use(chaiHttp);
chai.should();

describe('Review API', () => {
    describe('Test add review', () => {
        it('It should return an error if the rating is 0', async () => {
            const numStars = 0;
            const maxAllowedStars = 5;

            const response = await chai.request(app).post('/api/review').send({
                'productId': TEST_PRODUCT_DATA.productId,
                'numStars': numStars,
                'maxAllowedStars': maxAllowedStars,
            });

            chai.expect(response.status).to.equal(500);
        });

        it('It should return an error if num stars is > max allowed stars', async () => {
            const numStars = 6;
            const maxAllowedStars = 5;

            const response = await chai.request(app).post('/api/review').send({
                'productId': TEST_PRODUCT_DATA.productId,
                'numStars': numStars,
                'maxAllowedStars': maxAllowedStars,
            });

            chai.expect(response.status).to.equal(500);
        });
    });
});
