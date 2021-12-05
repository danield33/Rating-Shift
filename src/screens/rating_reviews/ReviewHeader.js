import React, {useEffect, useState} from 'react';
import {Button, Text, View, TouchableOpacity} from 'react-native';
import colors from "../../global/styles/colors";
import StarRating from "react-native-star-rating";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import RShift from '../../database'
import {Ionicons} from "@expo/vector-icons";
import {CustomModal} from "../../components/CustomModal";
import {WriteReview} from "./WriteReview";
import {CustomStarRating} from "../../components/CustomStarRating";

export function ReviewHeader({hideButton = false}) {
    const navigation = useNavigation();
    const trackId = useSelector(state => state.appList.currentlyViewing.item);
    const [rating, setRating] = useState(0);
    const [app, setApp] = useState(null);
    const [writeReview, setWriting] = useState(false);

    useEffect(() => {
        const aborter = RShift.apps.get(trackId, app => {
            setApp(app);
        })
        return () => {
            aborter.abort()

        }
    },[])

    if(app === null) return null;

    return (
        <View>

            <CustomModal isOpen={writeReview} onClose={() => setWriting(false)}>
                <WriteReview/>
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
                    }}>{(Math.round(app.averageUserRating * 10) / 10).toString()}</Text>
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
                <CustomStarRating setRating={setRating} rating={rating} isDisabled={false}/>
            </View>

            <TouchableOpacity style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }} onPress={() => setWriting(true)}>
                <Ionicons name={'clipboard'} color={colors.aqua} size={25}/>
                <Text style={{fontSize: 20, padding: 5, color: colors.aqua, fontWeight: '600'}}>Write a Review</Text>
            </TouchableOpacity>
        </View>
    );
}