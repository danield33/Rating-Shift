import * as React from 'react';
import {View, Text, Image} from 'react-native';
import {FlatButton} from "../../components/FlatButton";
import {Users} from "../../database";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

export function AccountScreen() {
    const user = useSelector(state => state.account.currentUser);
    const [pfp, setPfp] = useState(user.pfp);

    useEffect(() => {
        console.log(pfp)
        if(!pfp){
            user.getProfilePicture().then(url => {
                setPfp(url);
                console.log(url)
            })
        }
    }, [])

    return (
        <View>

            <Image source={{uri: pfp}} style={{width: 150, height: 150}}/>
            <Text>{user.username}</Text>

            <FlatButton text={'sign out'} onPress={() => Users.signOut()}/>
        </View>
    );
};