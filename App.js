import React from "react";
import { StatusBar } from "react-native";
import { createDrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { MenuProvider } from 'react-native-popup-menu';

//Components
import LoginScreen from './src/components/Login';
import HomeScreen from "./src/components/Home";
import LeadScreen from "./src/components/leads/LeadRoute";
import ClientScreen from "./src/components/clients/ClientRoute";
import JobScreen from "./src/components/jobs/JobRoute";

const App = createDrawerNavigator({

  Login: {
    screen: LoginScreen
  },
  
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: "Inicio",
      drawerIcon:({ tintColor }) => <Icon name="home" color={tintColor}/>,
    }
  },

  Lead: {
    screen: LeadScreen,
    navigationOptions: {
      drawerLabel: "Prospecto",
      drawerIcon: ({tintColor}) => <Icon name="accessibility" color={tintColor}/>
    }
  },

  Client: {
    screen: ClientScreen,
    navigationOptions: {
      drawerLabel: "Clientes",
      drawerIcon: ({tintColor}) => <Icon name="handshake-o" type="font-awesome" color={tintColor}/>
    }
  },
  Job: {
    screen: JobScreen,
    navigationOptions: {
      drawerLabel: "Trabajos",
      drawerIcon: ({tintColor}) => <Icon name="work" color={tintColor}/>
    }
  }

}, {
  initialRouteName: "Login",
  navigationOptions: {
    headerStyle:{
      backgroundColor: "red",
      marginTop: StatusBar.currentHeight
    }
  }
});

export default () => (
  <MenuProvider>
    <App />
  </MenuProvider>
)

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//         <Text>Changes you make will automatically reload.</Text>
//         <Text>Shake your phone to open the developer menu.</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
