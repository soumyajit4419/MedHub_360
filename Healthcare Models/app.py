import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import pickle
import json


app = Flask(__name__)
app.config['SECRET_KEY'] = 'rahulkp'
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)

model = pickle.load(open('model1.pkl', 'rb'))


@app.route('/predict',methods=['POST'])
@cross_origin()
def predict():

    data = request.get_json()
    
    new_list=data["values"]
    
    int_features = [int(x) for x in new_list]
    
    final_features = [np.array(int_features)]
    
    prediction = model.predict(final_features)

    output = prediction[0]
 
    return jsonify(output)


if __name__ == "__main__":
    app.run(debug=True)
