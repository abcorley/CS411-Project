import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import CreateWorkoutStyleSheet from '../stylesheets/CreateWorkoutStyleSheet';

export default function CreateWorkoutScreen({ navigation }) {
  const Week = [
    {
      label: 'Sunday',
      value: 0,
    },
    {
      label: 'Monday',
      value: 1,
    },
    {
      label: 'Tuesday',
      value: 2,
    },
    {
      label: 'Wednesday',
      value: 3,
    },
    {
      label: 'Thursday',
      value: 4,
    },
    {
      label: 'Friday',
      value: 5,
    },
    {
      label: 'Saturday',
      value: 6,
    },
  ];
  const [days, setDays] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState([]);

  const getCategory = async () => {
    try {
      const response = await fetch('https://wger.de/api/v2/exercisecategory/?language=1');
      const json = await response.json();
      // Store Values in Temporary Array
      const newArray = json.results.map((item) => {
        return { label: item.name, value: item.id };
      });
      // Set Data Variable
      setCategory(newArray);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getCategory();
  }, []);

  const renderItem = (item) => {
    return (
      <View style={CreateWorkoutStyleSheet.item}>
        <Text style={CreateWorkoutStyleSheet.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View style={CreateWorkoutStyleSheet.container}>
      <Text style={{ marginTop: 8, fontSize: 15, fontWeight: 'bold', marginBottom: 8 }}>Days to Workout</Text>
      <MultiSelect
        style={CreateWorkoutStyleSheet.dropdown}
        placeholderStyle={CreateWorkoutStyleSheet.placeholderStyle}
        selectedTextStyle={CreateWorkoutStyleSheet.selectedTextStyle}
        data={Week}
        labelField="label"
        valueField="value"
        placeholder="Days"
        value={days}
        search={false}
        onChange={(item) => {
          setDays(item);
        }}
        renderItem={renderItem}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={CreateWorkoutStyleSheet.selectedStyle}>
              <Text style={CreateWorkoutStyleSheet.textSelectedStyle}>{item.label}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Text style={{ marginTop: 8, fontSize: 15, fontWeight: 'bold', marginBottom: 8 }}>Select Target Areas</Text>
      <MultiSelect
        style={CreateWorkoutStyleSheet.dropdown}
        placeholderStyle={CreateWorkoutStyleSheet.placeholderStyle}
        selectedTextStyle={CreateWorkoutStyleSheet.selectedTextStyle}
        data={category}
        labelField="label"
        valueField="value"
        placeholder="Categories"
        value={selectedCategory}
        search={false}
        onChange={(item) => {
          setSelectedCategory(item);
        }}
        renderItem={renderItem}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={CreateWorkoutStyleSheet.selectedStyle}>
              <Text style={CreateWorkoutStyleSheet.textSelectedStyle}>{item.label}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={CreateWorkoutStyleSheet.button}
        onPress={() => navigation.navigate('WorkoutResults', { categories: selectedCategory })}
      >
        <Text style={CreateWorkoutStyleSheet.text}>See Exercise Matches</Text>
      </TouchableOpacity>
    </View>
  );
}
