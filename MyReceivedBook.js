import React,{Component}from 'react';
import {
    View,
    FlatList,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView} from 'react-native';

    import firebase from 'firebase';
    import db from '../Config';

    import {ListItem} from 'react-native-elements';

    import MyHeader from '../Components/MyHeader'



export default class MyReceivedBook extends Component{
    constructor(){
        super();
        this.state={
            userId  : firebase.auth().currentUser.email,
      receivedBooksList : []
        }
        this.requestRef= null
    }
getReceivedBooksList=()=>{
    this.requestRef = db.collection("requested_books")
    .where('user_id','==',this.state.userId)
    .where("book_status", '==','received')
    .onSnapshot((snapshot)=>{
      var receivedBooksList = snapshot.docs.map((doc) => doc.data())
      this.setState({
        receivedBooksList : receivedBooksList
      });
    })
  }

    componentDidMount(){
        this.getReceivedBooksList();
    }

    componentWillUnmount(){
        this.requestRef();
      }
    
      keyExtractor = (item, index) => index.toString()
    
      renderItem = ( {item, i} ) =>{
        console.log(item.book_name);
        return(

            <View style ={{flex:1,paddingTop:30}}>
        
            <ListItem bottomDivider>
              <ListItem.Content>
          
            <ListItem.Title style ={{color : 'black' , fontWeight:'bold'}}>{item.book_name}
            </ListItem.Title>
            <ListItem.Subtitle >{item.bookStatus}</ListItem.Subtitle>       
            </ListItem.Content>
        
            </ListItem>
            </View>
          )
      }

    render(){
        return(
            <View style={{flex:1}}>
            <MyHeader title="Received Books" navigation ={this.props.navigation}/>
            <View style={{flex:1}}>
              {
                this.state.receivedBooksList.length === 0
                ?(
                  <View style={styles.subContainer}>
                    <Text style={{ fontSize: 20}}>List Of All Received Books</Text>
                  </View>
                )
                :(
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.receivedBooksList}
                    renderItem={this.renderItem}
                  />
                )
              }
            </View>
          </View>
        )
      }
    }
    
    const styles = StyleSheet.create({
      subContainer:{
        flex:1,
        fontSize: 20,
        justifyContent:'center',
        alignItems:'center'
      },
      button:{
        width:100,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ff5722",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8
         }
      }
    })
    