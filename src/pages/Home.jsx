import HomeCategory from "./components/HomeCategory";
import { useState, useEffect } from 'react';
import './css/Home.css'

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
        return selectBooks.slice(0, 6);
    }

    return(
        <div>
            <HomeCategory books={selectCategory("DEV")} title="개발, 프로그래밍 장르"/>
            <button onClick={() => props.setPageHandle("review")}>리뷰 페이지</button>
        </div>
    )
}