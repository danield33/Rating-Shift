import * as React from 'react';
import colors from "../global/styles/colors";
import StarRating from "react-native-star-rating";
import {useState} from "react";

export function CustomStarRating({isDisabled=true, rating=0, setRating, starSize=30, containerStyle, starStyle}) {

    const [ratingInp, setStarRating] = useState(rating);

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
};