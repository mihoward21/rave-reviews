import { Product } from '../models/product.js';

export const getProduct = async (req, res) => {
    const productId = req.query.productId;
    const shouldLoadReviews = req.query.shouldLoadReviews === "true" ? true : false; // Defaults to false if undefined

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
