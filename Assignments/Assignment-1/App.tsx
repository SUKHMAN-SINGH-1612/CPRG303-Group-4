import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
 
 
 
export default function App() {
  return (
   
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.row}>
      <AntDesign name="left" size={24} color="black" style={styles.iconLeft}/>
      <View style={styles.textContainer}>
        <Text style={styles.saitText}>SAIT</Text>
        <Text style={styles.collegeText}>College and University</Text>
      </View>
        <FontAwesome name="plus-square-o" size={24} color="black" />
      </View>
   
      <View style={[styles.row, styles.secondRow]} >
      <Image source={require('./assets/sait.jpg')} style={styles.image}/>
        <View style={styles.textContainer}>
        <Text style={styles.numberText}>53</Text>
        <Text>Posts</Text>
        </View >
        <View style={styles.textContainer}>
        <Text style={styles.numberText}>12</Text>
        <Text>Members</Text>
        </View>
        <View style={styles.textContainer}>
        <Text style={styles.numberText}>1</Text>
        <Text>Admins</Text>
        </View>
      </View>
 
      <View style={styles.thirdRow}>
        <Text>College and University</Text>
        <Text>We inspire, educate and innovate, with and for our students.</Text>        
        <Text>Tag your 📸 With #HereAtSait for a chance to be featured.</Text>
      </View>
   
   
    <View>
      <TouchableOpacity style={styles.button}
        onPress={() =>
        alert('I am clicked')}
        >
        <Text style={styles.buttonText}>Member</Text>
        <AntDesign name="down" size={20} color="black" />
        </TouchableOpacity>
      </View>
 
      <View>
        <View style={styles.row}>
        <Image source={require('./assets/sait1.jpg')} style={styles.box}/>
        <Image source={require('./assets/sait2.jpg')} style={styles.box}/>
        <Image source={require('./assets/sait3.jpg')} style={styles.box}/>
        </View>
        <View style={styles.row}>
        <Image source={require('./assets/sait4.jpg')} style={styles.box}/>
        <Image source={require('./assets/sait5.jpg')} style={styles.box}/>
        <Image source={require('./assets/sait6.jpg')} style={styles.box}/>
        </View>
        <View style={styles.row}>
        <Image source={require('./assets/sait7.jpg')} style={styles.box}/>
        <Image source={require('./assets/sait8.jpg')} style={styles.box}/>
        <Image source={require('./assets/sait9.jpg')} style={styles.box}/>
        </View>
       
      </View>
 
      <View style={[styles.row, styles.fourthRow]}>
      <Feather name="home" size={24} color="black" />
      <AntDesign name="search1" size={24} color="black" />
      <Entypo name="video" size={24} color="black" />
      <Ionicons name="bag-handle-outline" size={24} color="black" />
      <FontAwesome name="user-circle" size={24} color="black" />
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
 
  image:{
    width:100,
    height:100,
    borderRadius:50,
    borderWidth:5,
    borderColor: '#000',
    marginLeft: -20,
 
  },
 
  button:{
    backgroundColor: '#fff',
    // padding: 10,
    borderRadius: 5,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    margin: 10,
    elevation: 5,
    shadowColor: '#000',
    width: 400,
    height: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
 
  },
 
  buttonText:{
    color: '#000',
    fontSize:17,
    fontWeight: 'bold',
  },
 
  icon:{
    marginLeft:10,
  },
 
  row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
 
  secondRow:{
    marginTop: 20,
  },
 
  thirdRow:{
    marginTop: 20,
  },
 
  fourthRow:{
    marginTop: 120,
  },
 
  textContainer:{
    flexDirection: 'column',
    justifyContent: 'center',
  },
 
  saitText:{
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
 
  collegeText:{
    fontSize: 16,
    color: '#555',
  },
 
  iconLeft:{
    marginLeft: -20,
  },
   
  numberText:
  {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
 
  box:{
    width: 141,
    height: 135,
    margin: 1,
  },
 
});
 