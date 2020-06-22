import sys
from flask import Flask, request, jsonify, Response
from joblib import load
import traceback
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
import pickle
from sqlalchemy import create_engine
from flask.helpers import make_response, send_file
from io import BytesIO

pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', None)

HOST = '0.0.0.0'
PORT = 8081
engine = create_engine('postgresql://postgres@localhost:5432/pec')



# initialize flask application
app = Flask(__name__)
def encoder(df2):
    df=df2
    le = LabelEncoder()
    for i in  (df.columns.drop('Référence GA')):  
        le.fit(df[i].astype(str))
        df[i] = le.transform(df[i].astype(str))
    return df2

def findPec(X):
        try:
            df = pd.read_sql_query("select * from pec_2018",con=engine)
        except:
            df = pd.read_csv('modeling/output/pec_2018.csv')
        query = df.loc[df['Référence GA'] == X]
        query = query.drop(['Référence GA'], axis=1)       
        return query

@app.route('/api/predict', methods=['POST'])
def predict():
    if model:
        try:
            json_ = request.json['reference']
            print(json_)
            df= findPec(json_)
            if (df.empty):
                  return jsonify({'error': "PEC not found"}) 
            else:
                prediction = (model.predict(df))
                df['prediction'] = prediction
                return Response(df.to_json(orient="records"), mimetype='application/json')
        except:

            return jsonify({'trace': traceback.format_exc()})
    else:
        print('Train the model first')
        return ('No model here to use')

@app.route('/api/metrics', methods=['Get'])
def getMetrics():
    return metrics 

if __name__ == '__main__':
    try:
        port = int(sys.argv[1])  
    except:
        port = PORT  

    model = load('modeling/model/model_final.pkl')
    print('Model loaded')
    model_columns = load("modeling/model/model_columns.pkl") 
    print('Model columns loaded')
    metrics = load("modeling/model/metrics.pkl") 
    print('Metrics columns loaded')
    print(metrics)

    app.run(port=port, debug=True)
