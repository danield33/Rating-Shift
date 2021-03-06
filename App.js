import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Account, Apps, AppsList, RatingsPage, SingleApp, SearchPage} from "./src/screens";
import {Ionicons} from '@expo/vector-icons';
import colors from "./src/global/styles/colors";
import {createStackNavigator} from '@react-navigation/stack';
import store from "./src/global/redux/store";
import {Provider} from 'react-redux';
import User from "./src/database/firebase/collections/user/User";
import {getAuth} from "firebase/auth";
import {changeAuthentication} from "./src/global/redux/actions/AppListActions";
import {Ratings} from "./src/screens/account/Ratings";
import {Reviews} from "./src/screens/account/Reviews";
import {AccountSettings} from "./src/screens/account/AccountSettings";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews'])

function MainPage() {
    return (
        <Tab.Navigator
            initialRouteName={"Apps"}
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.dark_blue,
                },
                tabBarStyle: {
                    backgroundColor: colors.dark_blue,
                },
                tabBarLabelStyle: {
                    fontSize: 15,
                    color: colors.red
                },
                headerTitleStyle: {
                    color: colors.aqua
                },
                tabsStyle: {
                    tabBarSelectedButtonColor: 'black',
                    tabBarButtonColor: 'white',
                    tabBarBackgroundColor: '#fff',
                },
                tabBarOptions: {
                    activeTintColor: 'red'
                }
            }}>
            <Tab.Screen name={'Search'} component={SearchPage}
                        options={{
                            tabBarActiveTintColor: colors.aqua,
                            tabBarIcon: ({color}) => iconRender('search-outline', color, 30)
                        }}/>
            <Tab.Screen name={'Apps'} component={Apps}
                        options={{
                            tabBarActiveTintColor: colors.aqua,
                            tabBarIcon: ({color}) => iconRender('apps-outline', color, 30)
                        }}/>
            <Tab.Screen name={'Account'} component={Account}
                        options={{
                            tabBarActiveTintColor: colors.aqua,
                            tabBarIcon: ({color}) => iconRender('person-circle-outline', color, 30)
                        }}
            />
        </Tab.Navigator>
    )
}

export default function App() {

    useEffect(() => {
        const unsub = getAuth().onAuthStateChanged(async snap => {
            if (snap?.uid) {
                const user = await User.get(snap.uid);
                store.dispatch(changeAuthentication(user))
            } else store.dispatch(changeAuthentication(null))
        });

        return () => {
            unsub();
        }

    }, [])

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
                    <Stack.Screen name={'Ratings'} component={Ratings}/>
                    <Stack.Screen name={'Reviews'} component={Reviews}/>
                    <Stack.Screen name={'Settings'} component={AccountSettings}/>

                </Stack.Navigator>
            </NavigationContainer>
        </Provider>

    )
}

function iconRender(name, color, size = 25) {
    return <Ionicons name={name} color={color} size={size}/>
}
