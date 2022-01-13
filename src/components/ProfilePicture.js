import * as React from 'react';
import {Image, View} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {If} from "./If";
import {EditIcon} from "./EditIcon";

/**
 * Component to render a profile picture or a default icon in place of a picture
 * @param image the image to display
 * @param size the size of the image
 * @param showEdit whether to show it as editable or not
 * @returns {JSX.Element}
 */
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