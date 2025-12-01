export default function HomeCategory({books}){
    return(
         <ul>
                {books.map(book => (
                    <li key={book.id}>
                        {book.id}: {book.title} - {book.author}
                    </li>
                ))}
            </ul>
    );
}