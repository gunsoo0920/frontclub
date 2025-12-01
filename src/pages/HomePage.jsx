import { useState } from "react"
import Home from "./Home";

export default function HomePage(){
    const [user, setUser] = useState("testUser");
    const [page, setPage] = useState(1);

    const setUserHandle = (e) => {
        setUser(e.target.value);
    }

    const setPageHandle = (e) => {
        setPage(e)
    }

    return(
        <div>
            <PageHeader user={user}/>
            <PageBody page={page} setPageHandle={setPageHandle} user={user}/>
            <PageFooter/>
        </div>
    )
}

function PageHeader({user}){
    return(
        <div>
            <h1>유저 확인</h1>
            {user ? <h1>{user}</h1> : null}
        </div>
    )
}

function PageBody({page, setPageHandle}){
    switch(page){
        case 1:
            return <Home setPageHandle={setPageHandle}></Home>;
    }
}

function PageFooter(){

}
