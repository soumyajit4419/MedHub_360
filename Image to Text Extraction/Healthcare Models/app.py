import numpy as np
from flask import Flask, request, jsonify
import pickle
import json

app = Flask(__name__)
model = pickle.load(open('model1.pkl', 'rb'))


@app.route('/predict',methods=['POST'])

def predict():
    new_list=json.loads(request.get_data())

    int_features = [x for x in new_list]

    final_features = [np.array(int_features)]
    
    prediction = model.predict(final_features)

    output = prediction[0]
 
    return jsonify(output)


if __name__ == "__main__":
    app.run(debug=True)
