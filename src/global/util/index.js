import {checkForCameraRollPermission} from "./Permissions";
import * as ImagePicker from "expo-image-picker";
import {Alert, Linking, Platform} from "react-native";

/**
 * Creates a new unique ID
 * @param string [xxxx-xxxx-xxxx-xxxx] replaces any 'x' found in this string with a random character. Otherwise returns a uniuqe string
 * @returns {string} a randomly generated unique ID
 */
export function createUUID(string = 'xxxx-xxxx-xxxx-xxxx') {
    let dt = new Date().getTime();
    const uuid = string.replace(/[xy]/g, function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

export async function selectProfilePicture() {
    const perms = await checkForCameraRollPermission()

    if (perms) {
        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!image.cancelled) {
            return image.uri;
        }
    } else {
        Alert.alert(
            'Warning',
            'Please grant camera roll permissions inside your system settings to upload a picture',
            [
                {text: 'Cancel'},
                {
                    text: 'Enable Notifications',
                    onPress: () => Platform.OS === 'ios' ? Linking.openURL('app-settings:') : Linking.openSettings()
                }
            ]
        )
    }

}