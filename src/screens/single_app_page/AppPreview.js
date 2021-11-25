import * as React from 'react';
import {Image, Text, View} from 'react-native';
import {LargeAppDisplay} from "../../components/LargeAppDisplay";

export function AppPreview({screenshotsUrls}) {

    if (!screenshotsUrls) return null;

    return (
        <View style={{width: '100%'}}>
            <Text style={{
                color: 'white',
                fontSize: 25,
                fontWeight: '600'
            }}>Preview</Text>

            <LargeAppDisplay apps={screenshotsUrls || []} renderItem={(item, itemWidth) => {
                const pic = item.item;
                return (
                    <View style={{width: itemWidth - 10, margin: 5}}>
                        <Image source={{uri: pic}} style={{width: itemWidth - 10, height: 600, borderRadius: 30}}/>
                    </View>
                );
            }}/>

        </View>
    );
}