import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FontVariant,
} from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Constants from 'expo-constants';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import listScreen from './listScreen';
import db from '../config';
import firebase from 'firebase';

export default class homeScreen extends Component {
  constructor() {
    super();
    this.state = {
      all_students: [],
      presentPressedList: [],
      absentPressedList: [],
    };
  }
  componentDidMount = async () => {
    var class_ref = await db.ref('/').on('value', (data) => {
      var all_students = [];
      var class_a = data.val();
      for (var i in class_a) {
        all_students.push(class_a[i]);
      }
      all_students.sort(function (a, b) {
        return a.roll_no - b.roll_no;
      });
      this.setState({ all_students: all_students });
      console.log(all_students);
    });
  };
  updateAttendence(roll_no, status) {
    var id =' ';
    if(roll_no <=  9) {

      id = '0' + roll_no;
    }else {
      id = roll_no
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = dd + '-' + mm + '-' + yyyy;
    var ref_path = id
    var class_ref = db.ref(ref_path);
    class_ref.update({
      [today]: status,
    });
  }
  goTolistScreen = () => {
    this.props.navigation.navigate('listScreen');
  };
  render() {
    var all_students = this.state.all_students;
    if (all_students.length === 0) {
      return (
        <View>
          <Text> hey </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaProvider>
            <Header
              backgroundColor={'red'}
              centerComponent={{
                text: 'School Attendance',
                style: { fontSize: 18, color: 'cyan' },
              }}></Header>
          </SafeAreaProvider>
          <View style={{ flex: 14 }}>
            {all_students.map((student, index) => (
              <View key={index} style={styles.stdChartContainer}>
                <View
                  key={'name' + index}
                  style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      marginRight: 10,
                    }}>
                    {student.roll_no}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      marginRight: 10,
                    }}>
                    {student.name}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={
                      this.state.presentPressedList.includes(index)
                        ? [styles.presentButton, { backgroundColor: 'cyan' }]
                        : styles.presentButton
                    }
                    onPress={() => {
                      var presentPressedList = this.state.presentPressedList;
                      presentPressedList.push(index);
                      this.setState({ presentPressedList: presentPressedList });
                      var roll_no = index + 1;
                      this.updateAttendence(roll_no, 'present');
                    }}>
                    <Text>Present</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={
                      this.state.absentPressedList.includes(index)
                        ? [styles.absentButton, { backgroundColor: 'red' }]
                        : styles.absentButton
                    }
                    onPress={() => {
                      var absentPressedList = this.state.absentPressedList;
                      absentPressedList.push(index);
                      this.setState({ absentPressedList: absentPressedList });
                      var roll_no = index + 1;
                      this.updateAttendence(roll_no, 'absent');
                    }}>
                    <Text>Absent</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.footer}
                onPress={() => {
                  this.props.navigation.navigate('listScreen');
                }}>
                <Text>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stdChartContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    marginTop: 5,
    marginRight: 10,
    marginLeft: -10,
    backgroundColor: 'lime',
  },
  presentButton: {
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 2,
    borderWidth: 4,
    color: 'red',
  },
  absentButton: {
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
  },
  footer: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 67,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    marginTop: 10,
  },
});
