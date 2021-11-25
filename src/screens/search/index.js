import * as React from 'react';
import {View, Text, TextInput} from 'react-native';
import {Styles} from "../../global";
import colors from "../../global/styles/colors";
import {TextInputValue} from "../../components/TextInputValue";

export default function SearchPage() {
    return (
        <View style={{...Styles.background}}>
            <View style={{justifyContent: 'flex-start', width: '100%'}}>
                <Text style={{fontSize: 35, color: colors.aqua, fontWeight: 'bold'}}>Search</Text>
                <TextInputValue
                    style={{
                        width: '100%',
                        backgroundColor: colors.dark_blue,
                        borderRadius: 10,
                        height: 30,
                        borderColor: colors.dark_blue,
                        borderWidth: 2,
                        color: colors.aqua,
                        fontWeight: '500',
                        paddingLeft: 10,
                        paddingRight: 10,
                        fontSize: 20
                    }}
                    inlineImageLeft={'search-icon'}
                    blur={true}
                    endEditing={true}
                    onSetText={console.log}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    placeholderTextColor={colors.light_blue}
                    placeholder={'Search Apps'}
                />

            </View>
        </View>
    );
};