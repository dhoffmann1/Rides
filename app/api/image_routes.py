from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, Image


image_routes = Blueprint('images', __name__)

#DELETE car by car ID
@image_routes.route('/<int:image_id>', methods=['DELETE'])
@login_required
def delete_image(image_id):
  image_to_delete = Image.query.get_or_404(image_id)
  # if image_to_delete.seller_id != current_user.id:
  #   return { "error": "Forbidden.  This is not your car" }, 403

  db.session.delete(image_to_delete)
  db.session.commit()
  return { "message": "Successfully deleted image" }, 200
