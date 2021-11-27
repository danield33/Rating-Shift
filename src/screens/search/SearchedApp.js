import * as React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import colors from "../../global/styles/colors";
import {Line} from "../../components/Line";
import StarRating from "react-native-star-rating";
import {If} from "../../components/If";

export function SearchedApp({app}) {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={{flex: 1, overflow: 'hidden'}}
            onPress={() => {
                //dispatch(viewApp(app));
                //navigation.navigate('Single App');
            }}>
            <View style={{flexDirection: 'row'}}>
                <Image source={{uri: app.artworkUrl512}}
                       style={{
                           width: 75,
                           height: 75,
                           borderRadius: 10
                       }}/>
                <View style={{marginLeft: 10, flex: 1}}>

                    <Text style={{
                        color: colors.aqua,
                        fontSize: 15,
                        fontWeight: '600',
                    }}
                          adjustsFontSizeToFit={true}
                          numberOfLines={2}
                    >{app.trackCensoredName}</Text>

                    <Text style={{color: 'white'}}>{app.subtitle}</Text>


                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={app.averageUserRating}
                        fullStarColor={colors.aqua}
                        halfStarColor={colors.aqua}
                        emptyStarColor={colors.light_blue}
                        starSize={20}
                        containerStyle={{justifyContent: undefined}}
                        starStyle={{marginLeft: 5}}
                    />

                </View>
            </View>

            <If can={app.screenshotUrls !== undefined && Array.isArray(app.screenshotUrls) && app.screenshotUrls.length > 0}>
                <View style={{flexDirection: 'row', flex: 1, width: '100%'}}>

                    <Image style={{width: 75, height: 220, borderRadius: 10, flex: 1, margin: 5}}
                           source={{uri: app.screenshotUrls?.[0]}}
                    />
                    <Image style={{width: 100, height: 220, borderRadius: 10, flex: 1, margin: 5}}
                           source={{uri: app.screenshotUrls?.[1]}}
                    />
                    <Image style={{width: 100, height: 220, borderRadius: 10, flex: 1, margin: 5}}
                           source={{uri: app.screenshotUrls?.[2]}}
                    />

                </View>
            </If>

            <Line/>
        </TouchableOpacity>
    );
}