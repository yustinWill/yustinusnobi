import React from 'react'
import { Scene, Router, Actions, Stack, Tabs } from 'react-native-router-flux'
import {
    Easing,
    Alert,
    BackHandler,
    StyleSheet,
    Platform,
    View,
    Image,
    TouchableNativeFeedback
} from 'react-native';

import { Fonts, Colors, Icons, Metrics } from '../configs/GlobalConfig';

// screens identified by the router
import SplashScreen from '../containers/SplashScreen'
import LoginScreen from '../containers/LoginScreen';

import ListScreen from '../containers/ListScreen';
import DashboardScreen from '../containers/DashboardScreen';

const TabIcon = (props) => {
    const { screenKey, title, isFocused } = props

    let iconTab

    const navigate = () => {
        Actions.jump(screenKey)
    }

    switch (screenKey) {
        case 'list':
            iconTab = Icons.TAB_MENU_GRAPH_WHITE
            break;
        case 'dashboard':
            iconTab = Icons.TAB_MENU_LOGO
            break;
        default:
            break;
    }

    return (
        <TouchableNativeFeedback onPress={navigate}
            background={Platform.Version >= 21 ?
                TouchableNativeFeedback.Ripple(Colors.BLUE, true) :
                TouchableNativeFeedback.SelectableBackground()}>
            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
                <View style={{ height: 32, aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image resizeMethod="resize" source={iconTab} style={[
                        { height: '100%', width: '100%', resizeMode: "contain" },
                        screenKey == "list" && { tintColor: Colors.SUCCESS },
                        !isFocused && { tintColor: Colors.GRAY }
                    ]} />
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}

const NavigationRouter = () => {
    const showExitAlert = () => {
        Alert.alert(
            'Exit App',
            'Do you want to exit app?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Yes', onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false },
        );
    }

    const handleback = () => {
        let screen = Actions.currentScene;

        switch (screen) {
            case 'login':
                showExitAlert()
                return true;
            case 'list':
            case 'splash':
                BackHandler.exitApp()
                return true;
            default:
                Actions.pop()
                return true;
        }
    }

    const refreshScreen = () => {
        Actions.refresh({ lastUpdate: new Date })
    }

    const MyTransitionSpec = ({
        duration: 250,
        easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
        // timing: Animated.timing,
    });

    const transitionConfig = () => ({
        transitionSpec: MyTransitionSpec,
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps;
            const { index } = scene;
            const width = layout.initWidth;

            // right to left by replacing bottom scene
            return {
                transform: [{
                    translateX: position.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [width, 0, -width],
                    }),
                }]
            };
        }
    });

    const customTabBar = (props) => {
        const { state } = props.navigation
        const { routes, index } = state
        const tabList = routes
        const activeTabIndex = index;

        return (
            <View style={{
                flexDirection: 'row',
                height: 80,
                width: '100%',
                paddingHorizontal: Metrics.SAFE_AREA,
                alignSelf: 'center',
                backgroundColor: Colors.BLACK
            }}>
                {
                    tabList.map((element, index) => (
                        <View style={{ flex: 1 }} key={element.key}>
                            <TabIcon screenKey={element.key} isFocused={activeTabIndex == index} />
                        </View>
                    ))
                }
            </View>
        );
    }

    return (
        <Router backAndroidHandler={handleback}>
            <Stack
                transitionConfig={transitionConfig}
                key='root'>
                <Scene key='splash'
                    initial
                    type="reset"
                    headerShown={false}
                    component={SplashScreen} />
                <Scene key='login'
                    type="reset"
                    headerShown={false}
                    onEnter={refreshScreen}
                    component={LoginScreen} />
                <Tabs key="tabBar"
                    type="reset"
                    showLabel={false}
                    tabBarComponent={customTabBar}
                    hideNavBar>
                    <Scene key='list'
                        onEnter={refreshScreen}
                        headerShown={false}
                        title="List"
                        component={ListScreen} />
                    <Scene key='dashboard'
                        onEnter={refreshScreen}
                        headerShown={false}
                        title="Dashboard"
                        component={DashboardScreen} />
                </Tabs>
            </Stack>
        </Router>
    )
}

const styles = StyleSheet.create({
    headerTitle: Platform.OS == 'android' ? {
        marginLeft: 0,
        color: Colors.WhiteColor,
        fontSize: 18,
        fontFamily: Fonts.MONSERRAT_BOLD,
        letterSpacing: 0.7
    } : {
        color: Colors.WhiteColor,
        fontSize: 18,
        fontFamily: Fonts.MONSERRAT_BOLD,
        letterSpacing: 0.7
    }
})

export default NavigationRouter