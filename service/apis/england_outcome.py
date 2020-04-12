from flask import Flask, request, jsonify, make_response
from flask_restplus import Api, Resource, fields,Namespace
from sklearn.externals import joblib
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

name_space = Namespace('englandoutcome', description='Prediction APIs')

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

classifier = joblib.load('/home/mardim/diploma_app/ML-React-App-Template/service/apis/finalized_model.sav')

teams_df = pd.read_csv('/home/mardim/diploma_app/ML-React-App-Template/service/apis/teams.csv')
x_test = pd.read_csv('/home/mardim/diploma_app/ML-React-App-Template/service/apis/test_df_england.csv')
x_train = pd.read_csv('/home/mardim/diploma_app/ML-React-App-Template/service/apis/train_df_england.csv')
selected_features = ['away_ma_sqrt_shotons', 'away_ca_corners', 'away_ca_pow2_corners', 'away_ca_sqrt_corners', 'away_ma_rcards', 'away_ca_rcards', 
                     'away_ca_pow2_rcards', 'away_ma_sqrt_rcards', 'away_ca_sqrt_rcards', 'away_ca_possessions', 'away_ca_sqrt_possessions', 'home_elo_rate',
                     'home_ca_goals', 'home_ca_pow2_goals', 'home_ca_sqrt_goals', 'home_ca_shotons', 'home_ma_shotoffs', 'home_ma_pow2_shotoffs', 'home_ca_fouls',
                     'home_ca_pow2_fouls', 'home_ca_sqrt_fouls', 'home_ca_ycards', 'home_ca_pow2_ycards', 'home_ca_sqrt_ycards', 'home_ma_pow2_rcards',
                     'home_ca_pow2_rcards', 'home_ma_sqrt_rcards', 'home_ma_possessions']


for col in teams_df.columns:
    print(col)
sc=StandardScaler()
x_train_crop = x_train.iloc[:,37:]
sc.fit_transform(x_train_crop[selected_features])
@name_space.route("/")
class MainClass(Resource):
	#classifier = joblib.load('finalized_model.sav')

	#teams_df = pd.read_csv('teams.csv')
	#x_test = pd.read_csv('test_df_england.csv')
	#x_train = pd.read_csv('train_df_england.csv')
	#selected_features = ['away_ma_sqrt_shotons', 'away_ca_corners', 'away_ca_pow2_corners', 'away_ca_sqrt_corners', 'away_ma_rcards', 'away_ca_rcards',
    #                 'away_ca_pow2_rcards', 'away_ma_sqrt_rcards', 'away_ca_sqrt_rcards', 'away_ca_possessions', 'away_ca_sqrt_possessions', 'home_elo_rate',
    #                 'home_ca_goals', 'home_ca_pow2_goals', 'home_ca_sqrt_goals', 'home_ca_shotons', 'home_ma_shotoffs', 'home_ma_pow2_shotoffs', 'home_ca_fouls',
    #                 'home_ca_pow2_fouls', 'home_ca_sqrt_fouls', 'home_ca_ycards', 'home_ca_pow2_ycards', 'home_ca_sqrt_ycards', 'home_ma_pow2_rcards',
    #                 'home_ca_pow2_rcards', 'home_ma_sqrt_rcards', 'home_ma_possessions']


	#for col in teams_df.columns:
		#print(col)
	#sc=StandardScaler()
	#x_train_crop = x_train.iloc[:,37:]
	#sc.fit_transform(x_train_crop[selected_features])

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
			x_test_row = x_test.loc[(x_test['home_team_api_id'] == int(home_team_api_id)) & (x_test['away_team_api_id'] == int(away_team_api_id)) & (x_test['season'] == season)]
			print('edw '+str(x_test_row['result']))
			actual_result = str(x_test_row['result'])
			x_test_row = x_test_row.iloc[:,37:]
			#print(x_test_row[selected_features])
			x_test_std_final=sc.transform(x_test_row[selected_features])
			print(x_test_std_final)
			data = [val for val in formData.values()]
			prediction = classifier.predict(x_test_std_final)
			print(prediction)
			response = jsonify({
				"statusCode": 200,
				"status": "Prediction made",
				"result": "Prediction: " + str(prediction)+ " "+actual_result
				})
			response.headers.add('Access-Control-Allow-Origin', '*')
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make prediction",
				"error": str(error)
			})

