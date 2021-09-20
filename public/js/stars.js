const StarsDisplay = (props) => {
    const { listId, numVisibleStars, numTotalStars, onChangeRating } = props;
    const [starValues, setStarValues] = React.useState([])
    
    React.useEffect(() => {
        const newValues = [];
        for (let val = numTotalStars; val > 0; val -= 0.5) {
            newValues.push(val);
        }
        setStarValues(newValues);
    }, [numTotalStars, setStarValues])

    return (
        <fieldset className="rate" disabled={onChangeRating === undefined}>
            {starValues.map((value, index) => {
                const ratingId = `${listId}-rating-${index}`;
                const isChecked = numVisibleStars === value;
                const onChangeFunc = onChangeRating ? () => onChangeRating(value) : undefined;
                const type = onChangeRating ? 'radio' : 'checkbox';
                return (
                    <>
                        <input key={`${listId}-input-${ratingId}`} type={type} id={ratingId} name="rating" value={value} defaultChecked={isChecked} onChange={onChangeFunc} />
                        <label key={`${listId}-label-${ratingId}`} htmlFor={ratingId} title={`${index} stars`} className={value % 1 !== 0 ? 'half' : undefined}></label>       
                    </>
                );
            })}
        </fieldset>
    );
};
