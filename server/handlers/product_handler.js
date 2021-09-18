import { Product } from '../models/product.js';

export const getProduct = async (req, res) => {
    const productId = req.query.productId;
    let shouldLoadReviews = req.query.shouldLoadReviews; // Defaults to true
    if (shouldLoadReviews === undefined) {
        shouldLoadReviews = true;
    }

    const product = await Product.load(productId);
    if (!product) {
        throw new Error(`Failed to load product: ${productId}`);
    }

    if (shouldLoadReviews) {
        await product.loadReviews();
    }

    res.send({
        'product': product.toPublicJson()
    });
};
