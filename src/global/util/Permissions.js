import * as MediaLibrary from 'expo-media-library';

export const checkForCameraRollPermission = async () =>{

    const {status: existingStatus} = await MediaLibrary.getPermissionsAsync()
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const {status} = await MediaLibrary.requestPermissionsAsync()
        finalStatus = status;
    }
    return finalStatus === 'granted';
}