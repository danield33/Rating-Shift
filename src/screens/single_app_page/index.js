import * as React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {colors, Styles} from '../../global/styles'
import PropTypes from 'prop-types'
import {useNavigation} from "@react-navigation/native";
import {AppTitleHeading} from "./basic_info_displays/AppTitleHeading";
import {AppInfo} from "./basic_info_displays";
import {LargeAppDisplay} from "../../components/LargeAppDisplay";
import {AppPreview} from "./AppPreview";
import {AppDescription} from "./AppDescription";
import {AppReviews} from "./Reviews";
import {Line} from "../../components/Line";
import {useSelector} from "react-redux";


export default function SingleApp({app}) {
    const viewingApp = useSelector(state => state.currentlyViewing.item);
    const appData = app ?? viewingApp;
    const image = appData.artworkUrl512;

    return (
        <ScrollView style={[Styles.background, {alignItems: undefined}]}
                    contentContainerStyle={{alignItems: 'center'}}>

            <AppTitleHeading subtitle={appData.subtitle}
                             name={appData.trackCensoredName}
                             imageURL={image}
            />
            <AppInfo appData={appData}/>

            <Line/>

            <AppDescription description={appData.description}/>

            <Line/>

            <AppPreview screenshotsUrls={appData.screenshotUrls}/>

            <Line/>

            <AppReviews appData={appData}/>

            <View style={{margin: 50}}/>
        </ScrollView>
    );
};


SingleApp.propTypes = {
    app: PropTypes.object,
}
