import React from 'react';
import {LogBox} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Apps, SingleApp, RatingsPage, AppsList} from "./src/screens";
import {Ionicons} from '@expo/vector-icons';
import colors from "./src/global/styles/colors";
import {createStackNavigator} from '@react-navigation/stack';
import store from "./src/global/redux/store";
import {Provider} from 'react-redux';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews'])

function MainPage() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.dark_blue,
                },
                tabBarStyle: {
                    backgroundColor: colors.dark_blue
                },
                tabBarLabelStyle: {
                    fontSize: 15,
                    color: colors.red
                },
                headerTitleStyle: {
                    color: colors.aqua
                }

            }}>
            <Tab.Screen name={'Apps'} component={Apps} options={{tabBarIcon: iconRender('layers', colors.aqua, 30)}}/>
        </Tab.Navigator>
    )
}

export default function App() {


    return (

        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: true,
                    headerBackTitle: 'Back',
                    headerTitleStyle: {
                        color: colors.aqua
                    },
                    headerBackTitleStyle: {
                        color: 'white'
                    },
                    headerStyle: {
                        backgroundColor: colors.dark_blue
                    }
                }}>
                    <Stack.Screen name={'Main Page'}
                                  component={MainPage}
                                  options={{headerShown: false}}/>
                    <Stack.Screen name={'Single App'}
                                  component={SingleApp}
                                  options={{
                                      headerTitle: '',
                                  }}
                    />
                    <Stack.Screen name={'RatingsReviews'}
                                  component={RatingsPage}
                                  options={{
                                      headerTitle: 'Ratings & Reviews',
                                  }}
                    />
                    <Stack.Screen name={'AppsList'}
                                  component={AppsList}
                                  options={{
                                      headerTitle: ''
                                  }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>

    )
}

function iconRender(name, color, size = 25) {
    return () => (
        <Ionicons name={name} color={color} size={size}/>
    )
}
