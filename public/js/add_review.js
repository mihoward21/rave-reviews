const MAX_STARS = 5;

const AddReviewPage = (props) => {
    const { goToProductScreenPage, setProduct } = props;
    const [reviewRating, setReviewRating] = React.useState(0);
    const [reviewText, setReviewText] = React.useState('');

    const onChangeRating = React.useCallback((newRating) => {
        setReviewRating(newRating);
    }, [setReviewRating]);

    const submitReview = async () => {
        if (reviewRating === 0) {
            window.alert('You must select a star rating to leave a review');
            return;
        }
    
        const reviewFields = {
            'productId': productId,
            'numStars': reviewRating,
            'maxAllowedStars': MAX_STARS,
            'shouldLoadReviews': true,
            'text': reviewText,
        };
    
        const response = await $.post('/api/review', reviewFields);
        
        setProduct(response.product);
        goToProductScreenPage();
    };

    const updateReviewText = React.useCallback((event) => {
        setReviewText(event.target.value);
    }, [setReviewText]);

    const closeButtonClasses = 'fa fa-times close-btn';

    return (
        <>
            <i className={closeButtonClasses} onClick={goToProductScreenPage}></i>
            <h1>What's your rating?</h1>
            <h4>Rating</h4>
            <StarsDisplay listId='add-review' numVisibleStars={reviewRating} numTotalStars={MAX_STARS} onChangeRating={onChangeRating}/>
            <h4>Review</h4>
            <textarea id='add-review-text' className='add-review-textarea' rows={4} placeholder='Start typing...' onChange={updateReviewText}></textarea>
            <button onClick={submitReview}>Submit review</button>
        </>
    );
};
