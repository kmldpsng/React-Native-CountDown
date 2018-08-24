import React, { Component } from "react";
import { FlatList, Text, StyleSheet, Vibration, AsyncStorage } from "react-native"; 
import ActionButton from 'react-native-action-button'
import EventCard from "./EventCard";

const style = StyleSheet.create({
    list: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#f3f3f3'
    }
})

class Eventlist extends Component {
    state = {
        events: []
    }
    componentDidMount() {
        const DURATION = 10000
const PATTERN = [1000, 2000, 3000]

//Vibration.vibrate(DURATION)
// Android: vibrate for 10s
// iOS: duration is not configurable, vibrate for fixed time (about 500ms)

Vibration.vibrate(PATTERN, true)
// Android: wait 1s -> vibrate 2s -> wait 3s
// iOS: wait 1s -> vibrate -> wait 2s -> vibrate -> wait 3s -> vibrate
setTimeout(()=>{
    Vibration.cancel();
}, 0)
        setInterval(() => {
            this.setState({
                events: this.state.events.map((evt) => ({
                    ...evt,
                    timer: Date.now()
                }))
            })
        }, 1000)
        this.props.navigation.addListener('didFocus', ()=>{
            Promise.all(AsyncStorage.getAllKeys().then((keys)=>{
               AsyncStorage.multiGet(keys).then((values) => {
                   let events = []
values.forEach(item=>{
events.push(JSON.parse(item[1]))
})

this.setState({ events })
               })
                // 
            }))
        })
        
        const events = require('./db.json').events.map(e => ({
            ...e,
            date: new Date(e.date)
        }));
        
    }
    handleAddEvent = () => {
        console.log('I got called')

        this.props.navigation.navigate("form");
    }
    render() {
        return [
            <FlatList
            key="flatlist"
                style={style.list}
                data={this.state.events}
                renderItem={
                    ({ item }) => <TouchableHighlight>
                    onPress={this.handleTouchPress}
                    <EventCard event={item} />
                    </TouchableHighlight>
                }
                keyExtractor={item => item.id}
            />,
<ActionButton 
key="fab"
onPress={this.handleAddEvent}
buttonColor="rgba(231, 76, 60, 1)"
/>
        ]
    }

}
export default Eventlist;