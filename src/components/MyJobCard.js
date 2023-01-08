import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { SHADOWS, COLORS, SIZES, FONTS } from '../../constants';

const MyJobCard = ({data}) => {

    let d = new Date(data.helpRequest.helpRequestDatetime).toDateString()
    const date = d.split(" ")
    return (
        <View style={styles.cardContainer}>
            <View style={styles.card}>
                <View style={{flexDirection: 'row'}}>
                    
                    <Text style={{
                        fontFamily: FONTS.semiBold, 
                        fontSize: SIZES.extraLarge, 
                        color: COLORS.primary,
                        width: "79%",
                    }}>
                    {data.helpRequest.title}
                    </Text>
 
                    <View style={[styles.jobStatus, data.state == "ongoing" ? styles.jobStatusOngoing : styles.jobStatusDone]}>
                        <Text style={{color: COLORS.white}}>
                            {data.state}
                        </Text>
                    </View>
                </View>

                <Text style={{
                    fontFamily: FONTS.regular, 
                    fontSize: SIZES.medium, 
                    color: COLORS.primary
                }}>{`${data.helpRequest.helpSeeker.username}          Date: ${date[3]}/${date[1]}/${date[2]}`}</Text>

                <Text style={{
                    fontFamily: FONTS.medium,
                    fontSize: SIZES.small,
                    color: COLORS.primary,
                    marginVertical: SIZES.base,
                    maxWidth: '70%'
                }}>
                    {data.helpRequest.description}
                </Text>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        margin: SIZES.base,
        ...SHADOWS.medium
      },
    card: {
        width: '100%',
        height: 150,
        padding: SIZES.font
      },
    jobStatus: {
        borderRadius: SIZES.extraLarge,
        padding: SIZES.small,
        alignItems: 'center',
        width: "21%"
    },
    jobStatusOngoing: {
        backgroundColor: COLORS.ongoing
    },
    jobStatusDone: {
        backgroundColor: COLORS.done
    }
});

export default MyJobCard;
