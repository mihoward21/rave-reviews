import { BaseModel } from './base.js';
import { Review, MAX_STARS } from './review.js';

export class Product extends BaseModel {
    productId;
    name;
    reviewIds;
    loadedReviews;
    totalRating; // This is the sum of the rating for all reviews of this product
    constructor(props) {
        super(props);
        this.productId = props?.productId;
        this.name = props?.name;
        this.reviewIds = props?.reviewIds || [];
        this.loadedReviews = [];
        this.totalRating = props.totalRating || 0;
    }

    getPrimaryKeyValue() {
        return this.productId;
    }

    setPrimaryKeyValue(uuid) {
        if (uuid.startsWith('product.')) {
            this.productId = `${uuid}`;
        } else {
            this.productId = `product.${uuid}`;
        }
    }

    toPublicJson() {
        const overallRating = this.getOverallRating();
        const jsonData = {
            'productId': this.productId,
            'name': this.name,
            'reviewIds': this.reviewIds,
            'overallRating': overallRating,
            'numStars': this.getStarNumber(overallRating),
            'maxAllowedStars': MAX_STARS
        };

        if (this.loadedReviews.length > 0) {
            jsonData.loadedReviews = this.loadedReviews.map((review) => {
                return review.toPublicJson();
            });
        }

        return jsonData;
    }

    getOverallRating() {
        if (this.reviewIds.length === 0) {
            return null;
        }

        // Return the rating to two decimal places
        return Math.round((this.totalRating / this.reviewIds.length) * 100) / 100;
    }

    getStarNumber(overallRating) {
        if (!overallRating) {
            return 0;
        }

        // Multiply by 2 inside the round, then divide by 2 afterwards to support
        // half stars
        return Math.round(overallRating * MAX_STARS * 2) / 2;
    }

    toDbJson() {
        const dbObj = super.toDbJson();
        Object.assign(dbObj, {
            'productId': this.productId,
            'name': this.name,
            'reviewIds': this.reviewIds,
            'totalRating': this.totalRating,
        });
        return dbObj;
    }

    async loadReviews() {
        this.loadedReviews = [];
        // Ideally we'd have a bulk load option so we're not making lots of separate requests
        // to the db.
        for (const reviewId of this.reviewIds) {
            const review = await Review.load(reviewId);
            this.loadedReviews.push(review);
        }
    }

    addReview(review) {
        this.reviewIds.push(review.reviewId);
        this.totalRating += review.rating;
    }
}
