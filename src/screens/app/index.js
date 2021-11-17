import {View, Text, Button} from 'react-native';
import {Styles} from "../../global";
import {SideAppSelector} from "../../components/SideAppSelectorList";
import React, {useEffect, useState} from "react";
import RShift from '../../firebase';
import colors from "../../global/styles/colors";

export default function Apps() {

    const [apps, setApps] = useState([]);

    useEffect(() => {
        RShift.ftMatters.top({limit: 21}).then(apps => {
            setApps(apps.app_list);
        })
    }, [])


    return (
        <View style={Styles.background}>
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{
                        color: 'white',
                        fontSize: 25,
                        padding: 3
                    }}>Top Apps</Text>
                    <Button title={'See All'} color={colors.pink}/>
                </View>
                <SideAppSelector apps={apps}/>
            </View>
        </View>
    );
};