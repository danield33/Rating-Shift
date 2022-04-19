import React, {useEffect, useRef, useState} from 'react';
import {Alert, Button, Text, TouchableOpacity, View} from 'react-native';
import colors from "../../global/styles/colors";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import RShift from '../../database'
import {Ionicons} from "@expo/vector-icons";
import {CustomModal} from "../../components/CustomModal";
import {WriteReview} from "./WriteReview";
import {CustomStarRating} from "../../components/CustomStarRating";
import {If} from "../../components/If";

export function ReviewHeader({hideButton = false, onNewReview}) {
    const navigation = useNavigation();
    const trackId = useSelector(state => state.appList.currentlyViewing.item);
    const user = useSelector(state => {
        if (state.account?.currentUser)
            return state.account.currentUser;
    });
    const [app, setApp] = useState(null);
    const [writeReview, setWriting] = useState(false);
    let starRef = useRef(null);

    useEffect(() => {
        const aborter = RShift.apps.get(trackId, app => {
            setApp(app);
        })
        return () => {
            aborter.abort();
        }
    }, [])

    useEffect(() => {

        return () => {
            if (user && app) {
                const rating = user.activity.ratings[app.trackId];
                const newRating = starRef.current._getRating();
                if (newRating !== rating && newRating !== 0) {
                    if (rating) app.replaceSingleRating(rating, newRating);
                    user.addRating(app.trackId, newRating);
                }
            }
        }

    });

    if (app === null) return null;

    const submitReview = (review) => {

        const reviewObj = app.reviews.add(review.rating, review.review, review.title, user);
        app.addRating(review.rating);
        setWriting(false);
        onNewReview?.(reviewObj)
        Alert.alert("Thank you!", "Your review was submitted!");

    }

    return (
        <View>

            <CustomModal isOpen={writeReview} onClose={() => setWriting(false)}>
                <WriteReview onSubmit={submitReview}/>
            </CustomModal>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{fontSize: 25, color: 'white', fontWeight: '600'}}>Reviews</Text>
                {hideButton ? null :
                    <Button title={'See More'} color={colors.red} onPress={() => {
                        navigation.navigate('RatingsReviews');
                    }}/>
                }

            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                    <Text style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: colors.aqua,
                    }}>{(Math.min(Math.round(app.averageUserRating * 10) / 10, 5)).toString()}</Text>
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
                }}>{Number(app.userRatingCount).toLocaleString()} Ratings</Text>

            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 20, color: colors.pink, fontWeight: '600'}}>Add Rating:</Text>
                <CustomStarRating isDisabled={user === undefined}
                                  ref={starRef}
                                  rating={user?.activity.ratings[app.trackId] ?? 0}/>
            </View>

            <If can={user !== undefined}>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} onPress={() => setWriting(true)}>
                    <Ionicons name={'clipboard'} color={colors.aqua} size={25}/>
                    <Text style={reviewTextStyle}>Write a Review</Text>
                </TouchableOpacity>
                <Text style={{...reviewTextStyle, alignSelf: 'center'}}>Sign in to leave a review</Text>
            </If>
        </View>
    );
}

const reviewTextStyle = {fontSize: 20, padding: 5, color: colors.aqua, fontWeight: '600'}
