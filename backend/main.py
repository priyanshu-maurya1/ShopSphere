from app import create_app

app = create_app()

@app.get("/")
def home():
    return {
        "success": True,
        "message": "ShopSphere API is running!"
    }

@app.get("/health")
def health():
    return {
        "success": True,
        "status": "healthy"
    }

if __name__ == "__main__":
    app.run(debug=True, port=5000)