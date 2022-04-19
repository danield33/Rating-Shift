import * as React from 'react';
import {Text, View} from 'react-native';
import {colors} from "../../../global/styles";
import {CustomStarRating} from "../../../components/CustomStarRating";

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
            }}>{Math.min(Math.round(averageUserRating * 10) / 10, 5)}</Text>

            <CustomStarRating isDisabled={true} rating={averageUserRating}/>
        </View>
    );
}
