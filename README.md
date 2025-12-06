# update

## 페이지 위치

```
src
│  HomePage.jsx - 메인페이지(App.jsx대신 사용)
│
├─components
│      HomeCategory.jsx
├─pages
│      Home.jsx
└─style
        Home.css
```

## 저장 데이터

+ 임의 저장
  1. 로그인 유저 : 로그인 (Login)
    ``` react
    const [userId, setUser] = useState("testuser");
    ```

  2. 현재 페이지 Book, Home, Login, Review
    ``` react
    const [page, setPage] = useState("main");
    ```

  3. 카테고리 : 목록:(Book)
  ``` react
  const [category, setCategory] = useState();
  ```
  
  4. 책 id : 서평(review)
  ``` react
  const [bookId, setBookId] = useState();
  ```

+ 책 데이터
  - books에 모든 책 데이터 가져옴(list)
    ``` react
    const [books, setBooks] = useState([]);
      
    useEffect(() => {
      fetch('http://localhost:3001/books')
          .then(response => response.json())
          .then(data => setBooks(data))
          .catch(error => console.error("데이터 로드 실패:"error));
    }, []);
    ```
  
  + books 사용법 

    - 선택
    ```react
    <div>{books[0]["id"]}</div>
    ```

    - map
    ```react
    <div>
      {books.map(item => (
          <div key={item.id}>{item.title}</div>
      ))}
    </div>
    ```

## 페이지
- 저장시 페이지 이동
  ``` react
  const [page, setPage] = useState("main");
  ```

- 페이지 정보 보내기
  ```react
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
  ```
  원하는 정보를 혹은 함수를 보냄
  ```react
  함수 예시
  const setPageHandle = (e) => {
        setPage(e)
  }
  ```