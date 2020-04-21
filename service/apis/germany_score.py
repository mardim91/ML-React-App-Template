from flask import Flask, request, jsonify, make_response
from flask_restplus import Api, Resource, fields,Namespace
from sklearn.externals import joblib
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
import xgboost as xgb

name_space = Namespace('germanyscore', description='Prediction APIs')

model = name_space.model('Prediction params', 
				  {'HomeTeam': fields.String(required = True, 
				  							   description="Home Team", 
    					  				 	   help="Home Team Field  cannot be blank"),
				  'AwayTeam': fields.String(required = True, 
				  							   description="Away Team", 
    					  				 	   help="Away Team Field cannot be blank"),
                  'Season': fields.String(required = True,
                                               description="Season",
                                               help="Season Field cannot be blank")})

classifier = joblib.load('/home/mardim/diploma_app/ML-React-App-Template/service/apis/finalized_model_score_germany.sav')

teams_df = pd.read_csv('/home/mardim/diploma_app/ML-React-App-Template/service/apis/teams.csv')
x_test = pd.read_csv('/home/mardim/diploma_app/ML-React-App-Template/service/apis/test_df_germany_score.csv')
x_train = pd.read_csv('/home/mardim/diploma_app/ML-React-App-Template/service/apis/train_df_germany_score.csv')
selected_features = ['opponent_strength', 'opponent_elo_rate', 'opponent_ca_sqrt_corners', 'opponent_ma_ycards', 'opponent_ma_sqrt_ycards', 'opponent_ma_crosses',
                    'opponent_ca_crosses', 'opponent_ca_sqrt_crosses', 'opponent_ca_possessions', 'opponent_ca_pow2_possessions', 'team_ma_goals', 'team_ca_goals',
                    'team_ma_shotons', 'team_ca_sqrt_fouls', 'team_ma_corners', 'team_ma_pow2_corners', 'team_ca_ycards', 'team_ca_sqrt_ycards',
                    'team_ma_pow2_crosses', 'team_ca_pow2_possessions', 'homegame']

for col in teams_df.columns:
    print(col)
sc=StandardScaler()
x_train_crop = x_train.iloc[:,36:]
sc.fit_transform(x_train_crop[selected_features])
@name_space.route("/")
class MainClass(Resource):

	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response

	@name_space.expect(model)		
	def post(self):
		try: 
			formData = request.json
			print(str(formData))
			home_team = formData['HomeTeam']
			away_team = formData['AwayTeam']
			season = formData['Season']
			print(str(home_team))
			home_team_api_id = teams_df.loc[teams_df['team_long_name'] == home_team]['team_api_id']
			away_team_api_id = teams_df.loc[teams_df['team_long_name'] == away_team]['team_api_id']
			print(int(home_team_api_id))
			print(int(away_team_api_id))
			print(season)
			x_test_rows = x_test.loc[(x_test['home_team_api_id'] == int(home_team_api_id)) & (x_test['away_team_api_id'] == int(away_team_api_id)) & (x_test['season'] == season)]
			#actual_results = []
			#predictions = []
			print('edw '+str(x_test_rows))
			#print(x_test_row)
			actual_results=str(x_test_rows['goals'])
			##print(actual_results)
			x_test_rows = x_test_rows.iloc[:,36:]
			print(x_test_rows)
			print(x_test_rows[selected_features])
			x_test_std_final=sc.transform(x_test_rows[selected_features])
			print(x_test_std_final)
			#data = [val for val in formData.values()]
			predictions = classifier.predict(x_test_std_final)
			print(predictions)
			response = jsonify({
				"statusCode": 200,
				"status": "Prediction made",
				"result": "Prediction: " + str(predictions)+ " "+actual_results
				})
			response.headers.add('Access-Control-Allow-Origin', '*')
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make prediction",
				"error": str(error)
			})

