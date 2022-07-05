import "./App.css";

function App() {
  let post = "인천 맛집"; //서버에서 가져온 데이터라고 생각해봅시다.
  return (
    <div className="App">
      <div className="black-nav">
        <h4 id={post} style={{ color: "red", fontSize: "16px" }}>
          블로그임
        </h4>
      </div>
      <h4>{post}</h4>
    </div>
  );
}

export default App;
