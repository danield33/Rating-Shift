import * as React from 'react';
import {View} from 'react-native';
import {Styles} from '../../global/index'
import PropTypes from 'prop-types'

export default function SingleApp({app}) {
    return (
        <View style={Styles.background}>

        </View>
    );
};


SingleApp.propTypes = {
    app: PropTypes.object,
}
