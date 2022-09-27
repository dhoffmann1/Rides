from flask import Blueprint, session, request, redirect
from flask_login import login_required, current_user
from app.models import User, db, Car, Review
from app.forms import LoginForm, SignUpForm, NewCarForm, ReviewForm
from .auth_routes import validation_errors_to_error_messages


review_routes = Blueprint('reviews', __name__)
