import { useState } from "react";
import "./App.css";

function App() {
  let post = "인천 맛집"; //서버에서 가져온 데이터라고 생각해봅시다.
  let [작명, 변경함수] = useState(["남자코트추천", "강남우동맛집", "코딩독학"]); // Destructuring 문법입니다.(javascript)
  let [like, likeUp] = useState(0);
  let [modal, setModal] = useState(false); //현재 UI의 상태를 표현해라..자유롭게

  return (
    <div className="App">
      <div className="black-nav">
        <h4 id={post} style={{ color: "red", fontSize: "16px" }}>
          IZM
        </h4>
      </div>

      <button
        onClick={() => {
          let copy1 = [...작명];
          copy1.sort();
          변경함수(copy1);
        }}
      >
        가나다순 정렬
      </button>

      <button
        onClick={() => {
          // 변경함수(["여자코트추천", "강남우동맛집", "코딩독학"]); //why? state전체를 갈아치워야 하기때문, 확장성이 없다.
          let copy = [...작명]; //...rest를 쓰는 이유는?? array나 object는 주소값을 가리키기때문. 이해완
          copy[0] = "여자코트추천";
          변경함수(copy);
        }}
      >
        변경
      </button>

      <div className="list">
        <h4
          onClick={() => {
            // if (modal == false) {
            //   setModal(true);
            // } else {
            //   setModal(false);
            // }            충분히 가능한 코드다. but, 간단하게
            setModal(!modal); //!modal은 modal의 현재 state의 반대 값으로 변경해주는 것.... true면 false로, false면 true로...(true,false기에 가능한것)
          }}
        >
          {작명[0]}
        </h4>
        <p>2월 몇일 발행</p>
        <span
          onClick={() => {
            likeUp(like + 1); //파라미터에 기능을 넣어요..
          }}
        >
          ❤
        </span>
        {like}

        {/* 0을 state로 만들면 좋을듯? 자주 바뀌니까 */}
      </div>

      <div className="list">
        <h4>{작명[1]}</h4>
        <p>2월 몇일 발행</p>
      </div>

      <div className="list">
        <h4>{작명[2]}</h4>
        <p>2월 몇일 발행</p>
      </div>

      {
        modal === true ? <Modal /> : null
        //modal이 true면 컴포넌트실행, false면 빈칸, 현재 state에 따라 컴포넌트를 실행할지 말지 결정하는 조건문,
        //왜 바로 모달을 달지 않나?
        //변경이 쉬운 state만 건드리면 자동으로 컴포넌트가 켜지도록하기 위함..
      }
    </div>
  );
}

//컴포넌트 만드는 법!
function Modal() {
  return (
    <div className="modal">
      <h4>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  );
}

export default App;