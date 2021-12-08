import React from 'react'
import { View, TouchableNativeFeedback, TouchableOpacity, Text, ActivityIndicator, Platform } from 'react-native'

import { Colors, Fonts } from '../configs/GlobalConfig'

const CustomButtom = (props) => {
    const {
        label,
        color,
        onPress = null,
        isLoading = false
    } = props

    return (
        <View style={{
            width: '100%',
            height: 50,
            borderRadius: 8,
            backgroundColor: color,
            overflow: 'hidden'
        }}>
            <TouchableNativeFeedback
                onPress={onPress}
                disabled={isLoading}
                background={Platform.Version >= 21 ?
                    TouchableNativeFeedback.Ripple(Colors.BLUE, false) :
                    TouchableNativeFeedback.SelectableBackground()}>
                <View
                    style={[{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }, isLoading && { backgroundColor: Colors.GRAY }]}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color={Colors.WHITE} />
                    ) : (
                        <Text style={{ fontFamily: Fonts.CIRCULAR_STD_BOOK, color: Colors.WHITE }}>{label}</Text>
                    )}
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

export default CustomButtom
