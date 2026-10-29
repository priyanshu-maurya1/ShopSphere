import { useEffect, useState } from 'react'
import './App.css'
import { getProducts } from './services/api'

function App() {
  const [cartCount, setCartCount] = useState(0)
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadProducts() {
      try {
        setLoading(true)
        setError('')

        const data = await getProducts()

        if (active) {
          setProducts(data)
        }
      } catch (err) {
        if (active) {
          setError(
            'Products load nahi ho paaye. Please check whether the backend is running.',
          )
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      active = false
    }
  }, [])

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="shop">
      <div className="announcement">
        Welcome to ShopSphere — Your world, your shopping destination!
      </div>

      <header className="navbar">
        <a className="logo" href="#home">
          Shop<span>Sphere</span>
          <span className="logo-dot">.</span>
        </a>

        <div className="search-box">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search products"
          />
        </div>

        <nav className="nav-actions">
          <a href="#products">Products</a>
          <a href="#categories">Categories</a>

          <button
            className="cart-button"
            onClick={() =>
              window.alert(`You have ${cartCount} item(s) in your cart.`)
            }
          >
            🛒 Cart <span className="cart-count">{cartCount}</span>
          </button>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="hero-tag">THE NEW WAY TO SHOP</span>

            <h1>
              Discover products.
              <br />
              <span>Love every purchase.</span>
            </h1>

            <p>
              Explore products you'll love, discover everyday essentials,
              and enjoy a shopping experience designed around you.
            </p>

            <a href="#products" className="primary-button">
              Explore Collection <span>→</span>
            </a>

            <div className="hero-stats">
              <div>
                <strong>500+</strong>
                <span>Products to explore</span>
              </div>

              <div>
                <strong>4.8/5</strong>
                <span>Customer satisfaction</span>
              </div>

              <div>
                <strong>24/7</strong>
                <span>Online shopping</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-circle"></div>

            <div className="floating-card card-one">
              <span>🎧</span>
              <div>
                <strong>Trending now</strong>
                <p>Wireless audio</p>
              </div>
            </div>

            <div className="hero-product">🛍️</div>

            <div className="floating-card card-two">
              <span>✨</span>
              <div>
                <strong>Made for you</strong>
                <p>Discover your style</p>
              </div>
            </div>
          </div>
        </section>

        <section className="categories" id="categories">
          <div className="section-heading">
            <div>
              <span className="eyebrow">BROWSE YOUR FAVORITES</span>
              <h2>Shop by category</h2>
            </div>
          </div>

          <div className="category-list">
            <a href="#products" onClick={() => setSearch('')}>
              <span>🛍️</span>
              <strong>All Products</strong>
            </a>

            <a href="#products" onClick={() => setSearch('')}>
              <span>💻</span>
              <strong>Electronics</strong>
            </a>

            <a href="#products" onClick={() => setSearch('')}>
              <span>👕</span>
              <strong>Fashion</strong>
            </a>

            <a href="#products" onClick={() => setSearch('')}>
              <span>🎒</span>
              <strong>Accessories</strong>
            </a>
          </div>
        </section>

        <section className="products-section" id="products">
          <div className="section-heading">
            <div>
              <span className="eyebrow">OUR COLLECTION</span>
              <h2>Popular products</h2>
              <p>Find something you'll love.</p>
            </div>

            <span className="product-count">
              {loading ? 'Loading...' : `${filteredProducts.length} products`}
            </span>
          </div>

          {loading && (
            <div className="empty-state">
              <span>⏳</span>
              <h3>Loading products...</h3>
              <p>Please wait while we fetch products from our server.</p>
            </div>
          )}

          {error && (
            <div className="empty-state" role="alert">
              <span>⚠️</span>
              <h3>Unable to load products</h3>
              <p>{error}</p>

              <button
                className="add-button"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <article className="product-card" key={product.id}>
                    <div
                      className="product-image"
                      style={{ backgroundColor: product.color }}
                    >
                      <span className="product-emoji">{product.emoji}</span>
                      <span className="product-category">
                        {product.category}
                      </span>
                    </div>

                    <div className="product-info">
                      <div className="rating">★ {product.rating}</div>

                      <h3>{product.name}</h3>

                      <div className="product-bottom">
                        <strong>
                          ₹{Number(product.price).toLocaleString('en-IN')}
                        </strong>

                        <button
                          className="add-button"
                          onClick={() =>
                            setCartCount((count) => count + 1)
                          }
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="empty-state">
                  <span>🔍</span>
                  <h3>No products found</h3>
                  <p>Try searching with a different product name.</p>

                  <button
                    className="add-button"
                    onClick={() => setSearch('')}
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        <section className="newsletter">
          <div>
            <span className="eyebrow">STAY IN THE LOOP</span>
            <h2>Good finds. Great updates.</h2>
            <p>Our shopping experience is just getting started.</p>
          </div>

          <a href="#products" className="newsletter-button">
            Explore products →
          </a>
        </section>
      </main>

      <footer className="footer">
        <a className="logo" href="#home">
          Shop<span>Sphere</span>
          <span className="logo-dot">.</span>
        </a>

        <p>Discover more. Shop smarter.</p>

        <span>© 2026 ShopSphere. Built with React.</span>
      </footer>
    </div>
  )
}

export default App