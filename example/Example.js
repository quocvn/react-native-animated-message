import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Picker
} from 'react-native';

import Message from 'react-native-animated-message';

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 'top',
      animation: 'slideX'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Top"
          onPress={()=> {
            this.setState({
              position: 'top'
            }, ()=> { this.message.showMessage('This is a message - top', 1000) })
          }} />

        <Button title="Center"
          onPress={()=> {
            this.setState({
              position: 'center'
            }, ()=> { this.message.showMessage('This is a message - center', 1000) })
          }} />

        <Button title="Bottom"
          onPress={()=> {
            this.setState({
              position: 'bottom'
            }, ()=> { this.message.showMessage('This is a message - bottom', 1000) })
          }} />

        <View style={styles.viewAnimation}>
          <Text style={styles.textAnimationType}>Animation type: </Text>
            <Picker
              style={styles.picker}
              selectedValue={this.state.animation}
              onValueChange={(value) => this.setState({animation: value})}>
              <Picker.Item label="Slide X" value="slideX" />
              <Picker.Item label="Slide Y" value="slideY" />
              <Picker.Item label="Zoom" value="zoom" />
            </Picker>
        </View>

        <Message
          ref={(message) => this.message = message }
          animation={this.state.animation}
          position={this.state.position} >
        </Message>
      </View>
    );
  }
}

class Button extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={this.props.onPress}>
        <Text style={styles.textButton}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCFFFF',
  },
  button: {
    padding: 10,
    width: 100,
    height: 45,
    marginBottom: 5,
    backgroundColor: 'blue',
    borderRadius: 8,
    justifyContent: 'center'
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  textAnimationType: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 5
  },
  viewAnimation: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  picker: {
    width: 160,
    marginLeft: 10
  }
});
