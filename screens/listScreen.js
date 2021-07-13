import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import db from '../config';


class SummaryScreen extends React.Component{
 constructor() {
    super();
    this.state = {
      present_students: [],
      absent_students: [],
    };
  }

  getTodaysDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var y = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = dd + '-' + mm + '-' + y;
    return today;
  }

  componentDidMount = async () => {
    var today = await this.getTodaysDate();

    var students_ref = db.ref('/').on('value',(data)=>{
      var class_a = data.val();
      var present_students = []
      var absent_students = []
      for(var i in class_a){
        if(class_a[i][today] === 'present'){
          present_students.push(class_a[i])
        }
        if(class_a[i][today] === 'absent'){
          absent_students.push(class_a[i])
        }
      }

      present_students.sort(function(a, b) {
        return a.roll_no - b.roll_no;
      });
  
      absent_students.sort(function(a, b) {
        return a.roll_no - b.roll_no;
      });

      this.setState({
        present_students : present_students,
        absent_students : absent_students
      })
    })
  };

  render() {
    return (
      <View style={{ flex: 1,backgroundColor:'rgb( 130, 244, 122)' }}>
        <View style={{ flex: 0.1 }}>
          
        </View>
        <Text style={styles.title}>Present Students List</Text>
        <View style={styles.presentContainer}>
          {
            this.state.present_students.map((student, index)=>(
                <Text style={{fontSize:18}}>{student.name}</Text>
              )
            )
          }
        </View>
        <Text style={styles.title}>Absent Students List</Text>

        <View style={styles.absentContainer}>
          {
            this.state.absent_students.map((student, index)=>(
                <Text style={{fontSize:18}}>{student.name}</Text>
              )
            )
          }
        </View>
        <View style={styles.footer}>
          <Text>Present: {this.state.present_students.length}</Text>
          <Text>Absent: {this.state.absent_students.length}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  presentContainer: {
  
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    backgroundColor:"cyan",
    
  },
  absentContainer :{
    
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:40,
    backgroundColor:"pink"
  },
  title:{
    fontSize:20, 
    fontWeight:'bold',
    alignSelf:'center', 
    marginTop:40,
    backgroundColor:"orange"
  },
  footer:{
    flex:0.1, 
    flexDirection:'row',
     justifyContent:'space-around',
     fontSize:20
  }

});


export default SummaryScreen;