import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default function RecipeScreen({ navigation }) {
  const [search, setSearch] = React.useState('');
  const [recipes, setRecipes] = React.useState('');

  const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?';
  const apiKey = '210df9a380mshbf3d95e6e15204ap19fa7djsn88643e1c1e4e';
  const apiHost = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';
  const getRecipes = async (search) => {
    try {
      if (search != '') {
        const response = await fetch(`${url}query=${search}&number=10`, {
          method: `GET`,
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': apiHost,
          },
        });
        const json = await response.json();
        const newArray = json.results.map((item) => {
          return { name: item.title, id: item.id, url: item.sourceUrl };
        });
        setRecipes(newArray);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getRecipes(search);
  }, []);

  return (
    <View>
      <SearchBar
        containerStyle={searchBarStyles.container}
        inputStyle={searchBarStyles.inputText}
        lightTheme
        round
        placeholder="Type Here..."
        onChangeText={setSearch}
        value={search}
      />
      <TouchableOpacity style={searchBarStyles.button} onPress={() => getRecipes(search)}>
        <Text style={searchBarStyles.buttonText}>Find me a recipe!</Text>
      </TouchableOpacity>
      {/*
            <TouchableOpacity onPress={() => console.log(recipes)}>
                <Text style={searchBarStyles.testText}>
                    Recipe!
                </Text>
            </TouchableOpacity>
            */}
      <View>
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('RecipeResults', item)}>
              <Text style={resultsStyles.item}> {item.name} </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const searchBarStyles = StyleSheet.create({
  container: {
    margin: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
  },
  inputText: {
    fontSize: 20,
    marginLeft: 10,
    width: '100%',
    color: 'black',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  button: {
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#0782f9',
    width: '95%',
    marginLeft: 9,
    marginVertical: 10,
    borderRadius: 15,
  },
});

const resultsStyles = StyleSheet.create({
  container: {
    flex: 5,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: '#dcdcdc',
  },
});
