import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import RShift from '../../database';
import {LargeAppDisplay} from "../../components/LargeAppDisplay";
import {ReviewCard} from "../rating_reviews/ReviewCard";
import colors from "../../global/styles/colors";
import {ReviewHeader} from "../rating_reviews/ReviewHeader";
import {Line} from "../../components/Line";

const renderReview = (reviewItem, size) => {
    const review = reviewItem.item;
    return <ReviewCard review={review} size={size} canExpand={false}/>
}

export function AppReviews({appData, reviewObj}) {

    const [reviews, setReviews] = useState(reviewObj);

    useEffect(() => {
        if (!reviewObj) {
            RShift.ftMatters.reviews({id: appData.trackId , lang: 'en'}).then(reviews => {
                if(reviews.statusCode === 402)
                    return setReviews(402)
                setReviews(reviews);
            });
        }
    }, []);


    if(!reviews) return (
        <View>
            <ActivityIndicator size={'large'} color={colors.red}
            />
        </View>
    );

    return (
        <View style={{width: '100%'}}>

            <ReviewHeader reviews={reviews} appData={appData} hideButton={reviews === 402}/>

            <View>
                <Line/>
            </View>

            {
                reviews === 402 ? (//TODO: setup rating shift reviews
                    <Text style={{
                        color: 'white',
                        fontSize: 30,
                        fontWeight: '600',
                        textAlign: 'center'
                    }}>iOS Reviews Not Available For This App</Text>
                    ) :
                    (
                    <LargeAppDisplay apps={reviews.reviews}
                                     renderItem={renderReview}/>
                )
            }

        </View>
    );
};