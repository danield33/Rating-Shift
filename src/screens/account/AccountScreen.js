import * as React from 'react';
import {View} from 'react-native';
import {FlatButton} from "../../components/FlatButton";
import {Users} from "../../database";
import {useSelector} from "react-redux";

export function AccountScreen() {
    const selector = useSelector(state => {
        console.log(state);
        return state.account.currentUser;
    });

    return (
        <View>
            <FlatButton text={'sign out'} onPress={() => Users.signOut()}/>
        </View>
    );
};