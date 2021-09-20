const productId = 'product.43a2b7f1-321c-4dee-a06c-87a588885e41';

const App = () => {
    const [product, setProduct] = React.useState(null);
    const [isShowingReviewPage, setIsShowingReviewPage] = React.useState(false);
    const [reviewData, setReviewData] = React.useState({
        'rating': 0,
        'text': ''
    });

    React.useEffect(() => {
        const fetchData = async () => {
            const response = await $.get('/api/product', {
                'productId': productId,
                'shouldLoadReviews': true,
            });
    
            setProduct(response.product);
            // renderOverallRating(response.product, reviewData)
        };
        fetchData();
    }, [setProduct]);

    if (!product) {
        return <h1 className="app-header">...Loading</h1>
    }

    if (isShowingReviewPage) {
        return <AddReviewPage goToProductScreenPage={() => {setIsShowingReviewPage(false)}} setProduct={setProduct} />
    }

    return (
        <>
            <h1 className="app-header">{product.name}</h1>
            <ProductOverallRating product={product} goToReviewPage={() => {setIsShowingReviewPage(true)}} />
            <hr />
            <div>
                <h3>Reviews</h3>
                {product.loadedReviews.length === 0 ?
                    <p>No reviews yet!</p> 
                    : (
                        <ul>
                            {product.loadedReviews.map((review, index) => {
                                const displayRating = review.rating * review.maxAllowedStars;
                                return (
                                    <li key={`review-list-item-${index}`} className='review-list-item'>
                                        <StarsDisplay listId={`review-stars-${index}`} numVisibleStars={review.numStars} numTotalStars={review.maxAllowedStars} />
                                        <p className='review-rating'>{displayRating}</p>
                                        {review.text && <p className='review-text'>{review.text}</p>}
                                    </li>
                                )
                            })}
                        </ul>
                    )
                }
            </div>
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
