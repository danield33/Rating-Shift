import * as React from 'react';
import {View} from 'react-native';

export function If({can, children}) {
    const childArr = React.Children.toArray(children);
    if(can && childArr.length > 0)
        return childArr[0];
    else if(childArr.length > 1) return childArr[1];
    else return null;

};