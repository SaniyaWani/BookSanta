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
    Image,
    ScrollView} from 'react-native';

    import firebase from 'firebase';
    import db from '../Config';

    import {ListItem} from 'react-native-elements';

    import MyHeader from '../Components/MyHeader'



export default class DonorScreen extends Component{
    constructor(){
        super();
        this.state ={
            requestedBooksList :[]
        }

this.requestRef = null;
    }

    getRequestedBookList=()=>{
      
   this.requestRef = db.collection("requested_books").onSnapshot((snapshot)=>{
      var requestedBooksList = snapshot.docs.map(document => document.data());
      this.setState({
        requestedBooksList : requestedBooksList
      });
        
      })
     
    }
    componentWillUnmount(){
      this.requestRef();
    }
//123 - reaso1232
//poy - dkjfhsk5

    componentDidMount(){
      alert("Entered to donar screen");
      this.getRequestedBookList();
      alert("Left donar screen");
    }

    
keyExtractor=(item,index)  => index.toString()





renderItem =({item,i}) =>{
  return(

    <View style ={{flex:1,paddingTop:30}}>

    <ListItem bottomDivider
    
    
    >
      
      <ListItem.Content >
  
    <ListItem.Title style ={{color : 'black' , fontWeight:'bold'}}>{item.book_name}
    </ListItem.Title>
    
    <ListItem.Subtitle >{item.reason_to_request}</ListItem.Subtitle>  
    {/* <ListItem.LeftElement >{<Image
        style={{height:50,width:50}}
         source={{
        uri: item.image_link,
        }}/>}</ListItem.LeftElement>  */}
    </ListItem.Content>
    

    <TouchableOpacity style ={styles.button}
    onPress={()=>{
     
      this.props.navigation.navigate("RecieverDetails",{"details":item})}}>
      <Text>View</Text>
    </TouchableOpacity>


    </ListItem>
    </View>
  )
}


render(){

  alert("inside render bookCount " + this.state.requestedBooksList.length.toString());
    return(

     
        <View style={{flex:1}}>
          <MyHeader title="Donate Books"  navigation = {this.props.navigation}/>
         
          <View style={{flex:1}}>
            {
              this.state.requestedBooksList.length === 0
              ?(
                <View style={styles.subContainer}>
                  <Text style={{ fontSize: 20}}>List Of All Requested Books</Text>
                </View>
              )
              :(
                
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={this.state.requestedBooksList}
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