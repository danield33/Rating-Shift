import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Styles} from "../../global";
import {ProfilePicture} from "../../components/ProfilePicture";
import {useSelector} from "react-redux";
import colors from "../../global/styles/colors";
import {Ionicons} from "@expo/vector-icons";
import {EditIcon} from "../../components/EditIcon";
import {FlatButton} from "../../components/FlatButton";

export function AccountSettings() {
    const user = useSelector(state => state.account.currentUser);


    return (
        <View style={[Styles.background]}>
            <ProfilePicture size={200} showEdit={true}/>

            <TouchableOpacity style={{flexDirection: 'row'}}>
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