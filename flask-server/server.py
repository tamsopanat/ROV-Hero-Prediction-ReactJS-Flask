from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET", "POST"])
def model():
    if request.method == "POST":
        #Input Data
        heroData = request.json
        feature = list(heroData.keys())
        feature.remove('predict')
        target = heroData['predict']
        print(heroData)
        print(f'X_feature : {feature}')
        print(f'Predict : {target}')
        dataset = pd.read_csv("./staticFiles/rovMatchData.csv").drop(columns=['result_Blue'])
        #Prepare Data
        allHero = []
        for i in dataset.values:
            allHero += list(i)
        allHero = list(set(allHero))
        #LabelEncoder
        le = LabelEncoder()
        le.fit(allHero)
        data_encode = dataset.apply(le.transform)
        #Feature & Target
        X = data_encode[feature]
        y = data_encode[target]
        #Model
        dtree = DecisionTreeClassifier()
        dtree = dtree.fit(X, y)
        print("Model Created")
        #Predict
        input = list(heroData[key] for key in heroData if key in feature)
        predict_encode = dtree.predict(le.transform(input).reshape(1,-1))
        predict_decode = le.inverse_transform(predict_encode)
        print({key:heroData[key] for key in heroData if key in feature})
        print(f'Result for {target} hero is : {predict_decode}')

        #Img of hero
        heroImg = pd.read_csv("./staticFiles/heroImg.csv")
        imgURL = heroImg.query(f'heroName.str.contains("{predict_decode[0].upper()}")')['imgURL']
        if imgURL.empty != True:
            imgURL = imgURL.values[0]
        else:
            imgURL = ' '
        return {'heroPredict' : predict_decode[0], 
                        'heroURL' :imgURL}

if __name__ == "__main__":
    app.run(debug=True)