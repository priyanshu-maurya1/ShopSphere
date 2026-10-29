from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)

    app.config.from_object("app.config.Config")

    if not app.config.get("SQLALCHEMY_DATABASE_URI"):
        raise RuntimeError(
            "DATABASE_URL is missing. Please configure it in backend/.env"
        )

    db.init_app(app)

    CORS(app, origins=["http://localhost:5173"])

    from app.routes.products import products_bp
    app.register_blueprint(products_bp, url_prefix="/api/products")

    return app
