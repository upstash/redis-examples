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
  SafeAreaView,
  useSafeAreaFrame} from 'react-native-safe-area-context';
import { NavigationContainer, navigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EncryptedStorage from 'react-native-encrypted-storage';
import {navigationRef} from './RootNavigation';

class Appp extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  async componentDidMount() {
    var version = await EncryptedStorage.getItem('announcement_version');
    if(version == null){
      version = "-1";
    }
    version = parseInt(version);
    console.log(version)
    await fetch('https://us1-sharing-dassie-35422.upstash.io/zrangebyscore/Announcements/+inf/' + version + "/WITHSCORES/LIMIT/0/1", {
        method: 'GET',
        headers: {
          Authorization: "Bearer AopeACQgZGQwNDA5ODktMmEzYy00NmM5LTg4MTQtM2U4NTQ5OTMxZTEySVgyTr4DQTX0HnyHo-YWG1xRXdr64-EngpCYIHhanJY=",
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        var announcement = data["result"];
        if(announcement && announcement.length > 0){
          version = parseInt(announcement[1]) + 1;
          var message = announcement[0];
          EncryptedStorage.setItem('announcement_version', version.toString());
          Alert.alert("You have new message!", message);
        }
        console.log(data);
      })
      .catch(err => {
        console.error(err)
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
                title: "Announcements",
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
          </Stack.Navigator>
        </NavigationContainer>
  );
}

export default App;
