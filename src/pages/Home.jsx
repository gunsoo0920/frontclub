import HomeCategory from "../components/HomeCategory"

export default function Home(props){
    
    const CategoryKey = Object.keys(props.bookCategory);

    function selectCategory(category){
        const selectBooks = props.books.filter(book => {
            return book.category === category;
        });
        return selectBooks.slice(0, 8);
    }

    return(
        <div>
            <HomeCategory category={CategoryKey[0]} 
                        books={selectCategory(CategoryKey[0])} 
                        title={props.bookCategory[CategoryKey[0]]}
                        setBookIdHandle={props.setBookIdHandle}
                        setCategoryHandle={props.setCategoryHandle}
            />
            {/* <HomeCategory category={CategoryKey[1]} books={selectCategory(CategoryKey[1])} title={bookCategory[CategoryKey[1]]}/>
            <HomeCategory category={CategoryKey[2]} books={selectCategory(CategoryKey[2])} title={bookCategory[CategoryKey[2]]}/> */}
        </div>
    )
}