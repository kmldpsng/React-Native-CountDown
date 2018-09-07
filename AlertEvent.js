import React, { Component } from "react";
import { Text, View, TouchableHighlight, Vibration, TextInput, StyleSheet, AsyncStorage } from "react-native";

const styles =  StyleSheet.create({
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 18
    }
})

export default class AlertEvent extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: ''
        }
    }
    componentDidMount(){
        const { navigation } = this.props;
        const DURATION = 10000
        const PATTERN = [1000, 2000, 3000]

        //Vibration.vibrate(DURATION)
        // Android: vibrate for 10s
        // iOS: duration is not configurable, vibrate for fixed time (about 500ms)

        Vibration.vibrate(PATTERN, true)
        this.state.title = JSON.parse(navigation.getParam('event', 'default')).title;
    }
    componentWillReceiveProps(nextProps) {
        //this.setState({ title: nextProps.eventDetail.title})
    }
    handleSnoozePress = () =>{
        Vibration.cancel();
        this.props.navigation.goBack();
    }
    render(){
        return(
        <View style={{
            flex: 1
        }}>
        <Text> You have an event </Text>
        <Text>{this.state.title} </Text>
        <TouchableHighlight
                    onPress={this.handleSnoozePress}
                    style={styles.button}>
                    <Text style={styles.buttonText}>{"Snooze"}</Text>
                </TouchableHighlight>
        </View>
    )
    }
}