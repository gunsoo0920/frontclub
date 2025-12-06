import HomeCategory from "../components/HomeCategory"
import { useState, useEffect } from 'react';


export default function Home(props){
    const [books, setBooks] = useState([]);
    useEffect(() => {
    fetch('http://localhost:3001/books')
        .then(response => response.json())
        .then(data => setBooks(data))
        .catch(error => console.error("데이터 로드 실패:", error));
    }, []);

    const bookCategory = {"DEV" : "개발, 프로그래밍", "AI" : "인공지능, 데이터 장르", "SELF" : " 자기계발, 공부법", 
        "NOVEL" : "소설, 에세이", "ESSAY" : "인문, 에세이" , "BIZ" : "경제, 경영, 스타트업", "KIDS" : " 유아, 아동" , "HOBBY": "취미, 라이프 스타일"}
    const CategoryKey = Object.keys(bookCategory);

    function selectCategory(category){
        const selectBooks = books.filter(book => {
            return book.category === category;
        });
        return selectBooks.slice(0, 6);
    }

    return(
        <div>
            <HomeCategory category={CategoryKey[0]} 
                        books={selectCategory(CategoryKey[0])} 
                        title={bookCategory[CategoryKey[0]]}
                        setBookIdHandle={props.setBookIdHandle}
                        setCategoryHandle={props.setCategoryHandle}
            />
            {/* <HomeCategory category={CategoryKey[1]} books={selectCategory(CategoryKey[1])} title={bookCategory[CategoryKey[1]]}/>
            <HomeCategory category={CategoryKey[2]} books={selectCategory(CategoryKey[2])} title={bookCategory[CategoryKey[2]]}/> */}
            <button onClick={() => props.setPageHandle("review")}>리뷰 페이지</button>
        </div>
    )
}