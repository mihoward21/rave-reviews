const MAX_STARS = 5;

const AddReviewPage = () => {
    const [reviewData, setReviewData] = React.useState({
        'rating': 0,
        'text': '',
    });

    const clearReviewData = () => {
        reviewData.rating = 0;
        reviewData.text = '';
    };

    React.useEffect(() => {
        clearReviewData();
    }, [clearReviewData]);

    const goToProductScreenPage = () => {
        $('#add-review-screen').hide();
        $('#product-screen').show();
    };

    const onChangeRating = React.useCallback((newRating) => {
        setReviewData({
            ...reviewData,
            'rating': newRating
        });
    }, [reviewData, setReviewData]);

    const submitReview = async () => {
        if (reviewData.rating === 0) {
            window.alert('You must select a star rating to leave a review');
            return;
        }
    
        const reviewFields = {
            'productId': productId,
            'numStars': reviewData.rating,
            'maxAllowedStars': MAX_STARS,
            'shouldLoadReviews': true,
            'text': reviewData.text,
        };
    
        const response = await $.post('/api/review', reviewFields);
        
        // setProductData(response.product);
    
        goToProductScreenPage();
    };

    const updateReviewText = React.useCallback((event) => {
        setReviewData({
            ...reviewData,
            'text': event.target.value
        });
    }, [reviewData, setReviewData]);

    return (
        <>
            <h1>What's your rating?</h1>
            <h4>Rating</h4>
            <StarsDisplay numVisibleStars={reviewData.rating} numTotalStars={MAX_STARS} onChangeRating={onChangeRating}/>
            <h4>Review</h4>
            <textarea id='add-review-text' className='add-review-textarea' rows={4} placeholder='Start typing...' onChange={updateReviewText}></textarea>
            <button onClick={submitReview}>Submit review</button>
        </>
    );
};

const renderAddReview = () => {
    ReactDOM.render(<AddReviewPage />, document.getElementById('add-review-screen'));
};
