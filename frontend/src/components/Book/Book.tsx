
import './Book.css';
const Book = () => {
    const book = {
        title: 'The Great Gatsby',
        coverImage: 'https://demo.vercel.store/product/acme-geometric-circles-t-shirthttps://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fbaby-onesie-white-1.png%3Fv%3D1690002631&w=1920&q=75',
        description: 'A classic novel by F. Scott Fitzgerald, set in the Roaring Twenties and exploring themes of wealth, society, and the American Dream.',
        price: 19.99
    };

    return (
        <div className="book-container">
            <h1 className="book-title">{book.title}</h1>
            <div className="flex-container">
                <div className="image-container">
                    <img src={book.coverImage} alt={book.title} className="book-image" />
                </div>
                <div className="info-container">
                    <h2 className="book-description-title">Description</h2>
                    <p className="book-description">{book.description}</p>
                    <h3 className="book-price">Price: ${book.price}</h3>
                </div>
            </div>
        </div>
    );
};

export default Book;
