import { useMemo, useState } from "react";
import books from "./data/books";
import Navbar from "./components/Navbar";
import BookGrid from "./components/BookGrid";
import CategoryFilter from "./components/CategoryFilter";
import "./index.css";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [cart, setCart] = useState([]);

  const categories = [
    "All",
    ...new Set(books.map((book) => book.category)),
  ];

  const filteredBooks = useMemo(() => {
    let result = books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || book.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "newest") {
      result.sort((a, b) => b.publishedYear - a.publishedYear);
    }

    return result;
  }, [search, category, sort]);

  const addToCart = (book) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === book.id);

      if (existing) {
        return currentCart.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...book, quantity: 1 }];
    });
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="app">
      <Navbar cartCount={cartCount} />

      <main>
        <section className="hero">
          <div>
            <span className="hero-badge">Discover your next read</span>

            <h1>
              Stories that
              <span> stay with you.</span>
            </h1>

            <p>
              Explore our collection of bestselling books, timeless
              classics, and inspiring stories.
            </p>

            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search books or authors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="catalog">
          <div className="catalog-header">
            <div>
              <h2>Explore Books</h2>
              <p>{filteredBooks.length} books found</p>
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">Sort by</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <CategoryFilter
            categories={categories}
            selected={category}
            onChange={setCategory}
          />

          <BookGrid
            books={filteredBooks}
            onAddToCart={addToCart}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
