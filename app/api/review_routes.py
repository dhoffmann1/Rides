from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Review
from app.forms import ReviewForm
from .auth_routes import validation_errors_to_error_messages

review_routes = Blueprint('reviews', __name__)

#PUT/Update review by review ID
@review_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def update_review_details(review_id):
  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  review_to_update = Review.query.get_or_404(review_id)

  if review_to_update.user_id != current_user.id:
    return { "error": "Forbidden.  This is not your review" }, 403

  if form.validate_on_submit():
    for key, value in form.data.items():
      setattr(review_to_update, key, value)
    db.session.commit()
    return review_to_update.to_dict()
  return { "errors": validation_errors_to_error_messages(form.errors) }, 400

#DELETE review by review ID
@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
  review_to_delete = Review.query.get_or_404(review_id)
  # if review_to_delete.user_id != current_user.id:
  #   return { "error": "Forbidden.  This is not your review" }, 403

  db.session.delete(review_to_delete)
  db.session.commit()
  return { "message": "Successfully deleted review" }, 200
