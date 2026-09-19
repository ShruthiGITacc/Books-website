import BookCard from "./BookCard";

function BookGrid({ books, onAddToCart }) {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <h3>No books found</h3>
        <p>Try a different search or category.</p>
      </div>
    );
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default BookGrid;
