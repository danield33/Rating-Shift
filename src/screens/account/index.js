import React, {useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {Styles} from "../../global";
import {If} from "../../components/If";
import colors from "../../global/styles/colors";
import {FlatButton} from "../../components/FlatButton";
import {CustomModal} from "../../components/CustomModal";
import {SignUp} from "./SignUp";
import RShift, {errorCodes} from '../../database'

const isLoggedIn = false;

export default function Account() {

    const [isSigningUp, setSigningUp] = useState(0);//0 = nothing 1 = log in 2 = create account

    const createAccount = (data) => {
        console.log(isSigningUp, data)
        if (isSigningUp)
            RShift.logUserIn(data)
                .then(user => {
                    console.log(user, 'logIn')
                })
                .catch(err => {
                    console.log(err);
                    const errCode = errorCodes[err[0]]
                    if(errCode)
                        Alert.alert(errCode);
                    else Alert.alert(err[0].split(':')[1])
                })
        else
            RShift.createAccount(data).then(user => {
                console.log(user, 'us')
            })
                .catch((err) => {
                    const errorCode = errorCodes[err[0]];
                    if (errorCode)
                        Alert.alert(errorCode);
                    else Alert.alert(err[0].split(':')[1]);
                })
    }

    return (
        <View style={Styles.background}>

            <CustomModal isOpen={Boolean(isSigningUp)} onClose={() => setSigningUp(0)}>
                <SignUp confirmPassword={isSigningUp - 1} onSubmit={createAccount}/>
            </CustomModal>

            <If can={!isLoggedIn}>
                <View style={{alignItems: 'center', flex: 1, width: '100%', justifyContent: 'space-evenly'}}>

                    <Text style={{
                        color: colors.aqua,
                        fontSize: 30,
                        fontWeight: '500'
                    }}>Select an Option</Text>

                    <FlatButton color={colors.red} text={"Log In"} style={{width: '100%'}}
                                onPress={() => setSigningUp(1)}/>
                    <FlatButton color={colors.dark_blue} text={"Create Account"} style={{width: '100%'}}
                                onPress={() => setSigningUp(2)}/>
                </View>

            </If>

        </View>
    );
};