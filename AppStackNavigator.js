import React,{Component}from 'react';
import { View,Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView} from 'react-native';
    
import {createStackNavigator} from 'react-navigation-stack';

import ReceiverInformation from '../Screens/ReceiverInformation';
import DonorScreen from '../Screens/DonorScreen';
 



export const AppStackNavigator = createStackNavigator({
    BookDonateList:{
        screen : DonorScreen,
        navigationOptions:{
            headerShown: false
        }
        
        },
        RecieverDetails:{
            screen : ReceiverInformation,
            navigationOptions:{
                headerShown: false
            }
            
            },
        
        
    },        
        {
          initialRouteName : 'BookDonateList'
        }
      );