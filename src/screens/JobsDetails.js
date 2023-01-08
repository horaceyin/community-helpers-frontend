import { View, Text, SafeAreaView, Image, StatusBar, FlatList } from 'react-native'
import React, {useState, useContext} from 'react'
import { COLORS, SIZES, SHADOWS, FONTS, assets } from '../../constants'
import { CircleButton, SubInfo, FocusedStatusBar, RectButton, DetailsCategories, DetailsDesc } from '../components/'
import { useMutation } from "@apollo/client";
import { AppContext } from '../../AppContext'
import { UPDATE_HELP_REQUEST } from '../gql/Mutation';


const DetailsHeader = ({data, navigation}) => (

  <View style={{width: '100%', height: 250}}>
    <Image source={data.image} resizeMode='cover' style={{width: '100%', height: '100%'}} />
    <CircleButton 
      imgUrl={assets.leftArrow}
      handlePress={() => navigation.goBack()}
      left={15}
      top={StatusBar.currentHeight + 10}
    />

    <CircleButton 
      imgUrl={assets.check}
      handlePress={() => {}}
      right={15}
      top={StatusBar.currentHeight + 10}
    />
  </View>
)

const JobsDetails = ({ route, navigation }) => {
  const {isLogin, userToken, setIsFetching } = useContext(AppContext)
  const [updateRequest, { data: updatedRequest, loading, error }] = useMutation(UPDATE_HELP_REQUEST);
  const data = route.params.data
  //console.log(data)

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <FocusedStatusBar barStyle='dark-content' backgroundColor='transparent' />
      <View style={{
        position: 'absolute', 
        width: '100%', 
        bottom: 0, 
        paddingVertical: SIZES.font, 
        justifyContent: 'center', 
        alignItems: 'center' ,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        zIndex: 1
      }}>
        { (isLogin && userToken) &&
        <RectButton 
          buttonText={'Accept'} 
          minWidth={170} 
          fontSize={SIZES.large} {...SHADOWS.dark}
          handlePress={() => updateRequest({
            variables: { updateHelpRequestMatchingInput: {id: data.id,  state: "ongoing"} }
          }).then((data) => {
            setIsFetching(true)
            navigation.replace('Root')
          })}
        />}
      </View>

      <FlatList
        data={data.categories}
        renderItem={({ item }) => <DetailsCategories category={item} />}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: SIZES.font * 3}}
        ListHeaderComponent={() => (
          <>
            <DetailsHeader data={data} navigation={navigation} />
            <SubInfo jobsDate={data.jobsDate} jobsTime={data.jobsTime}/>
            <View style={{padding: SIZES.font}}>
              <DetailsDesc data={data} />
              <Text style={{fontFamily: FONTS.semiBold, fontSize: SIZES.font, color: COLORS.primary}}>Categories</Text>
            </View>
          </>
        )}
      />
    </View>
  )
}

export default JobsDetails