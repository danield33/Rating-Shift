import * as React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {colors, Styles} from '../../global/styles'
import PropTypes from 'prop-types'
import {useNavigation} from "@react-navigation/native";
import {AppTitleHeading} from "./basic_info_displays/AppTitleHeading";
import {AppInfo} from "./basic_info_displays";
import {LargeAppDisplay} from "../../components/LargeAppDisplay";


const line = () => {
    return (
        <View style={{
            width: '100%',
            height: 2,
            backgroundColor: colors.dark_blue,
            marginTop: 10,
            marginBottom: 10
        }}/>
    )
}

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

            {line()}

            <View style={{width: '100%'}}>
                <Text style={{
                    color: 'white',
                    fontSize: 25,
                    fontWeight: '600'
                }}>Preview</Text>

                <LargeAppDisplay apps={appData.screenshotUrls || []} renderItem={(item, itemWidth) => {
                    const pic = item.item;
                    return (
                        <View style={{width: itemWidth-10, margin: 5}}>
                            <Image source={{uri: pic}} style={{width: itemWidth-10, height: 600, borderRadius: 30}}/>
                        </View>
                    );
                }}/>

            </View>


            <View style={{margin: 50}}/>
        </ScrollView>
    );
};


SingleApp.propTypes = {
    app: PropTypes.object,
}
