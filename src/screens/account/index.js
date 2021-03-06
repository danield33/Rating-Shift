import React, {useState} from 'react';
import {Alert, Text, View, Image} from 'react-native';
import {Styles} from "../../global";
import {If} from "../../components/If";
import colors from "../../global/styles/colors";
import {FlatButton} from "../../components/FlatButton";
import {CustomModal} from "../../components/CustomModal";
import {SignUp} from "./SignUp";
import {errorCodes, Users} from '../../database'
import {useSelector} from "react-redux";
import {AccountScreen} from "./AccountScreen";
import Logo from '../../../assets/logo.png'


export default function Account() {

    const currentUser = useSelector(state => state.account.currentUser);
    const [isSigningUp, setSigningUp] = useState(0);//0 = nothing 1 = log in 2 = create account

    const createAccount = (data) => {

        if (!(isSigningUp - 1))
            Users.logUserIn(data)
                .then(() => {
                    setSigningUp(0);// state changed handled in App.js
                })
                .catch(err => {
                    const errCode = errorCodes[err[0]]
                    if (errCode)
                        Alert.alert(errCode);
                    else Alert.alert(err[0].split(':')[1])
                })
        else
            Users.createAccount(data).then(() => {
                setSigningUp(0);
            })
                .catch((err) => {
                    const errorCode = errorCodes[err[0]];
                    if (errorCode)
                        Alert.alert(errorCode);
                    else Alert.alert(err[1].split(':')[1]);
                })
    }

    return (
        <View style={Styles.background}>

            <CustomModal isOpen={Boolean(isSigningUp)} onClose={() => setSigningUp(0)}>
                <SignUp confirmPassword={isSigningUp - 1} onSubmit={createAccount}/>
            </CustomModal>

            <If can={!currentUser}>
                <View style={{alignItems: 'center', flex: 1, width: '100%', justifyContent: 'space-evenly'}}>

                    <Text style={{
                        color: colors.aqua,
                        fontSize: 30,
                        fontWeight: '500'
                    }}>Rating Shift</Text>

                    <Image source={Logo} style={{width: 150, height: 150}}/>

                    <FlatButton color={colors.red} text={"Log In"} style={{width: '100%'}}
                                onPress={() => setSigningUp(1)}/>
                    <FlatButton color={colors.dark_blue} text={"Create Account"} style={{width: '100%'}}
                                onPress={() => setSigningUp(2)}/>
                </View>

                <View style={{flex: 1, width: '100%'}}>
                    <AccountScreen/>
                </View>

            </If>

        </View>
    );
};