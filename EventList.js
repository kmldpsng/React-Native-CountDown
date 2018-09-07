import React, { Component } from "react";
import { FlatList, Text, StyleSheet, Vibration, AsyncStorage, TouchableHighlight } from "react-native";
import ActionButton from 'react-native-action-button'
import EventCard from "./EventCard";
import AlertEvent from './AlertEvent'

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
        setTimeout(() => {
            Vibration.cancel();
        }, 0)
        setInterval(() => {
            this.setState({
                events: this.state.events.map((evt) => ({
                    ...evt,
                    timer: Date.now()
                }))
            })
            this.state.events.some((element, index, arr) => {
                console.log('I have det diff')
                
                let diff = (new Date(element.date).getTime() - new Date().getTime())/1000;
                console.log(diff);
                if (0 <= diff && diff <= 60) {
                    this.setState({ alertEvent: element })
                    this.props.navigation.navigate("alert", { event: JSON.stringify(this.state.alertEvent)})
                    
                }
            })
        }, 1000)

        this.props.navigation.addListener('didFocus', () => {
            Promise.all(AsyncStorage.getAllKeys().then((keys) => {
                AsyncStorage.multiGet(keys).then((values) => {
                    let events = []
                    let removeCount = 0;
                    values.forEach(item => {
                        item[1] = JSON.parse(item[1]);
                        item[1].date = new Date(item[1].date)
                        events.push(item[1])
                    })
                    console.log('my events are')
                    console.log(events);
                    this.setState({ events })
                })
                // 
            }))
        })

        // const events = require('./db.json').events.map(e => ({
        //     ...e,
        //     date: new Date(e.date)
        // }));

    }
    handleTouchPress = (id) => {
        console.log('I got event')
        console.log(id);
        this.props.navigation.navigate("detail", { id: id })
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
                        ({ item }) => <TouchableHighlight
                            onPress={() => this.handleTouchPress(item.id)} >
                            <EventCard event={item} />
                        </TouchableHighlight>
                    }
                    keyExtractor={item => item.title}
                />
            
            ,
            <ActionButton
                key="fab"
                onPress={this.handleAddEvent}
                buttonColor="rgba(231, 76, 60, 1)"
            />
        ]
    }

}
export default Eventlist;