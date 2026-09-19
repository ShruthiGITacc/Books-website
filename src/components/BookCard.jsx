function BookCard({ book, onAddToCart }) {
  return (
    <article className="book-card">
      <div className="book-cover">
        <img
          src={book.coverImage}
          alt={book.title}
          loading="lazy"
        />

        <span className="category-badge">
          {book.category}
        </span>
      </div>

      <div className="book-info">
        <div className="rating">
          <span>★</span>
          {book.rating}
        </div>

        <h3>{book.title}</h3>

        <p className="author">{book.author}</p>

        <p className="description">
          {book.description}
        </p>

        <div className="book-bottom">
          <strong>₹{book.price}</strong>

          <button onClick={() => onAddToCart(book)}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default BookCard;
