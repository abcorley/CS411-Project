import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';


export default function CreateWorkoutScreen({navigation}) {
    const Week = [
      {
      label: "Sunday",
      value: 0
    }, {
      label: "Monday",
      value: 1
    }, {
      label: "Tuesday",
      value: 2
    }, {
      label: "Wednesday",
      value: 3
    }, {
      label: "Thursday",
      value: 4
    }, {
      label: "Friday",
      value: 5
    }, {
      label: "Saturday",
      value: 6
    }]
    const [days, setDays] = React.useState([]);
    const [category, setCategory] = React.useState([]);
    const [selectedCategory, setSelectedCategory] = React.useState([]);
    
    const getCategory = async () => {
      try {
        const response = await fetch('https://wger.de/api/v2/exercisecategory/?language=1')
        const json = await response.json()
        // Store Values in Temporary Array
        let newArray = json.results.map((item) => {
            return {label: item.name, value: item.id}
          })
          //Set Data Variable
          setCategory(newArray)
      } catch(error) {
          console.error(error);
      }
    }
    
    React.useEffect(() => {
      getCategory();
    }, []);

    const renderItem = (item) => {
        return (
          <View style={styles.item}>
            <Text style={styles.selectedTextStyle}>{item.label}</Text>
          </View>
        );
      };

    return (
        <View style ={styles.container}>
            <Text style={{marginTop: 8, fontSize: 15, marginBottom:8 }}>Days to Workout</Text>
            <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={Week}
                labelField="label"
                valueField="value"
                placeholder="Days"
                value={days}
                search={false}
                onChange={item => {
                    setDays(item);
                }}
                renderItem={renderItem}
                renderSelectedItem={(item, unSelect) => (
                    <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                    <View style={styles.selectedStyle}>
                        <Text style={styles.textSelectedStyle}>{item.label}</Text>
                    </View>
                    </TouchableOpacity>
                )}
            />
            <Text style={{marginTop: 8, fontSize: 15, marginBottom:8 }}>Select Target Areas</Text>
            <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={category}
                labelField="label"
                valueField="value"
                placeholder="Categories"
                value={selectedCategory}
                search={false}
                onChange={item => {
                    setSelectedCategory(item);
                }}
                renderItem={renderItem}
                renderSelectedItem={(item, unSelect) => (
                    <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                    <View style={styles.selectedStyle}>
                        <Text style={styles.textSelectedStyle}>{item.label}</Text>
                    </View>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('WorkoutResults', {categories: selectedCategory})}>
                <Text style={styles.text}>See Exercise Matches</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    button: {
        backgroundColor: '#008CBA',
        color: 'white',
        width: 100,
        borderRadius: 12,
        padding: 1,
        alignSelf: "center",
        marginTop: 10
    },
    text: {
        color: 'white',
        textAlign: 'center'
    },
    dropdown: {
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
  
        elevation: 2,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 14,
      },
      item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'white',
        shadowColor: '#000',
        marginTop: 8,
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
  
        elevation: 2,
      },
      textSelectedStyle: {
        marginRight: 5,
        fontSize: 16,
      }
});