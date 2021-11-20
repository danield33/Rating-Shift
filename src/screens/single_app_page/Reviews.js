import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import RShift from '../../firebase';
import {LargeAppDisplay} from "../../components/LargeAppDisplay";
import {ReviewCard} from "../rating_reviews/ReviewCard";
import colors from "../../global/styles/colors";
import StarRating from "react-native-star-rating";

const renderReview = (reviewItem, size) => {
    const review = reviewItem.item;
    return <ReviewCard review={review} size={size}/>
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

            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{fontSize: 25, color: 'white', fontWeight: '600'}}>Reviews</Text>
                <Button title={'See More'} color={colors.red}/>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                    <Text style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: colors.aqua,
                    }}>{(Math.round(reviews.averageUserRating*10)/10).toString()}</Text>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: '600',
                        color: 'white'
                    }}>out of 5</Text>
                </View>

                <Text style={{
                    color: 'white',
                    fontSize: 15,
                    fontWeight: '600'
                }}>{Number(reviews.userRatingCount).toLocaleString()} Ratings</Text>

            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 20, color: colors.pink, fontWeight: '600'}}>Add Rating:</Text>
                <StarRating
                    disabled={false}
                    maxStars={5}
                    starSize={30}
                    emptyStarColor={colors.red}
                    fullStarColor={colors.red}
                    halfStarEnabled={false}
                    halfStarColor={colors.red}
                    rating={0}
                    selectedStar={console.log}
                />
            </View>

            <LargeAppDisplay apps={reviews.reviews}
                             renderItem={renderReview}/>
        </View>
    );
};