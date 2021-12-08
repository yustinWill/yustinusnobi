import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TextInput, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions } from 'react-native-router-flux';

import { Metrics, Colors, Icons, Fonts, StorageKey } from '../configs/GlobalConfig';
import GlobalStyle from '../configs/GlobalStyle';
import { isEmail } from '../libraries/GlobalFunction';
import { modelAuth } from '../models/Auth';
import CustomButtom from '../components/CustomButtom';

const LoginScreen = (props) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [emailValidationMessage, setEmailValidationMessage] = useState('')
	const [passwordValidationMessage, setPasswordValidationMessage] = useState('')

	const [isLoading, setIsLoading] = useState(false)
	const [isVisiblePassword, setIsVisiblePassword] = useState(false)

	useEffect(() => {
		setEmailValidationMessage("")
		setPasswordValidationMessage("")
	}, [email, password])

	const handleTogglePassword = () => setIsVisiblePassword(!isVisiblePassword)

	const handleLogin = () => {
		if (email == "") {
			setEmailValidationMessage("E-mail Address is empty")
			return
		}
		if (!isEmail(email)) {
			setEmailValidationMessage("E-mail Address format is invalid")
			return
		}
		if (password == "") {
			setPasswordValidationMessage("Password is empty")
			return
		}
		if (email != "test@usenobi.com" && password != "Test123") {
			setEmailValidationMessage("Invalid E-mail Address")
			setPasswordValidationMessage("Invalid Password")
			return
		}
		if (email != "test@usenobi.com") {
			setEmailValidationMessage("Invalid E-mail Address")
			return
		}
		if (password != "Test123") {
			setPasswordValidationMessage("Invalid Password")
			return
		}

		setIsLoading(true)

		const postData = { email, password }

		modelAuth.login(postData, res => {
			const { statusCode, result } = res

			switch (statusCode) {
				case 200:
					const { token } = result

					// {
					// 	"statusCode": "ok",
					// 	"token": "nobi1638899095",
					// 	"message": "login ok"
					// }

					AsyncStorage.setItem(StorageKey.USER_TOKEN, token)
					Actions.tabBar()
					break;
				case 500:
				// {
				// 	"statusCode": "error",
				// 	"message": "incorrect email / password"
				// }
				default:
					setEmailValidationMessage("Invalid E-mail Address")
					setPasswordValidationMessage("Invalid Password")
					break;
			}
		})
			.catch(err => {
				console.log(err)
				setEmailValidationMessage("Not connected to internet")
				setPasswordValidationMessage("Not connected to internet")
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	const labelEmailValidationMessage = emailValidationMessage
	const labelPasswordValidationMessage = passwordValidationMessage

	return (
		<View style={GlobalStyle.container}>
			<View style={GlobalStyle.containerBackground}>
				<Image source={Icons.LOGO_TEXT} style={styles.imageLogo} />

				<View style={{ flex: 1, paddingHorizontal: Metrics.SAFE_AREA }}>
					<ScrollView contentContainerStyle={{ paddingTop: 100 }}>
						<View style={{ marginTop: 14 }}>
							<Text style={styles.inputLabelText}>E-mail Address</Text>
							<View style={styles.inputContainer}>
								<TextInput
									style={styles.inputTextInput}
									placeholder="Enter E-mail Address"
									placeholderTextColor={Colors.GRAY}
									onChangeText={setEmail}
									value={email}
								/>
							</View>
							<View style={{ height: 20 }}>
								<Text style={styles.inputValidationMessageText}>{labelEmailValidationMessage}</Text>
							</View>
						</View>
						<View style={{ marginTop: 14 }}>
							<Text style={styles.inputLabelText}>Password</Text>
							<View style={styles.inputContainer}>
								<TextInput
									style={styles.inputTextInput}
									placeholder="Enter Password"
									placeholderTextColor={Colors.GRAY}
									secureTextEntry={!isVisiblePassword}
									onChangeText={setPassword}
									value={password}
								/>
								<TouchableOpacity onPress={handleTogglePassword} style={styles.inputPasswordButtonContainer}>
									<Image source={isVisiblePassword ? Icons.EYE_ENABLED : Icons.EYE_DISABLED} resizeMode="contain" style={{ height: 25, width: 25, tintColor: Colors.WHITE }} />
								</TouchableOpacity>
							</View>
							<View style={{ height: 20 }}>
								<Text style={styles.inputValidationMessageText}>{labelPasswordValidationMessage}</Text>
							</View>
						</View>
					</ScrollView>
					<View style={GlobalStyle.footerButtonContainer}>
						<CustomButtom
							label="Login"
							color={Colors.BLUE}
							onPress={handleLogin}
							isLoading={isLoading}
						/>
					</View>
				</View>

			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	imageLogo: {
		position: 'absolute',
		top: Metrics.SAFE_AREA,
		width: 100,
		resizeMode: "contain",
		alignSelf: 'center'
	},
	inputContainer: {
		marginTop: 14,
		marginBottom: 8,
		height: 50,
		width: '100%',
		borderRadius: 8,
		backgroundColor: Colors.BACKGROUND_INPUT,
	},
	inputLabelText: {
		fontFamily: Fonts.CIRCULAR_STD_BOOK,
		color: Colors.LABEL
	},
	inputTextInput: {
		flex: 1,
		textAlign: 'center',
		fontFamily: Fonts.CIRCULAR_STD_BOOK,
		color: Colors.WHITE
	},
	inputValidationMessageText: {
		fontFamily: Fonts.CIRCULAR_STD_BOOK_ITALIC,
		color: Colors.WARNING
	},
	inputPasswordButtonContainer: {
		position: 'absolute',
		right: 0,
		height: '100%',
		aspectRatio: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default LoginScreen