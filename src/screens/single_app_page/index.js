import * as React from 'react';
import {ScrollView, View, ActivityIndicator} from 'react-native';
import {Styles} from '../../global/styles'
import PropTypes from 'prop-types'
import {AppTitleHeading} from "./basic_info_displays/AppTitleHeading";
import {AppInfo} from "./basic_info_displays";
import {AppPreview} from "./AppPreview";
import {AppDescription} from "./AppDescription";
import {AppReviews} from "./Reviews";
import {Line} from "../../components/Line";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import RShift from '../../database'
import {If} from "../../components/If";
import colors from "../../global/styles/colors";


export default function SingleApp({appID}) {
    const viewingAppID = useSelector(state => state.appList.currentlyViewing.item);
    const appData = appID ?? viewingAppID;
    const [app, setApp] = useState(null);

    useEffect(() => {

        RShift.apps.get(appData.trackId, appData.link).then(r => {
            setApp(r);
        })

    }, [])


    console.log(app != null)

    return (
        <ScrollView style={[Styles.background, {alignItems: undefined}]}
                    contentContainerStyle={{alignItems: 'center'}}>

            {
                app != null ?
                    <>
                        <AppTitleHeading subtitle={app.subtitle}
                                         name={app.trackCensoredName}
                                         imageURL={app.artworkUrl512}
                        />
                        <AppInfo appData={app}/>

                        <Line/>

                        <AppDescription description={app.description}/>

                        <Line/>

                        <AppPreview screenshotsUrls={app.screenshotUrls}/>

                        <Line/>

                        <AppReviews appData={app}/>

                        <View style={{margin: 50}}/>
                    </>
                    : <ActivityIndicator size={'large'} color={colors.red}/>

            }
        </ScrollView>
    );
};


SingleApp.propTypes = {
    app: PropTypes.object,
}
