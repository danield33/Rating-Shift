import * as React from 'react';
import {Text, View} from 'react-native';
import {colors} from "../../../global/styles";
import StarRating from "react-native-star-rating";

export function AppRatingSummary({userRatingCount, averageUserRating}) {
    return (
        <View style={{alignItems: 'center'}}>

            <Text style={{
                fontSize: 20,
                color: colors.pink,
                fontWeight: '700'
            }}>{userRatingCount.toSymbolic()}</Text>

            <Text style={{
                fontSize: 25,
                color: 'white',
                fontWeight: '600',
                margin: 5
            }}>{Math.round(averageUserRating*10)/10}</Text>

            <StarRating
                disabled={true}
                maxStars={5}
                rating={averageUserRating}
                fullStarColor={colors.aqua}
                halfStarColor={colors.aqua}
                starSize={20}

            />
        </View>
    );
};