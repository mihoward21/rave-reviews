import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app.js';

chai.use(chaiHttp);
chai.should();

describe('Product API', () => {
    describe('Test get single product', () => {
        it('It should return the product data', async () => {
            const productId = 'product.43a2b7f1-321c-4dee-a06c-87a588885e41';
            const productName = 'Mikes Miracle Marmalade';

            const response = await chai.request(app).get(`/api/product?productId=${productId}&shouldLoadReviews=true`);

            chai.expect(response.body).to.have.property('product');
            chai.expect(response.body.product).to.have.property('productId');
            chai.expect(response.body.product.productId).to.equal(productId);
            chai.expect(response.body.product).to.have.property('name');
            chai.expect(response.body.product.name).to.equal(productName);
        });
    });
});
