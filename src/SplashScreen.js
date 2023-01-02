import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = (props) => {
  const [appsLoaded, setAppsLoaded] = useState(false)
  const [animationLoaded, setAnimationLoaded] = useState(false)

  useEffect(() => {
    setTimeout(()=>{
      setAppsLoaded(true)
    }, 3000)
  }, [])

  useEffect(() => {
    if(appsLoaded && animationLoaded){
      props.navigation.replace('Root')
    }
  }, [appsLoaded, animationLoaded, props.navigation])

  const onAnimationFinish = () => setAnimationLoaded(true)

  // can replace other splash logo with 56791-splash-logo.json
  return (
    <View style={styles.root}>
      <LottieView source={require('../assets/56791-splash-logo.json')} 
        autoPlay 
        loop={false} 
        onAnimationFinish={onAnimationFinish} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default SplashScreen