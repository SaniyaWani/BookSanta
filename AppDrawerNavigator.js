import React,{Component}from 'react';
import { View,Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView} from 'react-native';
    
import {createDrawerNavigator} from 'react-navigation-drawer';
import customSidebarMenu from './customSidebarMenu';
import {AppTabNavigator} from './AppTabNavigator';
import SettingScreen from '../Screens/SettingScreen';
import MyDonations from '../Screens/MyDonations';
import NotificationScreen from '../Screens/NotificationScreen';
import MyReceivedBook from '../Screens/MyReceivedBook';
import {Icon} from 'react-native-elements';


export const AppDrawerNavigator = createDrawerNavigator({
    Home:{
        screen : AppTabNavigator,
        navigationOptions:{
            drawerIcon : <Icon name="home" type ="fontawesome5" />
          }
        },
        Settings:{
            screen : SettingScreen,
            navigationOptions:{
                drawerIcon : <Icon name="settings" type ="fontawesome5" />,
                drawerLabel : "Settings"
              }
            
            },
          MyDonations:{
              screen : MyDonations,
              navigationOptions:{
                drawerIcon : <Icon name="gift" type ="font-awesome" />,
                drawerLabel : "My Donations"
              }
          }  ,
          Notifications:{
              screen:NotificationScreen,
              navigationOptions:{
                drawerIcon : <Icon name="bell" type ="font-awesome" />,
                drawerLabel : "Notifications"
              }

          },
          MyReceivedBook:{
              screen:MyReceivedBook,
              navigationOptions:{
                drawerIcon : <Icon name="gift" type ="font-awesome" />,
                drawerLabel : "My Received Books"
              }
          }

        
        
    },
        {
            contentComponent: customSidebarMenu
        },
        {
          initialRouteName : 'Home'
        }
      );