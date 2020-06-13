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

def findPec(X):
        df = pd.read_sql_query("select * from pec_2018",con=engine)
        query = df.loc[df['Référence GA'] == X]
        query = query.drop(['Référence GA'], axis=1)
        return query

# def encoderFunc(X):
#     # for i in  (X.columns):
#     #     X[i] = le.transform(X[i])   
#     # X = le.transform(X)   
#     # for i in list(le.classes_):
#     #     X[i]=le.transform(X[i])[0]
#     return X

def loadData():
    df = pd.read_csv('data/pec_prep_out.csv')
    df=df.drop([ "Unnamed: 0"], axis=1)
    return df

@app.route('/api/predict', methods=['POST'])
def predict():
    if model:
        try:
            json_ = request.json['reference']
            print(json_)
            df = findPec(json_)
            
            if (df.empty):
                  return jsonify({'error': "PEC not found"}) 
            else:
                prediction = list(model.predict(df))
                df['prediction'] = prediction
                return Response(df.to_json(orient="records"), mimetype='application/json')
        except:

            return jsonify({'trace': traceback.format_exc()})
    else:
        print('Train the model first')
        return 'No model here to use'
# @app.route('/api/graph', methods=['POST'])
# def graph():
#     x = request.json['x']
#     color = request.json['color']
#     df= loadData()
#     fig = px.histogram(df, x=x, color=color, histnorm='probability density')
#     fig.to_json()
#     # canvas = FigureCanvas(fig)
#     # output = BytesIO()
#     # canvas.print_png(output)
#     # response = make_response(fig.getvalue())
#     # response.mimetype = 'image/png'
#     # return response
#     # return send_file(fig, mimetype='image/gif')
#     return jsonify({'figure': str(fig)})   


if __name__ == '__main__':
    try:
        port = int(sys.argv[1])  
    except:
        port = PORT  

    model = load('modeling/model/xgb_model.pkl')
    print('Model loaded')
    model_columns = load("modeling/model/model_columns.pkl") 
    print('Model columns loaded')

    app.run(port=port, debug=True)
