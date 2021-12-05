import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {LargeAppDisplay} from "../../components/LargeAppDisplay";
import {ReviewCard} from "../rating_reviews/ReviewCard";
import colors from "../../global/styles/colors";
import {ReviewHeader} from "../rating_reviews/ReviewHeader";
import {Line} from "../../components/Line";

const renderReview = (reviewItem, size) => {
    const review = reviewItem.item;
    return <ReviewCard review={review} size={size} canExpand={false}/>
}

export function AppReviews({appData}) {

    const reviews = appData.reviews.reviews;

    if (!reviews) return (
        <View>
            <ActivityIndicator size={'large'} color={colors.red}/>
        </View>
    );

    return (
        <View style={{width: '100%'}}>

            <ReviewHeader reviews={reviews} appData={appData} hideButton={reviews === 402}/>

            <Line/>

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
                        <LargeAppDisplay apps={reviews}
                                         renderItem={renderReview}/>
                    )
            }

        </View>
    );
}