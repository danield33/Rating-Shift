import * as React from 'react';
import {Image, View} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {If} from "./If";
import {EditIcon} from "./EditIcon";

/**
 * Render image as a profile picture. If no image is provided, it defaults to an ionicon of an avatar.
 * @param image the image to display
 * @param size the size of the image. Default: 75
 * @param showEdit to show the ability to edit the profile picture
 * @returns {JSX.Element}
 * @constructor
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
