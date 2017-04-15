import { StyleSheet, Dimensions } from 'react-native';
const deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0
  },
  animatedView: {
    backgroundColor: 'green',
    width: deviceWidth,
    justifyContent: 'center'
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
