from flask import jsonify,request,Flask
import numpy as np
import joblib
from flask_cors import CORS
import pandas as pd

app=Flask(__name__)
CORS(app)

model = joblib.load('heart_model.pkl')
scaler = joblib.load('scaler.pkl')

@app.route('/predict',methods=['POST'])
def predict():
    data=request.json

    input_data=[
        data['age'],data['sex'],data['cp'],data['trestbps'],data['chol'],
        data['fbs'],data['restecg'],data['thalach'],data['exang'],data['oldpeak'],
        data['slope'],data['ca'],data['thal']
    ]

    feature_names = ['age', 'sex', 'cp', 'trestbps', 'chol',
                     'fbs', 'restecg', 'thalach', 'exang', 'oldpeak',
                     'slope', 'ca', 'thal']

    input_df = pd.DataFrame([input_data], columns=feature_names)

    input_scaled = scaler.transform(np.array(input_df).reshape(1,-1))
    print("Raw input:", input_data)
    print("Scaled input:", input_scaled)
    result = model.predict(input_scaled)

    proba = model.predict_proba(input_scaled)[0]
    return jsonify({
        "prediction": int(result[0]),
        "probability": round(proba[1], 3) ,  # chance of class 1
        "message":"Heat disease detected" if int(result[0])==1 else "Heart disease not detected" 
    })



if __name__ == '__main__':
    app.run(debug=True)