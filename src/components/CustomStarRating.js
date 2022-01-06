import * as React from 'react';
import {forwardRef, useImperativeHandle, useState} from 'react';
import colors from "../global/styles/colors";
import StarRating from "react-native-star-rating";

/**
 * A star rating component
 * @param isDisabled a check if the stars should be intractable or not
 * @param rating the starting rating for the stars
 * @param setRating a function to set the rating
 * @param starSize the size of each star
 * @param containerStyle the style of the container the stars are in
 * @param starStyle the style of each star
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly isDisabled?: *, readonly setRating?: *, readonly containerStyle?: *, readonly starStyle?: *, readonly rating?: *, readonly starSize?: *}> & React.RefAttributes<unknown>>}
 */
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
