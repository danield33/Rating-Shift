import * as React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {Styles} from "../../global";
import {ProfilePicture} from "../../components/ProfilePicture";
import {useSelector} from "react-redux";
import colors from "../../global/styles/colors";
import {EditIcon} from "../../components/EditIcon";
import {FlatButton} from "../../components/FlatButton";
import {InputText} from "../../components/InputText";
import {useState} from "react";

export function AccountSettings() {
    const user = useSelector(state => state.account.currentUser);
    const [showDialog, setDialog] = useState(false);

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

    return (
        <View style={[Styles.background]}>

            <InputText title={"Enter Username"}
                       description={"Change your username here!"}
                       visible={showDialog}
                       onCancel={() => setDialog(false)}
                       onSubmit={setName}
            />

            <ProfilePicture size={200} showEdit={true}/>

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