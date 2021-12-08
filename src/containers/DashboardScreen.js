import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions } from 'react-native-router-flux';

import { Colors, Fonts, Icons, Illustrations, Metrics, StorageKey } from '../configs/GlobalConfig';
import GlobalStyle from '../configs/GlobalStyle';
import { getUserToken, wait } from '../libraries/GlobalFunction';
import { modelData } from '../models/Data';
import CustomButtom from '../components/CustomButtom';

const DashboardScreen = (props) => {
	const [totalAsset, setTotalAsset] = useState("")
	const [changeRateIn24Hour, setChangeRateIn24Hour] = useState("")

	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		getData()
	}, [])

	const getData = () => {
		getUserToken()
			.then((token) => {
				if (token) {
					const postData = { token }
					modelData.dashboard(postData, res => {
						const { statusCode, result } = res
						const { status } = result

						console.log(res)

						switch (statusCode) {
							case 200:
								// {
								// 	"status": "ok",
								// 	"total_asset": "3.79",
								// 	"24hourchange": "11.5"
								// }
								if (status == "ok") {
									setTotalAsset(result.total_asset)
									setChangeRateIn24Hour(result["24hourchange"])
								}
								if (status == "error") {
									// {
									// 	"status": "error",
									// 	"message": "invalid request"
									// }
								}
								break;
							default:

								break;
						}
					})
						.catch(err => {
							console.log(err)
						})
						.finally(() => {
							setIsLoading(false)
						})

					return
				}

				throw err
			})
			.catch(err => {
				setIsLoading(false)

				Alert.alert("Redirecting to Login", "Credential not found, please login again", [
					{
						text: 'OK',
						onPress: () => Actions.login()
					}
				])
			})
	}

	const handleDeposit = () => {
		if (isLoading) return

		setIsLoading(true)
		setTotalAsset("")
		setChangeRateIn24Hour("")

		wait(5000).then(getData)
	}

	const handleLogout = () => {
		AsyncStorage.removeItem(StorageKey.USER_TOKEN)
		Actions.login()
	}

	const labelChangeRate = changeRateIn24Hour ? `+ ${changeRateIn24Hour}%` : ""
	const labelTotalAsset = totalAsset ? `$${totalAsset}` : "-"

	return (
		<View style={GlobalStyle.container}>
			<View style={GlobalStyle.containerBackground}>
				<View style={{ marginTop: 24, paddingHorizontal: Metrics.SAFE_AREA }}>
					<Image source={Illustrations.BANNER_ONE} style={{ width: '100%' }} resizeMode="contain" />
				</View>
				<View style={{ marginTop: 28, alignSelf: 'center', alignItems: 'center' }}>
					<View style={{ flexDirection: 'row' }}>
						<Text style={{ fontFamily: Fonts.CIRCULAR_STD_BOOK, color: Colors.GRAY }}>24H Changes</Text>
						<View style={{ marginLeft: 5 }}>
							<Text style={{ fontFamily: Fonts.CIRCULAR_STD_BOOK, color: Colors.SUCCESS }}>{labelChangeRate}</Text>
						</View>
					</View>
					<Text style={{ fontFamily: Fonts.CIRCULAR_STD_BOLD, color: Colors.WHITE, fontSize: 48 }}>{labelTotalAsset}</Text>
				</View>
				<View style={styles.depositButtonContainer}>
					<CustomButtom
						label="Deposit"
						color={Colors.SUCCESS}
						onPress={handleDeposit}
						isLoading={isLoading}
					/>
				</View>
				<View style={GlobalStyle.footerButtonContainer}>
					<CustomButtom
						label="Logout"
						color={Colors.WARNING}
						onPress={handleLogout}
						isLoading={isLoading}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({

	depositButtonContainer: {
		marginTop: 36,
		width: '100%',
		paddingHorizontal: 48,
		alignSelf: 'center'
	}
});

export default DashboardScreen