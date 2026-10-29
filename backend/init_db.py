from app import create_app, db
from app.models import Product
from app.routes.products import seed_products

app = create_app()

with app.app_context():
    db.create_all()
    seed_products()

    total = db.session.query(Product).count()
    print("Database initialized successfully!")
    print(f"Products stored in PostgreSQL: {total}")
