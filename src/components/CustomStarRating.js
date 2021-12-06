import * as React from 'react';
import {forwardRef, useImperativeHandle, useState} from 'react';
import colors from "../global/styles/colors";
import StarRating from "react-native-star-rating";

const CustomStarRating = forwardRef(({
                                         isDisabled = true,
                                         rating = 0,
                                         setRating,
                                         starSize = 30,
                                         containerStyle,
                                         starStyle
                                     }, ref) => {

    const [ratingInp, setStarRating] = useState(rating);

    useImperativeHandle(ref, () => ({
        _getRating: () => {
            return ratingInp;
        }
    }));

    const selectStar = (rating) => {
        setStarRating(rating);
        setRating?.(rating);
    }

    return (
        <StarRating
            disabled={isDisabled}
            maxStars={5}
            starSize={starSize}
            emptyStarColor={colors.red}
            fullStarColor={colors.red}
            halfStarEnabled={true}
            halfStarColor={colors.red}
            rating={ratingInp}
            selectedStar={selectStar}
            containerStyle={containerStyle}
            starStyle={starStyle}

        />
    );
});

export {CustomStarRating}