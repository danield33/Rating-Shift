import * as React from 'react';
import {View, Text, TouchableOpacity, Alert, Platform, Linking} from 'react-native';
import {Styles} from "../../global";
import {ProfilePicture} from "../../components/ProfilePicture";
import {useSelector} from "react-redux";
import colors from "../../global/styles/colors";
import {EditIcon} from "../../components/EditIcon";
import {FlatButton} from "../../components/FlatButton";
import {InputText} from "../../components/InputText";
import {useState} from "react";
import {selectProfilePicture} from "../../global/util";

export function AccountSettings() {
    const user = useSelector(state => state.account.currentUser);
    const [showDialog, setDialog] = useState(false);
    const [pfp, setPfp] = useState(user.pfp);

    const changeUserName = () => {
        setDialog(true)
    }

    const setName = (name) => {
        const username = name.trim();
        if(username.length >= 3){
            user.setUsername(name);
            setDialog(false);
        }else Alert.alert("Error", "Your username must be at least three characters")
    }

    const changeProfilePic = async () => {
        const picture = await selectProfilePicture();
        setPfp(picture);
        user.setProfilePicture(picture);
    }

    return (
        <View style={[Styles.background]}>

            <InputText title={"Enter Username"}
                       description={"Change your username here!"}
                       visible={showDialog}
                       onCancel={() => setDialog(false)}
                       onSubmit={setName}
            />

            <TouchableOpacity onPress={changeProfilePic} style={{marginBottom: 10}}>
                <ProfilePicture size={200} showEdit={true} image={pfp}/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection: 'row'}} onPress={changeUserName}>
                <Text style={{
                    fontSize: 30,
                    color: colors.aqua
                }}>{user.username}</Text>
                <EditIcon
                    size={20}
                    style={{position: 'absolute', top: undefined, right: -40}}/>
            </TouchableOpacity>

            <FlatButton text={'Delete Account'} style={{bottom: 25, position: 'absolute', width: '100%'}}/>
        </View>
    );
};