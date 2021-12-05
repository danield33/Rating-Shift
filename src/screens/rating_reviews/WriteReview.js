import * as React from 'react';
import {ScrollView, StyleSheet, Text, View, Alert} from 'react-native';
import {CustomStarRating} from "../../components/CustomStarRating";
import colors from "../../global/styles/colors";
import {Ionicons} from "@expo/vector-icons";
import {TextInputValue} from "../../components/TextInputValue";
import {useRef} from "react";

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
    const starRef = useRef(null);
    const titleRef = useRef(null);
    const reviewRef = useRef(null);

    const submit = () => {

        const rating = starRef.current._getRating();

        if(!rating)
            return Alert.alert("Missing Rating", "Please select a rating by tapping on a star")

        const title = titleRef.current._getText().trim();
        if(!title)
            return Alert.alert("Missing Title", "Please add a title")

        const review = reviewRef.current._getText().trim();
        if(!review)
            return Alert.alert("Missing Review", "Please write a review")

        onSubmit({rating, title, review});

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
                                      starStyle={{marginLeft: 10}}
                                      ref={starRef}
                    />
                    <Text style={{color: colors.aqua, fontWeight: '500'}}>Tap to Rate</Text>
                </View>

                <TextInputValue
                    placeholder={'Title'}
                    selectionColor={colors.red}
                    style={styles.inputStyle}
                    placeholderTextColor={colors.aqua}
                    blur={true}
                    ref={titleRef}
                />

                <TextInputValue
                    placeholder={'Review'}
                    selectionColor={colors.red}
                    style={{flex: .5, ...styles.inputStyle, borderBottomWidth: 2}}
                    placeholderTextColor={colors.aqua}
                    multiline
                    blur={true}
                    ref={reviewRef}
                />


            </ScrollView>
        </>

    );
};