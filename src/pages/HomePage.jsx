import { useState, useEffect } from "react"
import Home from "./Home";

export default function HomePage(){
    // 유저정보
    const [user, setUser] = useState("testuser");
    // 페이지 정보(main, review, login 등등)
    const [page, setPage] = useState("main");
    // 카테고리 - 목록용
    const [category, setCategory] = useState();
    // 책 설정
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

    const logInHandle = (e) =>{
        setUser(e.target.value);
        setPage("main");
    }

    return(
        <div>
            <PageHeader user={user} setPageHandle={setPageHandle} logOutHandle={logOutHandle}/>
            <PageBody page={page} setPageHandle={setPageHandle} user={user}/>
            <PageFooter/>
        </div>
    )
}

function PageHeader({user, setPageHandle, logOutHandle}){
    return(
        <header className="header">
            <div className="logo" onClick={() => setPageHandle("main")}>
                <h1>올빼미 서평</h1>
            </div>
            {user ?
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

function PageBody({page, category, bookId, user, setPageHandle}){
    switch(page){
        case "main":
            return <Home setPageHandle={setPageHandle}></Home>;
        case "login":
            // 
        case "book":
        case "review":
    }
}

function PageFooter(){

}
