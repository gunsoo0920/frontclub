import HomeCategory from "./components/HomeCategory";

export default function Home(props){
    return(
        <div>
            <button onClick={() => props.setPageHandle(2)}>2페이지로 이동</button>
            <HomeCategory/>
        </div>
    )
}