import React from 'react'
import { StatusBar, View } from 'react-native'

import NavigationRouter from './navigations/NavigationRouter';

import { Colors } from './configs/GlobalConfig';
import GlobalStyle from './configs/GlobalStyle';

const App = () => {
	return (
		<View style={GlobalStyle.container}>
			<StatusBar backgroundColor={Colors.BACKGROUND} barStyle='light-content'/>
			<NavigationRouter />
		</View>
	)
}

export default App