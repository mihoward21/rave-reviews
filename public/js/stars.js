const StarsDisplay = (props) => {
    const { listId, numVisibleStars, numTotalStars, onChangeRating } = props;
    const [starValues, setStarValues] = React.useState([])
    
    React.useEffect(() => {
        const newValues = [];
        for (let val = numTotalStars; val > 0; val -= 0.5) {
            newValues.push(val);
        }
        setStarValues(newValues);
    }, [numTotalStars, setStarValues]);

    const displayDisabled = onChangeRating === undefined;

    return (
        <fieldset className="rate" disabled={displayDisabled}>
            {starValues.map((value, index) => {
                const ratingId = `${listId}-rating-${index}`;
                const isChecked = numVisibleStars === value;
                const onChangeFunc = onChangeRating ? () => onChangeRating(value) : undefined;
                const type = onChangeRating ? 'radio' : 'checkbox';
                return (
                    <>
                        <input key={`${listId}-input-${ratingId}`} type={type} id={ratingId} name="rating" value={value} checked={isChecked} readOnly={displayDisabled} onChange={onChangeFunc} />
                        <label key={`${listId}-label-${ratingId}`} htmlFor={ratingId} className={value % 1 !== 0 ? 'half' : undefined}></label>       
                    </>
                );
            })}
        </fieldset>
    );
};
