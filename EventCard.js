import React, {Component} from 'react';
import { Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { formatDate, getCountdownParts } from "./api";


const style = StyleSheet.create({
card:{
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
    paddingTop: 10,
    paddingBottom: 20,
    margin: 10,
    marginTop: 5,
    marginBottom: 5
},
cardHeader:{
    flex: 1,
    flexDirection: 'row'
},
date:{
    fontWeight: '200',
    fontSize: 15,
    color: '#bdbdbd',
    width: '30%',
    textAlign: 'right'
},
title:{
    fontSize: 15,
    fontWeight: '300',
    marginLeft: 7,
    textAlign: 'left'
},
counterContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '5%',
    paddingRight: '5%'
},
counter:{
    width: '25%',
    flex: 1
},
counterText:{
    fontSize: 40,
    textAlign: 'center'
},
counterLabel:{
    fontSize: 13,
    fontWeight: '100',
    color: '#a3a3a3',
    textAlign: 'center',
    paddingTop: 0
}
})

export default function EventCard({ event }) {

    const{
        days,
        hours,
        minutes,
        seconds
    } = getCountdownParts(event.date);

 return(
     <View style={style.card}>
     <View style={style.cardHeader}> 
     <Text style={style.date}>{formatDate(event.date)}</Text>
     <Text style={style.title}>{event.title}</Text>
     </View>
     <View style={style.counterContainer}>
     <View style={style.counter}>
     
     <Text style={style.counterText}>{days} </Text>
     <Text style={style.counterLabel}>DAYS</Text>
     
     </View>
     <View style={style.counter}>
     
     <Text style={style.counterText}>{hours} </Text>
     <Text style={style.counterLabel}>HOURS</Text>
     
     </View>

     <View style={style.counter}>
     
     <Text style={style.counterText}>{minutes} </Text>
     <Text style={style.counterLabel}>MINUTES</Text>
     
     </View>

     <View style={style.counter}>
     
     <Text style={style.counterText}>{seconds} </Text>
     <Text style={style.counterLabel}>SECONDS</Text>
     
     </View>


     </View>
     </View>
 )
}

EventCard.propTypes = {
    event: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date)
    })
}