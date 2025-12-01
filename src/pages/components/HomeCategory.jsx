export default function HomeCategory({books, title}){
    return(
        <selection className="category-section">
            <div className="section-header">
                <h3>{title} &gt;</h3>
                <p>관련된 설명을 적어주세요.</p>
            </div>
            <div className="item-list">
                {books.map(book => (
                    <div key={book.id}>
                        <img className="card-image" src={book.image_path} alt="" />
                        <div className="card-info">
                            <h4 className="card-title">{book.title}</h4>
                            <p>{book.authors}</p>
                        </div>
                    </div>
                ))}
            </div>
        </selection>
    );
}