import { useState, useEffect } from "react"
import Home from "./Home";

export default function HomePage(){
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
        console.log(typeof e);
    }

    // 로그아웃용
    const logOutHandle = (e) => {
        alert("로그아웃 되었습니다.");
        setUser(null);
        setPage("main");
    } ;

    const logInHandle = (e) =>{
        setUser(e.target.value);
        setPage("main");
    }

    return(
        <div>
            <div>page:{page}, userId:{userId}, category: {category}, bookId : {bookId}</div>
            <PageHeader userId={userId} setPageHandle={setPageHandle} logOutHandle={logOutHandle}/>
            <PageBody 
                page={page} 
                category={category} 
                BookId={bookId} 
                userId={userId} 
                setPageHandle={setPageHandle}
                setBookIdHandle={setBookIdHandle}
                setCategoryHandle={setCategoryHandle}
            />
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

function PageBody({page, category, bookId, userId, setPageHandle, setBookIdHandle, setCategoryHandle}){
    switch(page){
        case "main":
            function setBook(bookId, page){
                setPageHandle(page)
                setBookIdHandle(bookId)
            }
            function setCategory(category, page){
                setPageHandle(page)
                setCategoryHandle(category)
            }
            return <Home 
                    setPageHandle={setPageHandle}
                    setBookIdHandle={setBook}
                    setCategoryHandle={setCategory}>
                </Home>;
        case "login":
            // 
        case "books":
        case "review":
    }
}

function PageFooter(){

}
