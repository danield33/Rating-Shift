import * as React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {CustomStarRating} from "../../components/CustomStarRating";
import colors from "../../global/styles/colors";

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
    return (
        <View style={{flex: 1, paddingTop: 20, top: 20, width: '100%'}}>

            <View style={{alignItems: 'center'}}>
                <CustomStarRating isDisabled={false} containerStyle={{justifyContent: undefined}} starStyle={{marginLeft: 10}}/>
                <Text style={{color: colors.aqua, fontWeight: '500'}}>Tap to Rate</Text>
            </View>

            <TextInput
                placeholder={'Title'}
                selectionColor={colors.red}
                style={styles.inputStyle}
                placeholderTextColor={colors.aqua}
            />
            <TextInput
                placeholder={'Review'}
                selectionColor={colors.red}
                style={styles.inputStyle}
                placeholderTextColor={colors.aqua}
            />

        </View>
    );
};