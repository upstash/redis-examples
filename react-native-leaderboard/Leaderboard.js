import React, {Component} from 'react';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
  SafeAreaView,
} from 'react-native-safe-area-context';
import {
  Image,
  FlatList,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  StatusBar,
  Easing,
  Button,
  Animated,
  Platform,
  ScrollView,
} from 'react-native';
import PlayerItem from './PlayerItem';

var userlist = [];
export default class LeaderboardScreen extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      reRender: 'o',
    };
  }
  async componentDidMount() {
    await fetch('https://f571j8y8s1.execute-api.us-east-1.amazonaws.com/getLeaderboard',{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        userlist = data.leaderboard;
        this.setState({reRender: !this.state.reRender});
    })
    .catch(err => console.error(err));
  }

  renderPlayerItems(){
    var items = [];
    var boardSize = userlist.length;
    for (let i = 0; i < boardSize; i++) {
      const temp = i;
      items.push(
        <PlayerItem
          rank={temp}
          user={userlist[temp][0]}
          score={userlist[temp][1]}
          key={temp}
          noBottomBorder={true}
        />,
      );
    }
    return items;
  }

  render() {
    const {navigate} = this.props.navigation;
    this.height = Math.round(Dimensions.get('screen').height);
    this.width = Math.round(Dimensions.get('screen').width);
    return (
      <SafeAreaView
        style={{
          width: this.width,
          height: this.height,
          flex: 1,
          alignItems: 'center'
        }}>
        <StatusBar
        backgroundColor="#f4511e"/>
        <View
        style={{
          height:this.height,
          width: this.width
        }}>
        <FlatList
          style={{
            flex: 1,
            flexDirection: 'column',
          }}
          renderItem={() => this.renderPlayerItems()}
          data={[{bos: 'boş', key: 'key'}]}
          refreshing={true}></FlatList>
        </View>
      </SafeAreaView>
    );
  }
}
