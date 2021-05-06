import React, { Component } from 'react';
import { StyleSheet, View, FlatList,Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import SwipeableFlatlist from '../Components/SwipeableFlatlist'
import MyHeader from '../Components/MyHeader';
import firebase from 'firebase';
import db from '../Config';


export default class NotificationScreen extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          userId :  firebase.auth().currentUser.email,
          allNotifications : []
        };
    
        this.notificationRef = null
      }
    getAllNotification=()=>{
        this.requestRef = db.collection("all_notifications")
        .where("notification_status", "==", "unread")
        .where("targeted_user_id",'==',this.state.userId)
        .onSnapshot((snapshot)=>{
          var allNotifications =  []
          snapshot.docs.map((doc) =>{
            var notification = doc.data()
            notification["doc_id"] = doc.id
            allNotifications.push(notification)
          });
          this.setState({
              allNotifications : allNotifications
          });
        })
      }
    componentDidMount(){
        this.getAllNotification()
    }


    keyExtractor = (item, index) => index.toString()

  


renderItem =({item,i}) =>{
  return(

    <View style ={{flex:1,paddingTop:30}}>

    <ListItem bottomDivider>
      <ListItem.Content>
  
    <ListItem.Title style ={{color : 'black' , fontWeight:'bold'}}>{item.book_name}
    </ListItem.Title>
    <ListItem.Subtitle style ={{color : 'black' , fontWeight:'bold'}} >{item.message}</ListItem.Subtitle>       
    </ListItem.Content>
    


    </ListItem>
    </View>
  )
}

    render(){
        return(
          <View style={styles.container}>
            <View style={{flex:0.1}}>
              <MyHeader title={"Notifications"} navigation={this.props.navigation}/>
            </View>
            <View style={{flex:0.9}}>
              {
                this.state.allNotifications.length === 0
                ?(
                  <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:25}}>You have no notifications</Text>
                  </View>
                )
                :(
                  <SwipeableFlatlist allNotifications={this.state.allNotifications}  />
                )
              }
            </View>
          </View>
        )
      }
    }
    



const styles = StyleSheet.create({
    container : {
      flex : 1
    }
  })