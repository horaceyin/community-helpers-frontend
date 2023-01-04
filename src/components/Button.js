import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SHADOWS, SIZES } from '../../constants'

export const CircleButton = ({imgUrl, ...props}) => {
  return (
    <TouchableOpacity style={[styles.circleButtonContainer, {...props}]}>
      <Image 
        source={imgUrl}
        resizeMode='contain'
        style={styles.buttonImg}
      />
    </TouchableOpacity>
  )
}

export const DetailsButton = ({minWidth, fontSize, handlePress, ...props}) => {
  return (
    <TouchableOpacity
      style={[styles.detailsButtonContainer, {minWidth: minWidth, ...props}]}
      onPress={handlePress}
    >
      <Text
        style={[styles.detailsButtonText, {fontSize: fontSize}]}
      >Details</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: SIZES.extraLarge,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    ...SHADOWS.light
  },
  buttonImg: {
    width: 24,
    height: 24,
    tintColor: COLORS.gray
  },
  detailsButtonContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.extraLarge,
    padding: SIZES.small
  },
  detailsButtonText: {
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
    textAlign: 'center'
  }
})