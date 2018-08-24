import React, { Component } from "react";
import { Text, View, TouchableHighlight, TextInput, StyleSheet, AsyncStorage } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { formatDate } from './api'
const styles = StyleSheet.create({
    fieldContainer: {
        margin: 20,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#fff'
    },
    text: {
        height: 60,
        margin: 0,
        marginRight: 7,
        paddingLeft: 10,
        fontSize: 30,
        fontWeight: '200',
        borderRadius: 5,
        marginTop: 5
    },
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
    },
    borderTop:{
        borderColor:'#edeeef',
        borderTopWidth: 0.5
    }
})

class EventForm extends Component {
    state = {
        title: null,
        date: ''
    };
    handleAddPress = () => {
        console.log(this.state)
        AsyncStorage.setItem(this.state.title, JSON.stringify(this.state)).then((err)=>{ 
            if(err){
                console.log(err)
            }
            
        this.props.navigation.goBack();
        })
    }
    handleChangeTitle = (value) => {
        this.setState({ title: value });
    }
    handleDatePress = () => {
        this.setState({ showDatePicker: true})
    }
    handleDatePickerHide = () => {
        this.setState({ showDatePicker: false})
    }
    handleDatePicked = (date) => {
        this.setState({
            date
        })
        this.handleDatePickerHide();
    }
    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <View style={styles.fieldContainer}>
                    <TextInput style={styles.text}
                        placeholder="Event Name"
                        spellCheck={false}
                        value={this.state.title}
                        onChangeText={this.handleChangeTitle}
                        underlineColorAndroid='rgba(0,0,0,0)'
                    />
                    <TextInput style={[styles.text, styles.borderTop]} 
                    placeholder="Event Date"
                    spellCheck={false}
                    editable={!this.state.showDatePicker}
                        value={formatDate(this.state.date.toString())}
                        onFocus={this.handleDatePress}
                        underlineColorAndroid='rgba(0,0,0,0)'
                    />
                    <DateTimePicker 
                    isVisible={this.state.showDatePicker}
                    mode="datetime"
                    onConfirm={this.handleDatePicked}
                    onCancel={this.handleDatePickerHide}
                    />
                </View>
                <TouchableHighlight
                    onPress={this.handleAddPress}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableHighlight>
            </View>
        )
    }
}
export default EventForm;