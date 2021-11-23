import React, {useState, useEffect} from 'react';
import {Image, TextInput, View, StyleSheet, Text} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import colors from "../../global/styles/colors";
import {If} from "../../components/If";
import {TextInputValue} from "../../components/TextInputValue";
import * as yup from 'yup';
import {FlatButton} from "../../components/FlatButton";

const input = {
    username: '',
    password: '',
    confirmPass: ''
}
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const verification = {
    username: (text) => {
        text = text.trim();
        const b = text.length >= 3 && text.length <= 15;
        if(b)
            return b;
        return "Input a name between 3 and 15 characters"
    },
    email: (text) => {
        const b = emailRegex.test(text.trim());
        if(b)
            return b;
        return "Input a valid email"
    },
    password: (text) => {
        const b = text.length >= 6;
        if(b)
            return b;
        return "Input a password greater than 6 characters"
    },
    confirmPass: (text, text2) => {
        const b = text === text2;
        if(b)
            return b;
        return "Passwords do not match"
    }
}

export function SignUp({confirmPassword, onSubmit}) {


    const [errMessages, setErrMessages] = useState({
        username: null,
        password: null,
        email: null,
        confirmPass: null
    })


    let confirmPassSchema;

    useEffect(() => {
        if(confirmPassword)
            confirmPassSchema = yup.string().required("Please confirm your password").min(6)
        return () => {
            input.username = '';
            input.password = '';
            if(input.email)
                input.email = null
            if(input.confirmPass)
                input.confirmPass = null;
        }
    }, [])

    const textChange = (inputKey) => {
        return (text) => {
            input[inputKey] = text;
            const verifMessage = verification[inputKey](text, input.password);
            if(verifMessage === true){
                errMessages[inputKey] = true;
            }else{
                errMessages[inputKey] = verifMessage
            }
            setErrMessages({...errMessages});
        }
    }


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
                blur={true}
                placeholder={'Email'}
                endEditing={true}
                onSetText={textChange('email')}
                autoCorrect={false}
                autoCapitalize={'none'}
            />
            {(errMessages.email !== null || errMessages.email) && <Text>{errMessages.email}</Text>}

            <If can={confirmPassword}>
                <>
                    <TextInputValue
                        style={styles.textInput}
                        blur={true}
                        endEditing={true}
                        onSetText={textChange('username')}
                        placeholder={'Username'}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                    />
                    {(errMessages.username !== null || errMessages.username) && <Text>{errMessages.username}</Text>}
                </>
            </If>

            <TextInputValue
                style={styles.textInput}
                blur={true}
                endEditing={true}
                onSetText={textChange('password')}
                autoCorrect={false}
                autoCapitalize={'none'}
                placeholder={'Password'}
                secureTextEntry
            />
            {errMessages.password && <Text>{errMessages.password}</Text>}

            <If can={confirmPassword}>
                <>
                    <TextInputValue
                        blur={true}
                        endEditing={true}
                        style={styles.textInput}
                        onSetText={textChange('confirmPass')}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        placeholder={'Confirm Password'}
                        secureTextEntry
                    />
                    {errMessages.confirmPass && <Text>{errMessages.confirmPass}</Text>}
                </>
            </If>

            <FlatButton text={'Submit'} color={colors.red} style={{width: '100%', top: 30}} onPress={() =>{

                console.log(input, confirmPassword, '12')
                if(Boolean(confirmPassword)){
                    if(Object.values(input).some(i => Boolean(i) !== false))
                        return onSubmit(input);
                }else{
                    if(input.email && input.password)
                        return onSubmit(input);
                }
            }}/>

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