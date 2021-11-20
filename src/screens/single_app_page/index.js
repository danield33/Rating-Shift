import * as React from 'react';
import {Image, SafeAreaView, Text, View, ScrollView} from 'react-native';
import {colors, Styles} from '../../global/styles'
import PropTypes from 'prop-types'
import {useNavigation} from "@react-navigation/native";
import {AppTitleHeading} from "./AppTitleHeading";
import StarRating from 'react-native-star-rating';

export default function SingleApp({app}) {

    const navigation = useNavigation();
    const appData = app ?? navigation.getState().routes[1].params.params.app;
    const image = appData.artworkUrl512
    console.log(appData.userRatingCount.toSymbolic(), appData.userRatingCount)

    return (
        <ScrollView style={[Styles.background, {alignItems: undefined}]}
                    contentContainerStyle={{alignItems: 'center'}}>

                <AppTitleHeading subtitle={appData.subtitle}
                                 name={appData.trackCensoredName}
                                 imageURL={image}
                />

            <ScrollView horizontal={true}>
                <View style={{alignItems: 'center'}}>

                    <Text style={{
                        fontSize: 20,
                        color: colors.pink
                    }}>{appData.userRatingCount.toSymbolic()}</Text>

                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={appData.averageUserRating}
                        fullStarColor={colors.red}
                        halfStarColor={colors.red}
                        starSize={20}

                    />
                </View>
            </ScrollView>


        </ScrollView>
    );
};


SingleApp.propTypes = {
    app: PropTypes.object,
}
