import * as React from 'react';
import {ScrollView, View} from 'react-native';
import {colors, Styles} from '../../global/styles'
import PropTypes from 'prop-types'
import {useNavigation} from "@react-navigation/native";
import {AppTitleHeading} from "./basic_info_displays/AppTitleHeading";
import {AppRatingSummary} from "./basic_info_displays/AppRatingSummary";
import {DeveloperInfo} from "./basic_info_displays/DeveloperIcon";
import {MainLanguageDisp} from "./basic_info_displays/MainLanguage";
import {AppSizeDisplay} from "./basic_info_displays/AppSize";
import {ContentAdvisoryDisplay} from "./basic_info_displays/ContentAdvisoryDisplay";
import {AppInfo} from "./basic_info_displays";



export default function SingleApp({app}) {

    const navigation = useNavigation();
    const appData = app ?? navigation.getState().routes[1].params.params.app;
    const image = appData.artworkUrl512


    return (
        <ScrollView style={[Styles.background, {alignItems: undefined}]}
                    contentContainerStyle={{alignItems: 'center'}}>

            <AppTitleHeading subtitle={appData.subtitle}
                             name={appData.trackCensoredName}
                             imageURL={image}
            />
            <AppInfo appData={appData}/>


            


        </ScrollView>
    );
};


SingleApp.propTypes = {
    app: PropTypes.object,
}
