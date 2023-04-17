import {React, useState}from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { SHADOWS, COLORS, SIZES, FONTS } from '../../constants';
const MyRequestCard = ({data}) => {
    const [text, setText] = useState(data.description.slice(0, 50))

    let d = new Date(data.helpRequestDatetime).toDateString()
    const date = d.split(" ")
    var title = data.title;
    if (title.length > 25) {
        title = title.slice(0, 24);
        title += " ...";
    }
    var state = null;
    var stateStyles = null;
    if (data.takenHelpRequst == null) {
        state = "Pending"
        stateStyles = styles.jobStatusPending;
    }
    else {
        isTakenHelpRequst = data.takenHelpRequst.filter(thr => thr.is_taken === true)
        if (isTakenHelpRequst.length <= 0) {
            state = "Pending"
            stateStyles = styles.jobStatusPending;
        }
        else {
            state = isTakenHelpRequst[0].state === "ongoing" ? "Ongoing" : "Completed";
            stateStyles = isTakenHelpRequst[0].state === "ongoing" ? styles.jobStatusOngoing : state = styles.jobStatusDone;
        }
    }
    return (
        <View style={styles.cardContainer}>
            <View style={styles.card}>
                <View style={{flexDirection: 'row'}}>
                    
                    <Text style={{
                        fontFamily: FONTS.semiBold, 
                        fontSize: SIZES.extraLarge - 3, 
                        color: COLORS.primary,
                        width: "75%",
                    }}>
                    {title}
                    </Text>
 
                    <View style={[styles.jobStatus, stateStyles]}>
                        <Text style={{color: COLORS.white}}>
                            {state}
                        </Text>
                    </View>
                </View>

                <Text style={{
                    fontFamily: FONTS.regular, 
                    fontSize: SIZES.medium, 
                    color: COLORS.primary
                }}>{`Date: ${date[3]}/${date[1]}/${date[2]}`}</Text>

                <Text style={{
                    fontFamily: FONTS.medium,
                    fontSize: SIZES.small,
                    color: COLORS.primary,
                    marginVertical: SIZES.base,
                    maxWidth: '70%'
                }}>
                    {text + " ..."}
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
        height: 130,
        padding: SIZES.font
      },
    jobStatus: {
        borderRadius: SIZES.extraLarge,
        padding: SIZES.small,
        alignItems: 'center',
        width: "25%"
    },
    jobStatusPending: {
        backgroundColor: COLORS.pending
    },
    jobStatusOngoing: {
        backgroundColor: COLORS.ongoing
    },
    jobStatusDone: {
        backgroundColor: COLORS.done
    }
});

export default MyRequestCard;
