from flask import Flask, request, jsonify, make_response
from flask_restplus import Api, Resource, fields
from apis import api

app = Flask(__name__)
api.init_app(app)
