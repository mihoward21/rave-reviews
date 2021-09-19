const MAX_STARS = 5;

const fetchProduct = async () => {
    const productId = 'product.43a2b7f1-321c-4dee-a06c-87a588885e41';
    const response = await $.get('/api/product', {
        'productId': productId,
        'shouldLoadReviews': true,
    });

    // Round the overall rating to one decimal place
    const overallRating = Math.round(response.product.overallRating * MAX_STARS * 10) / 10;

    $('#product-name').html(response.product.name);
    $('#product-overall-rating').html(overallRating);
    fillInStars('overall-rating-star', overallRating);

    $('#product-screen').show();
    $('#loading-screen').hide();
};

const setProductReviews = (reviewsList) => {
    if (!reviewsList || reviewsList.length === 0) {
        $('#no-reviews-message').show();
        return;
    }


};

const fillInStars = (idPrefix, rating) => {
    // Round the rating to a whole number for the star display
    const visibleStars = Math.round(rating);
    let starCounter = 1;
    while (starCounter <= visibleStars) {
        const spanId = `${idPrefix}-${starCounter}`;
        $(`#${spanId}`).addClass('filled-in-star');
        starCounter += 1;
    }
};

fetchProduct();
