from app.models import db, Image

def seed_images():
  images = [
  {
    "car_id": 1,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/12205f8e-9282-546f-8eb6-17a0aa07a62d/84215020-be9a-41d1-bdab-2afab3bc7ca7/C9z7QEmg63f45smoN5RuK318lj4.jpg"
  },
  {
    "car_id": 1,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/12205f8e-9282-546f-8eb6-17a0aa07a62d/84215020-be9a-41d1-bdab-2afab3bc7ca7/C9z7QEmg63f45smoN5RuK318lj4.jpg"
  },
  {
    "car_id": 1,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/12205f8e-9282-546f-8eb6-17a0aa07a62d/84215020-be9a-41d1-bdab-2afab3bc7ca7/C9z7QEmg63f45smoN5RuK318lj4.jpg"
  },
  {
    "car_id": 1,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/12205f8e-9282-546f-8eb6-17a0aa07a62d/84215020-be9a-41d1-bdab-2afab3bc7ca7/C9z7QEmg63f45smoN5RuK318lj4.jpg"
  },
  {
    "car_id": 1,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/12205f8e-9282-546f-8eb6-17a0aa07a62d/84215020-be9a-41d1-bdab-2afab3bc7ca7/C9z7QEmg63f45smoN5RuK318lj4.jpg"
  },
  {
    "car_id": 2,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/12205f8e-9282-546f-8eb6-17a0aa07a62d/84215020-be9a-41d1-bdab-2afab3bc7ca7/C9z7QEmg63f45smoN5RuK318lj4.jpg"
  },
  {
    "car_id": 2,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/12205f8e-9282-546f-8eb6-17a0aa07a62d/84215020-be9a-41d1-bdab-2afab3bc7ca7/C9z7QEmg63f45smoN5RuK318lj4.jpg"
  },
  {
    "car_id": 2,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/12205f8e-9282-546f-8eb6-17a0aa07a62d/84215020-be9a-41d1-bdab-2afab3bc7ca7/C9z7QEmg63f45smoN5RuK318lj4.jpg"
  },
  {
    "car_id": 2,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/12205f8e-9282-546f-8eb6-17a0aa07a62d/84215020-be9a-41d1-bdab-2afab3bc7ca7/C9z7QEmg63f45smoN5RuK318lj4.jpg"
  },
  {
    "car_id": 2,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/12205f8e-9282-546f-8eb6-17a0aa07a62d/84215020-be9a-41d1-bdab-2afab3bc7ca7/C9z7QEmg63f45smoN5RuK318lj4.jpg"
  },
  {
    "car_id": 3,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/12205f8e-9282-546f-8eb6-17a0aa07a62d/84215020-be9a-41d1-bdab-2afab3bc7ca7/C9z7QEmg63f45smoN5RuK318lj4.jpg"
  },
  {
    "car_id": 3,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/12205f8e-9282-546f-8eb6-17a0aa07a62d/84215020-be9a-41d1-bdab-2afab3bc7ca7/C9z7QEmg63f45smoN5RuK318lj4.jpg"
  },
  {
    "car_id": 3,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/12205f8e-9282-546f-8eb6-17a0aa07a62d/84215020-be9a-41d1-bdab-2afab3bc7ca7/C9z7QEmg63f45smoN5RuK318lj4.jpg"
  },
  {
    "car_id": 3,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/12205f8e-9282-546f-8eb6-17a0aa07a62d/84215020-be9a-41d1-bdab-2afab3bc7ca7/C9z7QEmg63f45smoN5RuK318lj4.jpg"
  },
  {
    "car_id": 3,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/12205f8e-9282-546f-8eb6-17a0aa07a62d/84215020-be9a-41d1-bdab-2afab3bc7ca7/C9z7QEmg63f45smoN5RuK318lj4.jpg"
  },
  {
    "car_id": 4,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/12205f8e-9282-546f-8eb6-17a0aa07a62d/84215020-be9a-41d1-bdab-2afab3bc7ca7/C9z7QEmg63f45smoN5RuK318lj4.jpg"
  },
  {
    "car_id": 4,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/12205f8e-9282-546f-8eb6-17a0aa07a62d/84215020-be9a-41d1-bdab-2afab3bc7ca7/C9z7QEmg63f45smoN5RuK318lj4.jpg"
  },
  {
    "car_id": 4,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/12205f8e-9282-546f-8eb6-17a0aa07a62d/84215020-be9a-41d1-bdab-2afab3bc7ca7/C9z7QEmg63f45smoN5RuK318lj4.jpg"
  },
  {
    "car_id": 4,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/12205f8e-9282-546f-8eb6-17a0aa07a62d/84215020-be9a-41d1-bdab-2afab3bc7ca7/C9z7QEmg63f45smoN5RuK318lj4.jpg"
  },
  {
    "car_id": 4,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/12205f8e-9282-546f-8eb6-17a0aa07a62d/84215020-be9a-41d1-bdab-2afab3bc7ca7/C9z7QEmg63f45smoN5RuK318lj4.jpg"
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
