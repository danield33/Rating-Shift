import * as React from 'react';
import {View, Text} from 'react-native';
import {Styles} from "../../global";
import {If} from "../../components/If";
import colors from "../../global/styles/colors";
import {FlatButton} from "../../components/FlatButton";

const isLoggedIn = false;

export default function Account() {
    return (
        <View style={Styles.background}>

            <If can={!isLoggedIn}>
                <View style={{alignItems: 'center', flex: 1, width: '100%', justifyContent: 'space-evenly'}}>

                    <Text style={{
                        color: colors.aqua,
                        fontSize: 30,
                        fontWeight: '500'
                    }}>Select an Option</Text>

                    <FlatButton color={colors.red} text={"Log In"} style={{width: '100%'}}/>
                    <FlatButton color={colors.dark_blue} text={"Create Account"} style={{width: '100%'}}/>
                </View>

            </If>

        </View>
    );
};