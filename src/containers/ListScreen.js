import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, FlatList, TextInput, TouchableOpacity, Text, RefreshControl } from 'react-native';

import { Colors, Fonts, Icons, Metrics } from '../configs/GlobalConfig';
import GlobalStyle from '../configs/GlobalStyle';

import { modelData } from '../models/Data';

const ItemListScreen = (props) => {
	const { item, index } = props
	const { image, ticker, amount } = item

	// {
	// 	"image": "https://honest-mining.s3-ap-southeast-1.amazonaws.com/testcandidate/coin/btc.png", 
	// 	"ticker": "BTC", 
	// 	"amount": "0.005"
	// }

	const labelAmount = parseFloat(amount).toFixed(8)

	return (
		<View style={{ height: 50, flexDirection: 'row', alignItems: 'center' }}>
			<View style={{ width: Metrics.SAFE_AREA }}>
				<Image source={{ uri: image }} resizeMode="contain" style={{ height: 16, width: 16 }} />
			</View>
			<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
				<Text style={{ fontFamily: Fonts.CIRCULAR_STD_BOOK, color: Colors.WHITE }}>{ticker}</Text>
				<Text style={{ fontFamily: Fonts.CIRCULAR_STD_BOOK, color: Colors.WHITE }}>{labelAmount}</Text>
			</View>
		</View>
	)
}

const ListScreen = (props) => {
	const [searchKeyword, setSearchKeyword] = useState('')
	const [coinList, setCoinList] = useState([])
	const [tempCoinList, setTempCoinList] = useState([])

	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		getData()
	}, [])

	useEffect(() => {
		setSearchKeyword("")
		setTempCoinList(coinList)
	}, [coinList])

	useEffect(() => {
		const newTempList = coinList.filter(e => String(e.ticker).toUpperCase().includes(searchKeyword.toUpperCase()))
		setTempCoinList(newTempList)
	}, [coinList, searchKeyword])

	const getData = () => {
		setCoinList([])
		modelData.list(res => {
			const { statusCode, result } = res
			const { status, data } = result

			switch (statusCode) {
				case 200:
					// {
					// 	"image": "https://honest-mining.s3-ap-southeast-1.amazonaws.com/testcandidate/coin/btc.png", 
					// 	"ticker": "BTC", 
					// 	"amount": "0.005"
					// }
					if (status == "ok") {
						setCoinList(data)
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
	}

	return (
		<View style={GlobalStyle.container}>
			<View style={GlobalStyle.containerBackground}>
				<View style={styles.searchBoxContainer}>
					<TouchableOpacity style={styles.backButtonContainer}>
						<Image source={Icons.CHEVRON_LEFT} resizeMode="contain" style={{ height: 32 }} />
					</TouchableOpacity>
					<View style={styles.searchTextBoxContainer}>
						<View style={styles.searchIconContainer}>
							<Image source={Icons.SEARCH} resizeMode="contain" style={{ height: 14, width: 14 }} />
						</View>
						<TextInput
							style={styles.searchTextInput}
							placeholder="Search"
							placeholderTextColor={Colors.GRAY}
							onChangeText={setSearchKeyword}
							value={searchKeyword}
							autoCapitalize={'characters'}
						/>
					</View>
				</View>
				<View style={{ flex: 1 }}>
					<FlatList
						refreshControl={(
							<RefreshControl
								refreshing={isLoading}
								onRefresh={getData}
							/>
						)}
						data={tempCoinList}
						extraData={tempCoinList}
						keyExtractor={({ ticker }) => ticker}
						contentContainerStyle={{ paddingHorizontal: Metrics.SAFE_AREA }}
						renderItem={({ item, index }) => <ItemListScreen item={item} />}
						ItemSeparatorComponent={() => (
							<View style={styles.itemSeparatorContainer} />
						)}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	searchBoxContainer: {
		height: 64,
		width: '100%',
		flexDirection: 'row',
		paddingLeft: 8,
		paddingRight: Metrics.SAFE_AREA,
		paddingVertical: 16,
		backgroundColor: Colors.BLACK,
		zIndex: 1
	},
	backButtonContainer: {
		height: '100%',
		width: 32,
		marginRight: 8,
		justifyContent: 'center',
		alignItems: 'center'
	},
	searchTextBoxContainer: {
		flex: 1,
		borderRadius: 8,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.BACKGROUND_INPUT
	},
	searchIconContainer: {
		height: '100%',
		aspectRatio: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	searchTextInput: {
		flex: 1,
		paddingVertical: 0,
		paddingLeft: 0,
		fontFamily: Fonts.CIRCULAR_STD_BOOK,
		color: Colors.WHITE
	},
	imageLogo: {
		height: 150,
		width: 200,
		resizeMode: 'contain'
	},
	itemSeparatorContainer: {
		height: 1,
		width: '100%',
		backgroundColor: Colors.WHITE,
		opacity: 0.15
	}
});

export default ListScreen