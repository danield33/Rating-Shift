import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {FlatButton} from "../../components/FlatButton";
import {Users} from "../../database";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import colors from "../../global/styles/colors";
import {Line} from "../../components/Line";
import {Ionicons} from "@expo/vector-icons";
import {If} from "../../components/If";

export function AccountScreen() {
    const user = useSelector(state => state.account.currentUser);
    const [pfp, setPfp] = useState(user.pfp);

    useEffect(() => {
        if(!pfp){
            user.getProfilePicture().then(url => {
                setPfp(url);
            })
        }
    }, [])

    return (
        <View>

            <Line/>
            <TouchableOpacity style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <If can={pfp}>
                    <Image source={{uri: pfp}} style={{width: 75, height: 75, borderRadius: 35, marginRight: 10}}/>
                    <Ionicons name={'person-circle-outline'} size={75} color={'white'}/>
                </If>
                <View>
                    <Text style={{fontSize: 35, color: colors.aqua, fontWeight: '500'}}>{user.username}</Text>
                    <Text style={{color: colors.light_blue, fontWeight: '700'}}>Account Settings</Text>
                </View>
            </TouchableOpacity>
            <Line/>

            <TouchableOpacity style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Ionicons name={'flash'} size={35} style={{marginRight: 10, marginLeft: 5}} color={colors.light_blue}/>
                <Text style={{fontSize: 35, color: colors.aqua}}>Activity</Text>
            </TouchableOpacity>

            <Line/>

            <FlatButton text={'sign out'} onPress={Users.signOut}/>
        </View>
    );
};