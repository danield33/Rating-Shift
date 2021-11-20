import * as React from 'react';
import {ScrollView, View} from 'react-native';
import {colors, Styles} from '../../global/styles'
import PropTypes from 'prop-types'
import {useNavigation} from "@react-navigation/native";
import {AppTitleHeading} from "./AppTitleHeading";
import {AppRatingSummary} from "./AppRatingSummary";
import {DeveloperInfo} from "./DeveloperIcon";
import {MainLanguageDisp} from "./MainLanguage";
import {AppSizeDisplay} from "./AppSize";
import {ContentAdvisoryDisplay} from "./ContentAdvisoryDisplay";

const semiVerticalLine = () => {
    return (
        <View style={{
            backgroundColor: colors.blue,
            width: 2,
            height: '80%',
            marginLeft: 5,
            marginRight: 5,
            alignSelf: 'center'
        }}/>
    )
}

export default function SingleApp({app}) {

    const navigation = useNavigation();
    const appData = app ?? navigation.getState().routes[1].params.params.app;
    const image = appData.artworkUrl512
    console.log(appData.fileSizeBytesNumeric)

    return (
        <ScrollView style={[Styles.background, {alignItems: undefined}]}
                    contentContainerStyle={{alignItems: 'center'}}>

            <AppTitleHeading subtitle={appData.subtitle}
                             name={appData.trackCensoredName}
                             imageURL={image}
            />

            <ScrollView horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{
                            borderTopWidth: 1,
                            width: '100%',
                            borderBottomWidth: 1,
                            padding: 5,
                            backgroundColor: colors.dark_blue,
                        }} contentContainerStyle={{alignItems: 'center'}}>
                <AppRatingSummary
                    averageUserRating={appData.averageUserRating}
                    userRatingCount={appData.userRatingCount}/>

                {semiVerticalLine()}

                <DeveloperInfo name={appData.artistName}/>

                {semiVerticalLine()}

                <MainLanguageDisp mainLanguage={appData.lang} additionalLanguagesSize={appData.i18n_lang.length}/>

                {semiVerticalLine()}

                <AppSizeDisplay appSizeBytes={appData.fileSizeBytesNumeric}/>

                {semiVerticalLine()}

                <ContentAdvisoryDisplay age={appData.contentAdvisoryRating}/>

            </ScrollView>


        </ScrollView>
    );
};


SingleApp.propTypes = {
    app: PropTypes.object,
}
