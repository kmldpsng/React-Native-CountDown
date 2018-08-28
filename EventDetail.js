import React, { Component } from "react";
import { Text, View, TouchableHighlight, TextInput, StyleSheet, AsyncStorage } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { formatDate } from './api'
import EventCard from "./EventCard";
import EventForm from "./EventForm";

export default class EventDetail extends Component{
constructor(props){
    super(props);
    console.log('my pros');
    console.log(props)
}
state = {
    eventDetail: {}
}
componentDidMount(){
    const { navigation } = this.props;
    AsyncStorage.getItem(navigation.getParam('id', 'default'), (err, result) => {
        console.log(result);
        result = JSON.parse(result);
        result.date = new Date(result.date)
        this.setState({eventDetail: result})
        console.log('I seeted')
      });
}
    render(){
return(
   // []
 <EventForm  eventDetail={this.state.eventDetail} navigation={this.props.navigation}/>
)
}
}