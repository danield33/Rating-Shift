import * as React from 'react';
import {Image, View} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {If} from "./If";
import {EditIcon} from "./EditIcon";

export function ProfilePicture({image, size = 75, showEdit}) {
    return (
        <View>
            {
                showEdit ?
                    <EditIcon/>
                    : null
            }
            <If can={Boolean(image)}>
                <Image source={{uri: image}}
                       style={{width: size, height: size, borderRadius: size / 2, marginRight: 10}}/>
                <Ionicons name={'person-circle-outline'} size={size} color={'white'}/>
            </If>
        </View>
    );
}