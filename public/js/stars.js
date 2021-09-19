const StarsDisplay = (props) => {
    const { numVisibleStars, numTotalStars } = props;
    const [starValues, setStarValues] = React.useState([])
    
    React.useEffect(() => {
        const newValues = [];
        for (let val = numTotalStars; val > 0; val -= 0.5) {
            newValues.push(val);
        }
        setStarValues(newValues);
    }, [numTotalStars, setStarValues])

    return (
        <fieldset className="rate" disabled>
            {starValues.map((value, index) => {
                const ratingId = `rating-${index}`;
                console.log(value);
                console.log(numVisibleStars);
                const isChecked = numVisibleStars === value;
                console.log(isChecked);
                return (
                    <>
                        <input key={`input-${ratingId}`} type="radio" id={ratingId} name="rating" value={value} defaultChecked={isChecked} />
                        <label key={`label-${ratingId}`} htmlFor={ratingId} title={`${index} stars`} className={value % 1 !== 0 ? 'half' : undefined}></label>       
                    </>
                );
            })}
        </fieldset>
    );
};
