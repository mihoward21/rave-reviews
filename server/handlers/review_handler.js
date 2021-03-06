import { Product } from '../models/product.js';
import { Review } from '../models/review.js';

export const addReview = async (req, res) => {
    const productId = req.body.productId;
    const product = await Product.load(productId);
    if (!product) {
        throw new Error(`Failed to load product: ${productId}`);
    }

    const numStars = req.body.numStars;
    const maxAllowedStars = req.body.maxAllowedStars;
    const text = req.body.text;
    const shouldLoadReviews = req.body.shouldLoadReviews === "true" ? true : false; // Defaults to false if undefined

    const review = new Review();
    review.setRating(numStars, maxAllowedStars);
    review.text = text;

    await review.save();
    product.addReview(review);
    await product.save();
    
    if (shouldLoadReviews) {
        await product.loadReviews();
    }

    res.send({
        'product': product.toPublicJson()
    });
};
