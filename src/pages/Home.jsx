import HomeCategory from "./components/HomeCategory";
import { useState, useEffect } from 'react';

export default function Home(props){
    const [books, setBooks] = useState([]);
    useEffect(() => {
    fetch('http://localhost:3001/books')
        .then(response => response.json())
        .then(data => setBooks(data))
        .catch(error => console.error("데이터 로드 실패:", error));
    }, []);

    function selectCategory(category){
        const selectBooks = books.filter(book => {
            return book.category === category;
        });
        return selectBooks;
    }

    return(
        <div>
            <HomeCategory books={selectCategory("DEV")}/>
            <HomeCategory books={selectCategory("AI")}/>
            <HomeCategory books={selectCategory("SELF")}/>
            <HomeCategory books={selectCategory("NOVEL")}/>
            <button onClick={() => props.setPageHandle(2)}>2페이지로 이동</button>
        </div>
    )
}