const ProductOverallRating = (props) => {
    const { goToReviewPage, product } = props;
    const [overallRating, setOverallRating] = React.useState(0);

    React.useEffect(() => {
        // Round the overall rating to one decimal place
        setOverallRating(Math.round(product?.overallRating * product?.maxAllowedStars * 10) / 10)
    }, [product?.maxAllowedStars, product?.overallRating, setOverallRating]);

    if (!product) {
        return null;
    }

    return (
        <div className='product-rating-area'>
            <div className="product-rating-display">
                <h2 className="product-overall-rating">{overallRating}</h2>
                <StarsDisplay listId='product-overall-stars' numVisibleStars={product.numStars} numTotalStars={product.maxAllowedStars} />
            </div>
            <button onClick={goToReviewPage}>Add review</button>
        </div>
    );
};
