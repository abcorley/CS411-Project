import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default function RecipeResults({ route }) {
  const recipe = route.params;

  console.log(recipe);

  return (
    <View>
      <Text>{recipe.name}</Text>

      <Text>{recipe.id}</Text>

      <Text>{recipe.url}</Text>
    </View>
  );
}
