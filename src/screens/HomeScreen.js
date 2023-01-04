import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import { COLORS, FakeData } from '../../constants';
import { HomeHeader, JobCard } from '../components';

const HomeScreen = () => {
  return (
    <View style={styles.viewContainer}>
      <View style={styles.flatListContainer}>
        <FlatList
          data={FakeData}
          renderItem={({item}) => <JobCard data={item}/>}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={ HomeHeader }
        />
      </View>

      <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex:-1}}>
        <View style={{ height: 300, backgroundColor: COLORS.primary}}/>
        <View style={{ flex: 1, backgroundColor: COLORS.white}}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: COLORS.white
    // justifyContent:'center',
    // alignItems:'center'
  },
  flatListContainer: {
    zIndex: 0,
  },
  text: {
    fontWeight: "bold",
    fontSize: 32,
    color: COLORS.body,
  }
});

export default HomeScreen