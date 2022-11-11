from flask import Flask
from flask_restful import Api, Resource
import requests

URL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch"
HEADERS = {
    "X-RapidAPI-Key": "cdb6ec9b8cmsh402031dae04fa04p1f7011jsn40359d2736a6",
	"X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
}

DEFAULT_NUMBER = 5

class FoodQuery(Resource):

    def get(self, query):
        QUERY = {"query": query, "number": DEFAULT_NUMBER}
        response = requests.request("GET", URL, headers=HEADERS, params=QUERY)
        result = response.json()
        
        return result

app = Flask(__name__)
api = Api(app)
api.add_resource(FoodQuery, "/food/<query>")

if __name__ == '__main__':
    app.run(debug=True)