from flask_restplus import Api

from .england_outcome import name_space as eo
from .england_score import name_space as es
from .germany_outcome import name_space as go
from .germany_score import name_space as gs
api = Api(version = "1.0", 
		  title = "ML React App", 
		  description = "Predict results using a trained model")


api.add_namespace(eo)
api.add_namespace(es)
api.add_namespace(go)
api.add_namespace(gs)
