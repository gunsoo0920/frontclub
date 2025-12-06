export default function HomeCategory(props){
    return(
        <selection className="category-section">
            <div className="section-header" onClick={() => (props.setCategoryHandle(props.category, "books"))}>
                <h3>{props.title} &gt;</h3>
                <p>관련된 설명을 적어주세요.</p>
            </div>
            <div className="item-list">
                {props.books.map(book => (
                    <div key={book.id} onClick={() => props.setBookIdHandle(book.id, "review")}>                        <img className="card-image" src={book.image_path} alt="" />
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