import { useState, useEffect } from "react"
import Home from "./Home";

export default function HomePage(){
    const [user, setUser] = useState("testuser");
    const [page, setPage] = useState("main");

    const setUserHandle = (e) => {
        setUser(e.target.value);
    }

    const setPageHandle = (e) => {
        setPage(e)
    }

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

function PageBody({page, setPageHandle}){
    switch(page){
        case "main":
            return <Home setPageHandle={setPageHandle}></Home>;
        case "login":
        case "book":
        case "review":
    }
}

function PageFooter(){

}
