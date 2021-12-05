import * as React from 'react';
import {useEffect, useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {FlatButton} from "../../components/FlatButton";
import {Users} from "../../database";
import {useSelector} from "react-redux";
import colors from "../../global/styles/colors";
import {Line} from "../../components/Line";
import {Ionicons} from "@expo/vector-icons";
import {If} from "../../components/If";

export function AccountScreen() {
    const user = useSelector(state => state.account.currentUser);
    const [pfp, setPfp] = useState(user.pfp);

    useEffect(() => {
        if (!pfp) {
            user.getProfilePicture().then(url => {
                setPfp(url);
            })
        }
    }, [])

    const confirmSignOut = () => {
        Alert.alert("Are you sure you want to sign out?", '', [
            {
                text: 'Yes',
                onPress: Users.signOut
            },
            {
                text: 'No'
            }
        ])
    }

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
                <Ionicons name={'star-half'} size={35} style={{marginRight: 10, marginLeft: 5}} color={colors.light_blue}/>
                <Text style={{fontSize: 35, color: colors.aqua}}>Ratings</Text>
            </TouchableOpacity>

            <Line/>

            <TouchableOpacity style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Ionicons name={'create'} size={35} style={{marginRight: 10, marginLeft: 5}} color={colors.light_blue}/>
                <Text style={{fontSize: 35, color: colors.aqua}}>Reviews</Text>
            </TouchableOpacity>

            <Line/>


            <FlatButton text={'sign out'} onPress={confirmSignOut}/>
        </View>
    );
}