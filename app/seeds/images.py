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
    "image_url": "https://cdn.jdpower.com/JDPA_2020-Chevrolet-Malibu-RS-Red-Front-Quarter.jpg"
  },
  {
    "car_id": 3,
    "image_url": "https://autoimage.capitalone.com/cms/Auto/assets/images/1117-hero-C1-2021-Chevrolet-Camaro-3LT-1LE-Red-Front-Quarter-Left.jpg"
  },
  {
    "car_id": 4,
    "image_url": "https://media.ed.edmunds-media.com/chevrolet/malibu/2016/oem/2016_chevrolet_malibu_sedan_premier_fq_oem_1_1600.jpg"
  },
  {
    "car_id": 5,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/590f6265-de65-5bdd-a201-5d577f61faa1/15499ead-4339-4db4-8e19-035f971dff33/Aytr9Gy7wTj9NJ_YLSJo8iI0VcA.jpg"
  },
  {
    "car_id": 5,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/590f6265-de65-5bdd-a201-5d577f61faa1/15499ead-4339-4db4-8e19-035f971dff33/5E2KHo8H9Ad6fD6qGjugID7hKcU.jpg"
  },
  {
    "car_id": 5,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/590f6265-de65-5bdd-a201-5d577f61faa1/15499ead-4339-4db4-8e19-035f971dff33/DWCE1qEIHYPHpEVFWgGNGQ_qHp4.jpg"
  },
  {
    "car_id": 5,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/590f6265-de65-5bdd-a201-5d577f61faa1/15499ead-4339-4db4-8e19-035f971dff33/NM_jg9aYGH1UneXYYTbZxf-cOkQ.jpg"
  },
  {
    "car_id": 5,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/590f6265-de65-5bdd-a201-5d577f61faa1/15499ead-4339-4db4-8e19-035f971dff33/z5BhpIYrjqNL5hXBbUsedTxN_qc.jpg"
  },
  {
    "car_id": 5,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/590f6265-de65-5bdd-a201-5d577f61faa1/15499ead-4339-4db4-8e19-035f971dff33/AIbFTPVwclq_io9uXk2NchKMavw.jpg"
  },
  {
    "car_id": 5,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/590f6265-de65-5bdd-a201-5d577f61faa1/15499ead-4339-4db4-8e19-035f971dff33/V59ZfV1ACVvQ-02o2E_jfDVr-tk.jpg"
  },
  {
    "car_id": 5,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/590f6265-de65-5bdd-a201-5d577f61faa1/15499ead-4339-4db4-8e19-035f971dff33/JZyMFtpxRPN9QKQmPL7ZJId_7Vw.jpg"
  },
  {
    "car_id": 5,
    "image_url": "https://platform.cstatic-images.com/xlarge/in/v2/590f6265-de65-5bdd-a201-5d577f61faa1/15499ead-4339-4db4-8e19-035f971dff33/V5rRH_215QQPryYL2FQsovozB0Y.jpg"
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
