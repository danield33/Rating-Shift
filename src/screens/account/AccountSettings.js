import * as React from 'react';
import {useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {Styles} from "../../global";
import {ProfilePicture} from "../../components/ProfilePicture";
import {useDispatch, useSelector} from "react-redux";
import colors from "../../global/styles/colors";
import {EditIcon} from "../../components/EditIcon";
import {FlatButton} from "../../components/FlatButton";
import {InputText} from "../../components/InputText";
import {selectProfilePicture} from "../../global/util";
import {changeAuthentication} from "../../global/redux/actions/AppListActions";
import {useNavigation} from "@react-navigation/native";

export function AccountSettings() {
    const user = useSelector(state => state.account.currentUser);
    const [showDialog, setDialog] = useState(false);
    const [pfp, setPfp] = useState(user?.pfp);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const changeUserName = () => {
        setDialog(true)
    }

    const setName = (name) => {
        const username = name.trim();
        if (username.length >= 3) {
            user.setUsername(name).then(() => {
                dispatch(changeAuthentication({}))
                dispatch(changeAuthentication(user));
            });
            setDialog(false);
        } else Alert.alert("Error", "Your username must be at least three characters")
    }

    const changeProfilePic = async () => {
        const picture = await selectProfilePicture();
        if (!picture) return;
        setPfp(picture);
        user.setProfilePicture(picture).then(() => {
            dispatch(changeAuthentication({}))
            dispatch(changeAuthentication(user));
        })
    }

    const removeProfilePicture = () => {
        setPfp(null);
        user.deleteProfilePicture();
    }

    const deleteAccount = () => {
        navigation.navigate("Main Page")
        user.delete();
    }

    const promptDelete = () => {
        Alert.alert("Are you sure?", "Are you sure you want to delete this account? This action is not undoable", [
            {
                text: "Yes",
                onPress: deleteAccount
            },
            {
                text: "No"
            }
        ])
    }

    return (
        <View style={[Styles.background]}>

            <InputText title={"Enter Username"}
                       description={"Change your username here!"}
                       visible={showDialog}
                       onCancel={() => setDialog(false)}
                       onSubmit={setName}
            />

            <TouchableOpacity onPress={changeProfilePic}>
                <ProfilePicture size={200} showEdit={true} image={pfp}/>
            </TouchableOpacity>
            {
                pfp ?
                    <TouchableOpacity style={{marginBottom: 15, marginTop: 15}} onPress={removeProfilePicture}>
                        <Text style={{fontSize: 15, color: colors.red, fontWeight: '600'}}>Remove</Text>
                    </TouchableOpacity>
                    : null
            }

            <TouchableOpacity style={{flexDirection: 'row'}} onPress={changeUserName}>
                <Text style={{
                    fontSize: 30,
                    color: colors.aqua
                }}>{user?.username}</Text>
                <EditIcon
                    size={20}
                    style={{position: 'absolute', top: undefined, right: -40}}/>
            </TouchableOpacity>

            <FlatButton text={'Delete Account'}
                        onPress={promptDelete}
                        style={{bottom: 25, position: 'absolute', width: '100%'}}/>
        </View>
    );
}