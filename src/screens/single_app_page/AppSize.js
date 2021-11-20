import * as React from 'react';
import {Text, View} from 'react-native';
import {colors} from "../../global/styles";
import {Ionicons} from "@expo/vector-icons";


function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function AppSizeDisplay({appSizeBytes}) {
    return (
        <View style={{alignItems: 'center'}}>
            <Text style={{color: colors.pink, fontSize: 15, fontWeight: '600'}}>Size</Text>
            <Ionicons name={'file-tray-stacked-outline'} size={35} color={'white'}/>
            <Text style={{color: colors.aqua, fontSize: 15, fontWeight: '700'}}>{formatBytes(appSizeBytes, 1)}</Text>
        </View>
    );
};