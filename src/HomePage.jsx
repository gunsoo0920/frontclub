import { useState, useEffect } from "react"
import Home from "./pages/Home";
import Review from "./pages/Review";
import Login from "./pages/Login";
import Book from "./pages/Book";
import "./style/Home.css"

export default function HomePage(){
    
    // 책 데이터
    const [books, setBooks] = useState([]);
    useEffect(() => {
    fetch('http://localhost:3001/books')
        .then(response => response.json())
        .then(data => setBooks(data))
        .catch(error => console.error("데이터 로드 실패:", error));
    }, []);

    const bookCategory = {"DEV" : "개발, 프로그래밍", "AI" : "인공지능, 데이터 장르", "SELF" : " 자기계발, 공부법", 
        "NOVEL" : "소설, 에세이", "ESSAY" : "인문, 에세이" , "BIZ" : "경제, 경영, 스타트업", "KIDS" : " 유아, 아동" , "HOBBY": "취미, 라이프 스타일"}
    
    
    
    // 유저정보/String
    const [userId, setUser] = useState("testuser");
    // 페이지 정보(main, review, login 등등) / String
    const [page, setPage] = useState("main");
    // 카테고리 - 목록용/String
    const [category, setCategory] = useState();
    // 책 설정/String
    const [bookId, setBookId] = useState();



    const setPageHandle = (e) => {
        setPage(e)
    }

    const setCategoryHandle = (e) => {
        setCategory(e)
    }
    
    const setBookIdHandle = (e) => {
        setBookId(e)
    }

    // 로그아웃용
    const logOutHandle = (e) => {
        alert("로그아웃 되었습니다.");
        setUser(null);
        setPage("main");
    } ;

    // 유저 로그인
    const logInHandle = (e) =>{
        setUser(e.target.value);
        setPage("main");
    }

    function setBook(bookId, page){
        setPageHandle(page)
        setBookIdHandle(bookId)
    }

    function set_Category(category, page){
        setPageHandle(page)
        setCategoryHandle(category)
    }



    const pages = {
        "main": () => <Home 
                    setPageHandle={setPageHandle}
                    setBookIdHandle={setBook}
                    setCategoryHandle={set_Category}
                    books = {books}
                    bookCategory = {bookCategory}
                    />,
        "login": () => <Login />,
        "review": () => <Review />,
        "book": () => <Book />
    }


    return(
        <div>
            <div>page:{page}, userId:{userId}, category: {category}, bookId : {bookId}</div>
            <PageHeader userId={userId} setPageHandle={setPageHandle} logOutHandle={logOutHandle}/>

            {pages[page]() || <div>error</div>}
    
            <PageFooter/>
        </div>
    )
}





function PageHeader({userId, setPageHandle, logOutHandle}){
    return(
        <header className="header">
            <div className="logo" onClick={() => setPageHandle("main")}>
                <h1>올빼미 서평</h1>
            </div>
            {userId ?
                <div className="auth-buttons">
                    <button onClick={() => logOutHandle()} >로그아웃</button>
                    
                </div> 
                :
                <div className="auth-buttons">
                    <button onClick={() => setPageHandle("login")}>로그인</button>
                    <button>회원가입</button>
                </div> 
            }
        </header>
    )
}



function PageFooter(){

}
