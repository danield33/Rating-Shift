import React, {useState} from 'react';
import {Image, TextInput, View, StyleSheet, Text} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import colors from "../../global/styles/colors";
import {If} from "../../components/If";
import {TextInputValue} from "../../components/TextInputValue";

export function SignUp({confirmPassword, onSubmit}) {

    const [pfp, setPfp] = useState(null);

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%'}}>



            <If can={!confirmPassword}>
                <Text style={styles.titleText}>Log In</Text>
                <Text style={styles.titleText}>Create Account</Text>
            </If>

            <If can={!pfp && confirmPassword}>
                <Ionicons name={'person-circle-outline'} size={200} color={'white'}/>
                <Image source={{uri: pfp}} style={{height: 100, width: 100, borderRadius: 50}}/>
            </If>

            <TextInputValue
                style={styles.textInput}
                placeholder={'Username'}
                autoCorrect={false}
                autoCapitalize={'none'}
            />
            <TextInputValue
                style={styles.textInput}
                autoCorrect={false}
                autoCapitalize={'none'}
                placeholder={'Password'}
                secureTextEntry
            />
            <If can={confirmPassword}>
                <TextInputValue
                    style={styles.textInput}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    placeholder={'Confirm Password'}
                    secureTextEntry
                />
            </If>


        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: colors.red,
        borderRadius: 20,
        padding: 15,
        color: colors.dark_blue,
        fontWeight: '700',
        marginBottom: 15,
        width: '80%',
        fontSize: 20
    },
    titleText: {
        fontSize: 30,
        color: colors.aqua,
        fontWeight: 'bold',
        bottom: 75
    }
})