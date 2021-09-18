import { BaseModel } from './base.js';
import { Review } from './review.js';

export class Product extends BaseModel {
    productId;
    name;
    reviewIds;
    loadedReviews;
    constructor(props) {
        super(props);
        this.productId = props?.productId;
        this.name = props?.name;
        this.reviewIds = props?.reviewIds || [];
        this.loadedReviews = [];
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
        const jsonData = {
            'productId': this.productId,
            'name': this.name,
            'reviewIds': this.reviewIds,
        };

        if (this.loadedReviews.length > 0) {
            jsonData.loadedReviews = this.loadedReviews.map((review) => {
                return review.toPublicJson();
            });
        }

        return jsonData;
    }

    toDbJson() {
        const dbObj = super.toDbJson();
        Object.assign(dbObj, {
            'productId': this.productId,
            'name': this.name,
            'reviewIds': this.reviewIds,
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

    addReview(reviewId) {
        this.reviewIds.push(reviewId);
    }
}
