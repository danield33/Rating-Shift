import React, {useState, useEffect} from 'react';
import {Image, TextInput, View, StyleSheet, Text} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import colors from "../../global/styles/colors";
import {If} from "../../components/If";
import {TextInputValue} from "../../components/TextInputValue";
import * as yup from 'yup';
import {FlatButton} from "../../components/FlatButton";

const yupSchema = yup.object().shape({
    username: yup.string().required("Please input a username").min(3),
    password: yup.string().required("Please input a password").min(6),
});

export function SignUp({confirmPassword, onSubmit}) {

    const [errMessages, setErrMessages] = useState({
        username: null,
        password: null,
        confirmPassword: null
    })

    const input = {
        username: '',
        password: '',
        // confirmPass: ''
    }
    let confirmPassSchema;

    useEffect(() => {
        if(confirmPassword)
            confirmPassSchema = yup.string().required("Please confirm your password").min(6)
    }, [])

    const textChange = (inputKey) => {
        return (text) => {
            input[inputKey] = text;
            confirmPassSchema?.validate(input.confirmPass).catch(err => {
                errMessages.confirmPassword = err.message
                setErrMessages(errMessages)
            })
            yupSchema.validate(input)
                .catch(err => {
                errMessages[err.path] = err.message
                setErrMessages(errMessages)
            })
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
                endEditing={true}
                onSetText={textChange('username')}
                placeholder={'Username'}
                autoCorrect={false}
                autoCapitalize={'none'}
            />
            {errMessages.username && <Text>{errMessages.username}</Text>}
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
                    {errMessages.confirmPassword && <Text>{errMessages.confirmPassword}</Text>}
                </>
            </If>

            <FlatButton text={'Submit'} color={colors.red} style={{width: '100%', top: 30}}/>

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