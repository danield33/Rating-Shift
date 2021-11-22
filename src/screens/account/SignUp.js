import React, {useState} from 'react';
import {Image, TextInput, View, StyleSheet} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import colors from "../../global/styles/colors";
import {If} from "../../components/If";

export function SignUp() {

    const [pfp, setPfp] = useState(null);

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%'}}>

            <If can={!pfp}>
                <Ionicons name={'person-circle-outline'} size={200} color={'white'}/>
                <Image source={{uri: pfp}} style={{height: 100, width: 100, borderRadius: 50}}/>
            </If>

            <TextInput
                style={styles.textInput}
                placeholder={'Username'}
                autoCorrect={false}
                autoCapitalize={'none'}
            />
            <TextInput
                style={styles.textInput}
                autoCorrect={false}
                autoCapitalize={'none'}
                placeholder={'Password'}
                secureTextEntry
            />
            <TextInput
                style={styles.textInput}
                autoCorrect={false}
                autoCapitalize={'none'}
                placeholder={'Confirm Password'}
                secureTextEntry
            />


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
    }
})