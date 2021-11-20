import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import RShift from '../../firebase';
import {LargeAppDisplay} from "../../components/LargeAppDisplay";
import {colors} from "../../global/styles";
import StarRating from "react-native-star-rating";
import {Ionicons} from "@expo/vector-icons";
import {ReviewCard} from "../rating_reviews/ReviewCard";

const renderReview = (reviewItem, size) => {
    const review = reviewItem.item;
    return <ReviewCard review={review} size={size}/>
}

export function AppReviews({appID, reviewObj}) {

    const [reviews, setReviews] = useState(reviewObj ?? []);

    useEffect(() => {
        if (!reviewObj) {
            RShift.ftMatters.reviews({id: appID, lang: 'en'}).then(reviews => {
                setReviews(reviews.reviews);
            });
        }
    }, []);


    return (
        <View>
            <LargeAppDisplay apps={reviews}
                             renderItem={renderReview}/>
        </View>
    );
};