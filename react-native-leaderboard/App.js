import React from 'react';
import {
  StyleSheet,
  Animated,
  ScrollView,
  ImageBackground,
  View,
  Dimensions,
  TouchableHighlight,
  Text,
  Alert,
  TextInput,
  StatusBar,
  Button,
  Platform,
  NativeModules,
  TouchableOpacity,
  Image,} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
  SafeAreaView,useSafeAreaFrame} from 'react-native-safe-area-context';
import { NavigationContainer, navigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {navigationRef} from './RootNavigation';
import LeaderboardScreen from './Leaderboard';

  class Appp extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        authenticated: false,
        firstname: "",
        lastname: "",
        score: null
      };
    }

    async componentDidMount() {

    }

    async addScore(){
      if(isNaN(this.state.score)){
        Alert.alert("Error", "Please enter a valid score.");
        return;
      }
      if(this.state.firstname == "" || this.state.lastname == "" || this.state.score == null){
        Alert.alert("Error", "Please fill in the blanks.");
        return;
      }
      await fetch('https://f571j8y8s1.execute-api.us-east-1.amazonaws.com/add', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          score: parseInt(this.state.score)
        }),
      })
      .then(response => response.json())
      .then(data => {
          if(data.message == "Score added successfully!"){
            Alert.alert("Done!", "Score added successfully!");
          }
          else{
            Alert.alert("Error", "Please try again later.");
          }
      })
      .catch(err => {
        console.error(err)
        Alert.alert("Error", "Please try again later.");
      });
    }
  render(){
    this.height = Math.round(Dimensions.get('screen').height);
    this.width = Math.round(Dimensions.get('screen').width);
    return (
      <SafeAreaView style={{
        width: this.width,
        height: this.height,
        flex: 1,
        alignItems: 'center'}}>
        <StatusBar
        backgroundColor="#f4511e"/>
        <View style={{height: this.height/8}} />
        <View
          style={{
            flex:1,
            width: this.width,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flex:1,
              width: this.width,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextInput
              spellCheck={false}
              autoCorrect={false}
              placeholderTextColor="rgba(0,0,0,0.4)"
              placeholder={"First name"}
              style={{
                width: this.width*7/10,
                borderColor: 'purple',
                borderWidth: 1,
                borderRadius: 8
              }}
              onChangeText={(text) =>
                this.setState({firstname: text})
              }></TextInput>
          </View>
          <View
            style={{
              flex:1,
              width: this.width,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextInput
              spellCheck={false}
              autoCorrect={false}
              placeholderTextColor="rgba(0,0,0,0.4)"
              placeholder={"Last name"}
              style={{
                width: this.width*7/10,
                borderColor: 'purple',
                borderWidth: 1,
                borderRadius: 8
              }}
              onChangeText={(text) =>
                this.setState({lastname: text})
              }></TextInput>
          </View>
          <View
            style={{
              flex:1,
              width: this.width,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextInput
              spellCheck={false}
              autoCorrect={false}
              placeholderTextColor="rgba(0,0,0,0.4)"
              placeholder={"Score"}
              style={{
                width: this.width*7/10,
                borderColor: 'purple',
                borderWidth: 1,
                borderRadius: 8
              }}
              onChangeText={(text) =>
                this.setState({score: text})
              }></TextInput>
          </View>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableHighlight
            style={{backgroundColor: "green", alignItems: 'center', borderColor: "green",
            borderRadius: 8, borderWidth: 1, paddingVertical: 10, paddingHorizontal: 20}}
            onPress={() =>{this.addScore()}}>
            <Text style={{color:"white"}}>Submit Score</Text>
          </TouchableHighlight>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableHighlight
            style={{backgroundColor: "#2196F3", alignItems: 'center', borderColor: "#2196F3",
            borderRadius: 8, borderWidth: 1, paddingVertical: 10, paddingHorizontal: 20}}
            onPress={() =>{this.props.navigation.navigate('Leaderboard')}}>
            <Text style={{color:"white"}}>Go to Leaderboard</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  };
};

const Stack = createStackNavigator();

const config = {
  animation: 'timing',
  config: {
    duration: 0,
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const config2 = {
  animation: 'spring',
  config: {
    duration: 1000,
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function App({navigation}) {
  return (
        <NavigationContainer  ref={navigationRef}>
          <Stack.Navigator>
            <Stack.Screen
              options={{
                gestureEnabled: false,
                title: "Submit Score",
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                transitionSpec: {
                  open: config2,
                  close: config2,
                },
              }}
              name="Appp"
              component={Appp}
            />

            <Stack.Screen
              options={{
                gestureEnabled: false,
                title: "Leaderboard",
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                transitionSpec: {
                  open: config,
                  close: config,
                },
              }}
              name="Leaderboard"
              component={LeaderboardScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
  );
}

export default App;
