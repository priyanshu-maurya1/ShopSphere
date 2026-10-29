from flask import Blueprint, jsonify, request
from sqlalchemy import select

from app import db
from app.models import Product

products_bp = Blueprint("products", __name__)

INITIAL_PRODUCTS = [
    {"id": 1, "name": "Wireless Headphones", "category": "Electronics", "price": 1499, "rating": 4.5, "emoji": "🎧", "color": "#e0e7ff"},
    {"id": 2, "name": "Smart Watch", "category": "Electronics", "price": 2199, "rating": 4.7, "emoji": "⌚", "color": "#dcfce7"},
    {"id": 3, "name": "Running Shoes", "category": "Fashion", "price": 1799, "rating": 4.4, "emoji": "👟", "color": "#ffedd5"},
    {"id": 4, "name": "Travel Backpack", "category": "Accessories", "price": 999, "rating": 4.3, "emoji": "🎒", "color": "#fce7f3"},
    {"id": 5, "name": "Premium Sunglasses", "category": "Fashion", "price": 799, "rating": 4.2, "emoji": "🕶️", "color": "#fef3c7"},
    {"id": 6, "name": "Bluetooth Speaker", "category": "Electronics", "price": 1299, "rating": 4.6, "emoji": "🔊", "color": "#dbeafe"},
]


def serialize_product(product):
    return {
        "id": product.id,
        "name": product.name,
        "category": product.category,
        "price": float(product.price),
        "rating": product.rating,
        "emoji": product.emoji,
        "color": product.color,
    }


def seed_products():
    if db.session.scalar(select(Product.id).limit(1)) is not None:
        return

    db.session.add_all([Product(**item) for item in INITIAL_PRODUCTS])
    db.session.commit()


@products_bp.get("/")
def get_products():
    query = request.args.get("search", "").strip().lower()
    category = request.args.get("category", "").strip().lower()

    statement = select(Product)

    if query:
        statement = statement.where(
            db.func.lower(Product.name).contains(query)
        )

    if category and category != "all":
        statement = statement.where(
            db.func.lower(Product.category) == category
        )

    statement = statement.order_by(Product.id)
    products = db.session.scalars(statement).all()

    return jsonify({
        "success": True,
        "count": len(products),
        "products": [serialize_product(item) for item in products],
    })


@products_bp.get("/<int:product_id>")
def get_product(product_id):
    product = db.session.get(Product, product_id)

    if product is None:
        return jsonify({
            "success": False,
            "message": "Product not found",
        }), 404

    return jsonify({
        "success": True,
        "product": serialize_product(product),
    })
