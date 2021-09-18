import { BaseModel } from './base.js';

const MIN_RATING = 1;
const MAX_RATING = 5;

// This character limit was just arbitrarily chosen. Still, it would be something I believe
// we'd want to have. Both from a database perspective, and potentially from a UX 
// perspective.
const MAX_TEXT_CHARS = 1000;

export class Review extends BaseModel {
    reviewId;
    rating; // This should be a float between 0 and 1.
    text;
    constructor(props) {
        super(props);
        this.reviewId = props?.reviewId;
        this.rating = props?.rating;
        this.text = props?.text;
    }

    getPrimaryKeyValue() {
        return this.reviewId;
    }

    setPrimaryKeyValue(uuid) {
        if (uuid.startsWith('review.')) {
            this.reviewId = `${uuid}`;
        } else {
            this.reviewId = `review.${uuid}`;
        }
    }

    toPublicJson() {
        return {
            'reviewId': this.reviewId,
            'numStars': this.getStarNumber(),
            'maxAllowedStars': MAX_RATING,
            'text': this.text,
        };
    }

    getStarNumber() {
        // The number of stars will adjust based on our current settings.
        // So if someone originally gave 4 out of 5 stars, and in the future
        // we changed it to a 10 star scale, it would come out as 8 out of 10
        // stars then.
        return this.rating * MAX_RATING;
    }

    toDbJson() {
        const dbObj = super.toDbJson();
        Object.assign(dbObj, {
            'reviewId': this.reviewId,
            'rating': this.rating,
            'text': this.text,
        });
        return dbObj;
    }

    setRating(numStars, numStarsDisplayed) {
        if (numStars < MIN_RATING || numStars > numStarsDisplayed) {
            throw new Error(`The number of selected stars must be between ${MIN_RATING} and ${numStarsDisplayed}`);
        }

        this.rating = numStars / MAX_RATING;
    }

    validateData() {
        if (this.text && this.text.length > MAX_TEXT_CHARS) {
            throw new Error(`Review comments cannot have more than ${MAX_TEXT_CHARS} characters`);
        }

        if (this.rating <= 0 || this.rating > 1) {
            throw new Error(`Invalid rating: ${this.rating}. It must be between 0 and 1`);
        }
    }
}
