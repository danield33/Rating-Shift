import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from "expo-camera";

export const checkForCameraRollPermission = async () =>{
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();

    const {status: existingStatus} = await MediaLibrary.getPermissionsAsync()
    let finalStatus = existingStatus;
    // If we don't already have permission, ask for it
    if (existingStatus !== 'granted') {
        const {status} = await MediaLibrary.requestPermissionsAsync()
        finalStatus = status;
    }
    console.log(finalStatus, 'fstatus')
    return status === 'granted';
}