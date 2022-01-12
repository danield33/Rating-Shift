import * as React from 'react';
import {Keyboard, Modal, TouchableWithoutFeedback, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Styles} from "../global";
import colors from "../global/styles/colors";


/**
 * Creates a standard modal over the component this is in
 * @param children the content inside the modal
 * @param onClose what happens when the modal is closed
 * @param isOpen if this modal is open
 * @param iconColor the color of the close button
 * @returns {JSX.Element}
 * @constructor none
 */
export function CustomModal({children, onClose, isOpen, iconColor}) {
    return (
        <Modal visible={isOpen} animationType={'slide'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={Styles.background}>
                    <Ionicons name={"close"}
                              style={{position: 'absolute', left: 20, top: 40, padding: 15, zIndex: 3}}
                              size={25}
                              color={iconColor || colors.red}
                              onPress={onClose}/>
                    {children}
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
