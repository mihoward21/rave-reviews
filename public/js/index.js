import { productId, setProductData } from "./utils.js";
import { clearReviewData } from "./add_review.js";

const fetchProduct = async () => {
    const response = await $.get('/api/product', {
        'productId': productId,
        'shouldLoadReviews': true,
    });

    setProductData(response.product);

    $('#product-screen').show();
    $('#loading-screen').hide();
};

window.goToReviewPage = () => {
    clearReviewData();
    $('#product-screen').hide();
    $('#add-review-screen').show();
};

$(document).ready(fetchProduct);
