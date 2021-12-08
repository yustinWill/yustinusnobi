import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';

import { Colors, Icons, Metrics } from '../configs/GlobalConfig';
import GlobalStyle from '../configs/GlobalStyle';
import { getUserToken, wait } from '../libraries/GlobalFunction';

const SplashScreen = (props) => {
	useEffect(() => {
		wait(2000).then(() => {
			getUserToken()
				.then((res) => {
					if (res) Actions.tabBar()
					else Actions.login()
				})
				.catch(err => Actions.login())
		})
	}, [])

	return (
		<LinearGradient colors={[Colors.BACKGROUND, Colors.BLACK, Colors.BLACK]} style={GlobalStyle.containerCenter}>
			<Image source={Icons.LOGO_TEXT} style={styles.imageLogo} />
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	imageLogo: {
		height: 150,
		width: 200,
		resizeMode: 'contain'
	}
});

export default SplashScreen