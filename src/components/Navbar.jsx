function Navbar({ cartCount }) {
  return (
    <header className="navbar">
      <div className="logo">
        <span>📚</span>
        BookNest
      </div>

      <nav>
        <a href="#books">Books</a>
        <a href="#categories">Categories</a>
        <a href="#about">About</a>
      </nav>

      <button className="cart-button">
        🛒
        <span>{cartCount}</span>
      </button>
    </header>
  );
}

export default Navbar;
