import { useState } from "react";
import "./App.css";
import { Button, Navbar, Nav, Container } from "react-bootstrap";

function App() {
  let [내용, 변경함수] = useState([]); // Destructuring 문법입니다.(javascript)
  let [제목, 제목변경함수] = useState([]); // Destructuring 문법입니다.(javascript)

  let [like, likeUp] = useState([0, 0, 0]);
  let [modal, setModal] = useState([0, 0, 0]); //현재 UI의 상태를 표현해라..자유롭게
  let [title, setTitle] = useState(0);
  let [입력값, set입력값] = useState("");
  let [제목입력값, set제목입력값] = useState("");
  let [date, setDate] = useState(["", "", ""]);
  return (
    <div className="App">
      <div className="black-nav">
        <h4>IZM BLOG</h4>
      </div>

      {/* 리스팅부분 */}

      {내용.map(function (a, i) {
        return (
          <div className="list" key={i}>
            <h4
              onClick={(e) => {
                e.stopPropagation();
                let copy2 = [...modal];
                setTitle(i);

                if (copy2[i] === 0) {
                  copy2.fill(0);
                  copy2[i] = 1;
                } else if (copy2[i] === 1) {
                  copy2[i] = 0;
                }
                setModal(copy2);
                console.log(modal);
              }}
            >
              <h2>{제목[i]}</h2>
              <span
                style={{ marginRight: 5, color: "red" }}
                onClick={(e) => {
                  e.stopPropagation();
                  let copy = [...like]; //0,0,0
                  copy[i] = copy[i] + 1;
                  likeUp(copy); //파라미터에 기능을 넣어요..
                }}
              >
                ❤
              </span>
              {like[i]}
              <div className="delete">
                {date[i]}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    let copy = [...내용];
                    copy.splice(i, 1);
                    like.splice(i, 1);
                    변경함수(copy);
                  }}
                >
                  삭제
                </button>
              </div>

              {
                modal[i] === 1 ? (
                  <Modal
                    제목={제목}
                    title={title}
                    내용={내용}
                    변경함수={변경함수}
                    date={date}
                  />
                ) : null
                //modal이 true면 컴포넌트실행, false면 빈칸, 현재 state에 따라 컴포넌트를 실행할지 말지 결정하는 조건문,
                //왜 바로 모달을 달지 않나?
                //변경이 쉬운 state만 건드리면 자동으로 컴포넌트가 켜지도록하기 위함..
              }
            </h4>
          </div>
        );
      })}

      {/* 입력 창 */}

      <div className="inputing">
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          size="97"
          onChange={(e) => {
            set제목입력값(e.target.value);
            console.log(제목입력값);
          }}
        />
        <br />
        <br />
        <textarea
          cols="100"
          rows="20"
          placeholder="내용을 입력해주세요."
          onChange={(e) => {
            set입력값(e.target.value);
            console.log(입력값);
          }}
        />
        <br />
        <>
          <button
            onClick={(e) => {
              let copy = [...내용];
              let copy1 = [...제목];
              let today = Date();
              copy.unshift(입력값);
              copy1.unshift(제목입력값);
              like.unshift(0);
              modal.unshift(0);
              if (입력값 !== "") {
                변경함수(copy);
                제목변경함수(copy1);
                date.unshift(today);
              } else {
                alert("내용을 입력해주세요.");
              }
            }}
          >
            등록
          </button>
        </>
      </div>
    </div>
  );
}

// function 함수(){
//   let a = 10; //모든 변수는 함수를 탈출 할 수 없다. props 문법을 써야함.
// }

//컴포넌트 만드는 법!

// 클릭 후 모달창

function Modal(props) {
  return (
    <div className="modal">
      <p>{props.date[props.num]}</p>
      <p>{props.내용[props.title]}</p>
      <button
        onClick={() => {
          // 변경함수(["여자코트추천", "강남우동맛집", "코딩독학"]); //why? state전체를 갈아치워야 하기때문, 확장성이 없다.
          let copy = [props.내용[0]]; //...rest를 쓰는 이유는?? array나 object는 주소값을 가리키기때문. 이해완
          copy = ["여자코트추천", "강남우동맛집", "코딩독학"];
          props.변경함수(copy);
        }}
      >
        글수정
      </button>
    </div>
  );
}

export default App;
