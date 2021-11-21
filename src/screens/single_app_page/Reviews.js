import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import RShift from '../../firebase';
import {LargeAppDisplay} from "../../components/LargeAppDisplay";
import {ReviewCard} from "../rating_reviews/ReviewCard";
import colors from "../../global/styles/colors";
import StarRating from "react-native-star-rating";
import {ReviewHeader} from "../rating_reviews/ReviewHeader";
import {Line} from "../../components/Line";

const renderReview = (reviewItem, size) => {
    const review = reviewItem.item;
    return <ReviewCard review={review} size={size} canExpand={false}/>
}

export function AppReviews({appID, reviewObj}) {

    const [reviews, setReviews] = useState(reviewObj);

    useEffect(() => {
        if (!reviewObj) {
            RShift.ftMatters.reviews({id: appID, lang: 'en'}).then(reviews => {
                setReviews(reviews);
            });
        }
    }, []);


    if(!reviews) return null;

    return (
        <View>

            <ReviewHeader reviews={reviews}/>

            <View>
                <Line/>
            </View>


            <LargeAppDisplay apps={reviews.reviews}
                             renderItem={renderReview}/>
        </View>
    );
};