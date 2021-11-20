import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import {LogBox, Text, View} from 'react-native';
import {Styles} from "./src/global";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {Apps} from "./src/screens";
import {Ionicons} from '@expo/vector-icons';
import colors from "./src/global/styles/colors";

const Tab = createBottomTabNavigator();


LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews'])

export default function App() {



    return(

          <NavigationContainer>
              <Tab.Navigator
                  screenOptions={{
                      headerStyle: {
                          backgroundColor: colors.dark_blue,
                      },
                      tabBarStyle:{
                          backgroundColor: colors.dark_blue
                      },
                      tabBarLabelStyle:{
                          fontSize: 15,
                          color: colors.red
                      },
                      headerTitleStyle:{
                          color: colors.aqua
                      }

              }}>
                  <Tab.Screen name={'Apps'} component={Apps} options={{tabBarIcon: iconRender('layers', colors.aqua, 30)}}/>
              </Tab.Navigator>
          </NavigationContainer>

  )
}

function iconRender(name, color, size=25){
    return () => (
        <Ionicons name={name} color={color} size={size}/>
    )
}
