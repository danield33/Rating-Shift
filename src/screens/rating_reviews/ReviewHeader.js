import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import colors from "../../global/styles/colors";
import StarRating from "react-native-star-rating";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {setReviews} from "../../global/redux/actions/AppListActions";
import {useSelector} from "react-redux";


export function ReviewHeader({reviews, appData, hideButton=false}) {
    const navigation = useNavigation();
    const appDataStore = useSelector(state => state.currentlyViewing.item);
    appData = appData || appDataStore;
    const dispatch = useDispatch();
    const [rating, setRating] = useState(0);

    return (
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{fontSize: 25, color: 'white', fontWeight: '600'}}>Reviews</Text>
                {hideButton ? null :
                    <Button title={'See More'} color={colors.red} onPress={() => {
                        dispatch(setReviews(reviews));
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
                    }}>{(Math.round(appData?.averageUserRating*10)/10).toString()}</Text>
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
                }}>{Number(appData?.userRatingCount).toLocaleString()} Ratings</Text>

            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 20, color: colors.pink, fontWeight: '600'}}>Add Rating:</Text>
                <StarRating
                    disabled={false}
                    maxStars={5}
                    starSize={30}
                    emptyStarColor={colors.red}
                    fullStarColor={colors.red}
                    halfStarEnabled={true}
                    halfStarColor={colors.red}
                    rating={rating}
                    selectedStar={setRating}
                />
            </View>
        </View>
    );
};