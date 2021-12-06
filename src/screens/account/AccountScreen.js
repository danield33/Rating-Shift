import * as React from 'react';
import {useEffect, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {FlatButton} from "../../components/FlatButton";
import {Users} from "../../database";
import {useSelector} from "react-redux";
import colors from "../../global/styles/colors";
import {Line} from "../../components/Line";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {ProfilePicture} from "../../components/ProfilePicture";

export function AccountScreen() {
    const navigation = useNavigation();
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
            }} onPress={() => navigation.navigate('Settings')}>
                <ProfilePicture image={pfp}/>
                <View>
                    <Text style={{fontSize: 35, color: colors.aqua, fontWeight: '500'}}>{user.username}</Text>
                    <Text style={{color: colors.light_blue, fontWeight: '700'}}>Account Settings</Text>
                </View>
            </TouchableOpacity>
            <Line/>

            <TouchableOpacity style={{
                flexDirection: 'row',
                alignItems: 'center'
            }} onPress={() => navigation.navigate("Ratings")}>
                <Ionicons name={'star-half'} size={35} style={{marginRight: 10, marginLeft: 5}}
                          color={colors.light_blue}/>
                <Text style={{fontSize: 35, color: colors.aqua}}>Ratings</Text>
            </TouchableOpacity>

            <Line/>

            <TouchableOpacity style={{
                flexDirection: 'row',
                alignItems: 'center'
            }} onPress={() => navigation.navigate("Reviews")}>
                <Ionicons name={'create'} size={35} style={{marginRight: 10, marginLeft: 5}} color={colors.light_blue}/>
                <Text style={{fontSize: 35, color: colors.aqua}}>Reviews</Text>
            </TouchableOpacity>

            <Line/>


            <FlatButton text={'sign out'} onPress={confirmSignOut}/>
        </View>
    );
}