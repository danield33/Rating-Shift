import * as React from 'react';
import {Keyboard, Modal, TouchableWithoutFeedback, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Styles} from "../global";
import colors from "../global/styles/colors";


export function CustomModal({children, onClose, isOpen, iconColor}) {
    return (
        <Modal visible={isOpen} animationType={'slide'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={Styles.background}>
                    <Ionicons name={"close"}
                              style={{position: 'absolute', left: 20, top: 40, padding: 10, zIndex: 3}}
                              size={24}
                              color={iconColor || colors.dark_blue}
                              onPress={onClose}/>
                    {children}
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};