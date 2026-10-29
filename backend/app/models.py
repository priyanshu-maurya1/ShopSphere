from app import db


class Product(db.Model):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    category = db.Column(db.String(80), nullable=False, index=True)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    emoji = db.Column(db.String(20), nullable=False)
    color = db.Column(db.String(20), nullable=False)
