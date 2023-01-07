import React, { useEffect } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { SHADOWS, COLORS, SIZES, FONTS } from '../../constants';

const MyJobCard = ({data}) => {
    //const [jobState, setJobState] = useState()
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
                }}>{`${data.helpRequest.helpSeeker.username} Date: yy/mm/dd`}</Text>

                {/* <Text style={{
                    fontFamily: FONTS.regular, 
                    fontSize: SIZES.medium, 
                    color: COLORS.primary
                }}>{""}</Text> */}

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

// define your styles
const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        margin: SIZES.base,
        marginBottom: SIZES.extraLarge,
        ...SHADOWS.dark
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

//make this component available to the app
export default MyJobCard;
