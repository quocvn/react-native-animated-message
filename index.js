import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Animated,
  Easing,
  Dimensions
} from 'react-native';

import styles from './styles'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class Message extends Component {

  static propTypes = {
      messageStyle: View.propTypes.style,
      textStyle: Text.propTypes.style,
      position: PropTypes.oneOf([
          'top',
          'center',
          'bottom',
      ]),
      animation: PropTypes.oneOf(['zoom', 'slideX', 'slideY']),
      messageHeight: PropTypes.number
  }
  static defaultProps = {
      position: 'top',
      animation: 'slideX',
      messageHeight: 60,
      textStyle: {},
      messageStyle: {}
  }

  constructor(props) {
    super(props)
    this.slideXValue = new Animated.Value(- deviceWidth);
    this.slideYValue = new Animated.Value(0)
    this.zoomValue = new Animated.Value(0);
    this.state = {
      message: 'This is a message!',
      visible: false,
      animationStyle: {}
    }
  }

  startAnimation(){
    const { animation } = this.props;
    const animatedValue = animation == 'slideX' ? this.slideXValue : animation == 'slideY' ? this.slideYValue : this.zoomValue;
    const value = animation == 'slideX' ? (-deviceWidth) : 0;
    const toValue = animation == 'slideX' ? 0 : 1;
    const easing = animation == 'slideX' ? Easing.elastic(0.8) : Easing.bounce;

    animatedValue.setValue(value);
    Animated.timing(animatedValue, {
       toValue: toValue,
       duration: 700,
       easing: easing
     }).start(this.closeMessage())
  }

  showMessage(message, duration){
    this.setState({message})
    this.duration = duration || 1500;
    const {animation} = this.props;
    animation == 'zoom' ? this.zoom() : animation == 'slideX' ? this.slideX() : this.slideY()
  }

  zoom = () => {
    this.setState({ animationStyle: {
      opacity: this.zoomValue.interpolate({
        inputRange: [0, 0.4, 1],
        outputRange: [0, 1, 1],
      }),
      transform: [{
        scale: this.zoomValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.3, 1],
        })
      }]
    }, visible: true}, () => {
      this.startAnimation();
    });
  }

  slideX = () => {
    this.setState({ animationStyle: {
      transform: [{ translateX: this.slideXValue }]
    }, visible: true}, () => {
      this.startAnimation();
    });
  }

  slideY = () => {
    this.setState({ animationStyle: {
      transform: [{
        translateY: this.slideYValue.interpolate({
         inputRange: [0, 0.3, 1],
         outputRange: this.props.position == 'bottom' ? [70, -5, 0] : [-70, 5, 0]
       })
     }]
    }, visible: true}, () => {
      this.startAnimation();
    });
  }

  closeMessage() {
    const {animation} = this.props;
    this.timer = setTimeout(() => {
      Animated.timing(
      animation == 'zoom' ? this.zoomValue : animation == 'slideX' ? this.slideXValue : this.slideYValue,
      {
        toValue: animation == 'slideX' ? deviceWidth : 0,
        duration: 550
      }).start(() => {
        this.setState({visible: false})
      })
    }, this.duration)
  }

  componentWillUnmount() {
      this.timer && clearTimeout(this.timer);
  }

  getPosition(){
    let position;
    switch (this.props.position) {
      case "top":
        position = {top: 0};
        break;

      case "center":
        position = {bottom: deviceHeight/2 - this.props.messageHeight/2};
        break;

      case "bottom":
        position = {bottom: 0};
        break;
    }
    return position;
  }

  render() {
    return (
      this.state.visible ?
      <View
        pointerEvents = "none"
        style={[this.getPosition(), styles.container]} >

        <Animated.View style={[this.state.animationStyle, styles.animatedView, this.props.messageStyle, {height: this.props.messageHeight}]}>
          <Text style={[styles.textStyle, this.props.textStyle]}>{this.state.message}</Text>
        </Animated.View>
      </View> : null
    );
  }
}
