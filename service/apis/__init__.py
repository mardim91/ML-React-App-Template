from flask_restplus import Api

from .england_outcome import name_space as eo

api = Api(version = "1.0", 
		  title = "ML React App", 
		  description = "Predict results using a trained model")


api.add_namespace(eo)
