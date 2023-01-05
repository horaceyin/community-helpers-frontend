import { View, Text, Image, TextInput } from 'react-native';
import { SHADOWS, COLORS, SIZES, assets, FONTS } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { IconButton } from './Button';

const HomeHeader = ({ onSearch, ...props }) => {
  const navigation = useNavigation()

  return (
    <View style={{backgroundColor: COLORS.primary, padding: SIZES.font}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Image source={assets.myLogo} resizeMode='contain' style={{width: 90, height: 25}} />

        <IconButton iconSource={assets.person04} goToLogin={() => navigation.navigate('Login', props)} />
      </View>

      <View style={{marginVertical: SIZES.font}}>
        <Text style={{fontFamily: FONTS.regular, fontSize: SIZES.small, color: COLORS.white}}>
          Hello, Horace
        </Text>
        <Text style={{fontFamily: FONTS.bold, fontSize: SIZES.large, color: COLORS.white, marginTop: SIZES.base / 2}}>
          Mission:
        </Text>
      </View>

      <View style={{marginTop: SIZES.font}}>
        <View style={{
          width: '100%',
          backgroundColor: COLORS.gray,
          flexDirection: 'row',
          borderRadius: SIZES.font,
          alignItems: 'center',
          paddingHorizontal: SIZES.font,
          paddingVertical: SIZES.small - 2
        }}>
          <Image 
            source={assets.search} 
            resizeMode='contain' 
            style={{width: 20, height: 20, marginRight: SIZES.base}} />

          <TextInput placeholder='Search jobs' style={{flex: 1}} onChange={onSearch} />
        </View>
      </View>
    </View>
  )
}

export default HomeHeader