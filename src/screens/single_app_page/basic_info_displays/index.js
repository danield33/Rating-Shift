import * as React from 'react';
import {ScrollView, View} from 'react-native';
import {colors} from "../../../global/styles";
import {AppRatingSummary} from "./AppRatingSummary";
import {DeveloperInfo} from "./DeveloperIcon";
import {MainLanguageDisp} from "./MainLanguage";
import {AppSizeDisplay} from "./AppSize";
import {ContentAdvisoryDisplay} from "./ContentAdvisoryDisplay";
import {If} from "../../../components/If";

const semiVerticalLine = () => {
    return (
        <View style={{
            backgroundColor: colors.blue,
            width: 2,
            height: '80%',
            marginLeft: 5,
            marginRight: 5,
            alignSelf: 'center'
        }}/>
    )
}

export function AppInfo({appData}) {

    return (
        <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{
                        borderTopWidth: 1,
                        width: '100%',
                        borderBottomWidth: 1,
                        padding: 5,
                        backgroundColor: colors.dark_blue,
                        borderRadius: 10
                    }} contentContainerStyle={{alignItems: 'center'}}>
            <AppRatingSummary
                averageUserRating={appData.averageUserRating}
                userRatingCount={appData.userRatingCount}/>

            {semiVerticalLine()}

            <DeveloperInfo name={appData.artistName}/>

            {semiVerticalLine()}

            <MainLanguageDisp mainLanguage={appData.lang} additionalLanguagesSize={appData.i18n_lang.length}/>

            {semiVerticalLine()}
            <If can={Boolean(appData.fileSizeBytesNumeric)}>
                <>
                    <AppSizeDisplay appSizeBytes={appData.fileSizeBytesNumeric}/>
                    {semiVerticalLine()}
                </>

            </If>


            <ContentAdvisoryDisplay age={appData.contentAdvisoryRating}/>

        </ScrollView>
    );
}