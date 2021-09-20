import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app.js';
import { TEST_PRODUCT_DATA } from './utils.js';

chai.use(chaiHttp);
chai.should();

describe('Product API', () => {
    describe('Test get single product', () => {
        it('It should return the product data with reviews', async () => {
            const response = await chai.request(app).get(`/api/product?productId=${TEST_PRODUCT_DATA.productId}&shouldLoadReviews=true`);

            chai.expect(response.body).to.have.property('product');
            chai.expect(response.body.product).to.have.property('productId');
            chai.expect(response.body.product.productId).to.equal(TEST_PRODUCT_DATA.productId);
            chai.expect(response.body.product).to.have.property('name');
            chai.expect(response.body.product.name).to.equal(TEST_PRODUCT_DATA.name);
            chai.expect(response.body.product.overallRating).to.equal(0.6);
            chai.expect(response.body.product).to.have.property('loadedReviews');
            chai.expect(response.body.product.loadedReviews.length).to.equal(3);
        });

        it('It should return the product data but without loaded reviews', async () => {
            const response = await chai.request(app).get(`/api/product?productId=${TEST_PRODUCT_DATA.productId}`);

            chai.expect(response.body).to.have.property('product');
            chai.expect(response.body.product).to.have.property('productId');
            chai.expect(response.body.product.productId).to.equal(TEST_PRODUCT_DATA.productId);
            chai.expect(response.body.product).to.have.property('name');
            chai.expect(response.body.product.name).to.equal(TEST_PRODUCT_DATA.name);
            chai.expect(response.body.product.overallRating).to.equal(0.6);
            chai.expect(response.body.product).to.not.have.property('loadedReviews');
        });
    });
});
