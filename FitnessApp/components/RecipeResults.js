import * as React from 'react';
import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native';

export default function RecipeResults({ route }) {
  const recipe = route.params;
  const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/';
  const apiKey = '210df9a380mshbf3d95e6e15204ap19fa7djsn88643e1c1e4e';
  const apiHost = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';

  //console.log(recipe);
  const [details, setDetails] = React.useState([]);
  const [image, setImage] = React.useState("")
  const [isLoaded, setLoaded] = React.useState(true)

  const getDetails = async (id) => {
    try {
      setLoaded(false);
      const response = await fetch(
        `${url}${id}/information?includeNutrition=true`, {
          method: `GET`,
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': apiHost,
          },
        }
      )
      const json = await response.json();
      const newArray = {

        Instructions : json.instructions,
        Calories : json.nutrition.nutrients[0].amount,
        Fat : json.nutrition.nutrients[1].amount,
        Carbs : json.nutrition.nutrients[2].amount,
        Proteins : json.nutrition.nutrients[8].amount
      }

      const imageRes = await fetch(`${json.image}`)
      const imageData = await imageRes.blob();
      setImage(URL.createObjectURL(imageData));
      setDetails(newArray)
    } catch (error) {
      console.error(error)
    } finally{
      setLoaded(true);
    }
  };

  React.useEffect(() => {
    getDetails(recipe.id);
  }, []);

  return (
    <View>
      <Text> {recipe.name} </Text>
      {(isLoaded) && 
        <Image 
          style={{width: '100%', height: '50%'}} 
          source={{uri:image ? image : null}} /> }
      <Text>{details.Instructions}</Text>
      <Text>Calories: {details.Calories}</Text>
      <Text>Fat: {details.Fat} g</Text>
      <Text>Carbohydrate: {details.Carbs} g</Text>
      <Text>Protein: {details.Proteins} g</Text>
    </View>
  );
}
