from app.models import db, Image

def seed_images():
  images = [
  {
    "car_id": 1,
    "image_url": "https://ridesappbucket.s3.amazonaws.com/chevy_1.png"
  },
  {
    "car_id": 1,
    "image_url": "https://ridesappbucket.s3.amazonaws.com/chevy_2.png"
  },
  {
    "car_id": 1,
    "image_url": "https://ridesappbucket.s3.amazonaws.com/chevy_3.png"
  },
  {
    "car_id": 1,
    "image_url": "https://ridesappbucket.s3.amazonaws.com/chevy_4.png"
  },
  {
    "car_id": 1,
    "image_url": "https://ridesappbucket.s3.amazonaws.com/chevy_5.png"
  },
  {
    "car_id": 2,
    "image_url": "https://ridesappbucket.s3.amazonaws.com/malibu_1.png"
  },
  {
    "car_id": 3,
    "image_url": "https://ridesappbucket.s3.amazonaws.com/camaro_1.png"
  },
  {
    "car_id": 4,
    "image_url": "https://ridesappbucket.s3.amazonaws.com/malibu_2.png"
  }]

  for image in images:
    new_image = Image(
      car_id=image['car_id'],
      image_url=image['image_url']
    )

    db.session.add(new_image)

  db.session.commit()
  print('\n')
  print('Images were successfully seeded')
  print('\n')




def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
