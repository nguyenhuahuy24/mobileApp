
import React from "react";
import {
  Linking,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Button,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class DrawContentContent extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (

      <View style={{flex:1 }}>
      {/* header */}
     


      {/* body */}
        <View style={styles.body} >
           <View style={styles.bodyText} >
              <TouchableOpacity style={styles.touch} onPress={() => this.props.navigation.navigate('Bill')}>
                  <Icon
                      name="tasks"
                      backgroundColor=""
                      color="grey"
                     size = {30}
                     style={{marginLeft: 10}}
                    />
                  <Text style={{fontSize:16,marginLeft: 15}}>Bill Screen</Text>
              </TouchableOpacity>
          
        </View>
           <View style={styles.bodyText} >

            <TouchableOpacity style={styles.touch} onPress={() => this.props.navigation.navigate('Contract')}>
                  <Icon
                      name="tasks"
                      backgroundColor=""
                      color="grey"
                     size = {30}
                     style={{marginLeft: 10}}
                    />
                  <Text style={{fontSize:17,marginLeft: 15}} >Contract Screen</Text>
              </TouchableOpacity>
        </View>
        </View>
        {/* footer */}
        <View style={styles.footer}>
            
      
              <View style={styles.footerText} >
                <Icon.Button
                  name="sign-out"
                  backgroundColor=""
                  color="grey"
                  style={{marginTop: 7, marginLeft: 8, marginRight:7}}
                />
                <TouchableOpacity>
                  <Text style={{marginTop: 16}}>Logout</Text>
                </TouchableOpacity>
              </View>
        </View>

      </View>
    );
  }
};
const styles = StyleSheet.create({
  
  header:{
    flex:2
  },
  body: {
    flex: 4,
    borderTopWidth:1,
    
  },
  footer: {
    flex: 2,
    borderTopWidth:1
  },
  footerText: {
    marginTop: 5,
    marginHorizontal: 1,
    flexDirection: 'row',
  },
   bodyText: {
    marginTop: 5,
    marginHorizontal: 1,
    flexDirection: 'row',
  },
  headerText: {
     marginTop: 5,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  touch:{
    flexDirection: 'row',
    backgroundColor:'#FFFF',
    width:'100%',
    textAlign: 'center',
  },
  
});
export default DrawContentContent; 
