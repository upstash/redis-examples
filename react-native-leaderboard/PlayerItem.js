import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Platform,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';

export default class PlayerItem extends Component {
  static propTypes = {
    rank: PropTypes.number,
    user: PropTypes.string,
    score: PropTypes.number,
    noBottomBorder: PropTypes.bool
  };
  static defaultProps = {
    noBottomBorder: false,
  };
  render() {
    this.height = Math.round(Dimensions.get('screen').height);
    this.width = Math.round(Dimensions.get('screen').width);
    return (
      <View
        activeOpacity={1}
        style={{
          borderColor: "purple",
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'center',
          width: this.width,
          height: this.width / 8,
        }}
        onPress={this.props.onPress}>
        <View
          style={{
            justifyContent: 'center',
            position: 'absolute',
            width: (this.width * 5) / 8,
            height: this.width / 8,
            bottom: 0,
            left: 0,
          }}>
          <Text
            style={{
              color: 'rgba(88,88,88,1)',
              fontSize: (15 * this.width) / 360,
              left: this.width / 20,
              position: 'absolute',
              fontWeight: '300'
            }}>
            {this.props.user}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            position: 'absolute',
            width: (this.width * 5) / 8,
            height: this.width / 8,
            bottom: 0,
            left: 0,
          }}>
          <Text
            style={{
              color: 'rgba(88,88,88,1)',
              fontSize: (15 * this.width) / 360,
              left: this.width / 20,
              position: 'absolute',
              fontWeight: '300'
            }}>
            {this.props.user}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            position: 'absolute',
            width: (this.width * 3) / 8,
            height: this.width / 8,
            bottom: 0,
            right: 0,
          }}>
          <Text
            style={{
              color: 'rgba(88,88,88,1)',
              fontSize: (12 * this.width) / 360,
              left: this.width / 20,
              position: 'absolute',
              fontWeight:'900'
            }}>
            {this.props.score}
          </Text>
        </View>
      </View>
    );
  }
}

export * from './PlayerItem';
