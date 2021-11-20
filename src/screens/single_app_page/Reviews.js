import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import RShift from '../../firebase';
import {LargeAppDisplay} from "../../components/LargeAppDisplay";
import {colors} from "../../global/styles";
import StarRating from "react-native-star-rating";
import {Ionicons} from "@expo/vector-icons";

const renderReview = (reviewItem, size) => {
    const review = reviewItem.item;
    return (

        <View style={{
            backgroundColor: colors.dark_blue,
            padding: 10,
            width: size - 10,
            margin: 5,
            borderRadius: 10
        }}>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                    <Text
                        style={{
                            color: colors.aqua,
                            fontSize: 20,
                            fontWeight: '600',
                        }}
                        numberOfLines={2}
                        adjustsFontSizeToFit={true}
                    >
                        {review.title}</Text>

                    <StarRating
                        disabled={true}
                        starSize={15}
                        fullStarColor={colors.red}
                        halfStar={colors.red}
                        rating={review.rating}
                        maxStars={5}
                        halfStarEnabled={true}
                        containerStyle={{justifyContent: undefined}}
                        starStyle={{marginLeft: 5}}
                    />
                </View>

                <View style={{alignItems: 'flex-end'}}>
                    <Text style={{color: colors.aqua, fontWeight: '600'}}>{review.date}</Text>
                    <Ionicons name={'logo-apple'} color={'white'} size={20}/>
                </View>

            </View>

            <Text numberOfLines={3}
                  ellipsizeMode={'tail'}
                  style={{
                      color: 'white',
                      fontSize: 15,
                      fontWeight: '500'
                  }}>{review.content}</Text>

            <View style={{justifyContent: 'flex-end', flex: 1}}>
                <TouchableOpacity style={{marginTop: 5, right: 5, alignSelf: 'flex-end'}}>
                    <Text style={{color: colors.red, fontSize: 20}}>See More</Text>
                </TouchableOpacity>
            </View>


        </View>

    )
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

    // console.log(reviews)

    return (
        <View>
            <LargeAppDisplay apps={reviews}
                             renderItem={renderReview}/>
        </View>
    );
};