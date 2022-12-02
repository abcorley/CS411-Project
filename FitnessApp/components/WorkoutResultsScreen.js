import * as React from 'react';
import { Text, View, FlatList } from 'react-native';

export default function WorkoutResultsScreen({ route }) {
  const { categories } = route.params;

  console.log(categories);
  const [exercise, setExercise] = React.useState([]);

  const getExercises = async (id) => {
    try {
      const response = await fetch(
        `https://wger.de/api/v2/exercise/?${new URLSearchParams({
          language: 2,
          category: id,
        })}`
      );
      const json = await response.json();
      // Store Values in Temporary Array
      const newArray = json.results.map((item) => {
        return { label: item.name, value: item.id };
      });
      // Set Data Variable
      setExercise(newArray);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    categories.map((category) => getExercises(category));
  }, []);

  console.log(exercise);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={exercise}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.label}</Text>}
      />
    </View>
  );
}
