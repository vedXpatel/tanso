import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(0);
  const [text, setText] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  const handleSubmit = () => {
    if (phone.length < 10 || phone.length > 10) {
      setText('Please enter valid phone number');
    } else {
      setText('');
      let Gender = '';
      if(isEnabled == false) {
        Gender = 'Male';
      }else{
        Gender = 'Female';
      }
      firestore()
        .collection('data')
        .add({
          name: name,
          phone: phone,
          gender: Gender,
        })
        .then(() => {
          console.log('data added');
        });
    }
  };

  console.log(name);

  return (
    <SafeAreaView>
      <TextInput style={styles.input} onChangeText={setName} value={name} />
      <Text style={{left:130,top:25,color:'black',fontSize:18}}>Male</Text>
      <Switch
      style={{right:176,}}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text style={{left:250,color:'black',fontSize:18,bottom:25}}>Female</Text>
      <TextInput style={styles.input} onChangeText={setPhone} value={phone} />
      <Text style={{fontSize: 12, color: 'red', left: 60}}>{text}</Text>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={{color: 'white', marginTop: 7, fontSize: 15}}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
  button: {
    width: 300,
    height: 40,
    left: 60,
    alignItems: 'center',
    backgroundColor: '#001061',
    fontSize: 15,
    borderRadius: 60,
  },
});

export default App;
