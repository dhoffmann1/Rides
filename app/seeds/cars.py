from app.models import db, Car

def seed_cars():
  cars = [
  {
    "seller_id": 1,
    "year": 2018,
    "make": "Honda",
    "model": "CR-V",
    "trim": "EX-L",
    "miles": 44689,
    "price": 26405,
    "condition": "Excellent",
    "new": False,
    "ex_color": "Silver",
    "in_color": "Black",
    "drivetrain": "Front-wheel Drive",
    "mpg": 32,
    "fuel_type": "Gasoline",
    "transmission": "Automatic CVT",
    "engine": "1.5L I4 16V GDI DOHC Turbo"
  }]

  for car in cars:
    new_car = Car(
      seller_id = car["seller_id"],
      year = car["year"],
      make = car["make"],
      model = car["model"],
      trim = car["trim"],
      miles = car["miles"],
      price = car["price"],
      condition = car["condition"],
      new = car["new"],
      ex_color = car["ex_color"],
      in_color = car["in_color"],
      drivetrain = car["drivetrain"],
      mpg = car["mpg"],
      fuel_type = car["fuel_type"],
      transmission = car["transmission"],
      engine = car["engine"]
    )

    db.session.add(new_car)

  db.session.commit()
  print('Cars were successfully seeded')

def undo_cars():
    db.session.execute('TRUNCATE cars RESTART IDENTITY CASCADE;')
    db.session.commit()
