import * as React from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View, Alert} from 'react-native';
import {CustomStarRating} from "../../components/CustomStarRating";
import colors from "../../global/styles/colors";
import {Ionicons} from "@expo/vector-icons";
import {TextInputValue} from "../../components/TextInputValue";

const styles = StyleSheet.create({
    inputStyle: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
        padding: 10,
        borderTopWidth: 2,
        borderColor: colors.dark_blue,
    }
})

export function WriteReview({onSubmit}) {

    const submit = () => {



    }

    const alertSubmit = () => {
        Alert.alert("Are you sure?", "Are you sure you want to submit this review?", [
            {
                text: 'Yes',
                onPress: submit
            },
            {
                text: 'Cancel'
            }
        ])
    }

    return (

        <>
            <Ionicons name={'checkmark-circle'} size={25} color={colors.red} style={{
                position: 'absolute',
                right: 20,
                top: 40,
                padding: 15,
                zIndex: 3
            }} onPress={alertSubmit}/>
            <ScrollView style={{paddingTop: 20, top: 20, width: '100%', flex: 1}}
                        contentContainerStyle={{flex: 1}}>

                <View style={{alignItems: 'center'}}>
                    <CustomStarRating isDisabled={false} containerStyle={{justifyContent: undefined}}
                                      starStyle={{marginLeft: 10}}/>
                    <Text style={{color: colors.aqua, fontWeight: '500'}}>Tap to Rate</Text>
                </View>

                <TextInputValue
                    placeholder={'Title'}
                    selectionColor={colors.red}
                    style={styles.inputStyle}
                    placeholderTextColor={colors.aqua}
                    blur={true}
                />
                <TextInputValue
                    placeholder={'Review'}
                    selectionColor={colors.red}
                    style={{flex: .5, ...styles.inputStyle, borderBottomWidth: 2}}
                    placeholderTextColor={colors.aqua}
                    multiline
                    blur={true}
                />


            </ScrollView>
        </>

    );
};