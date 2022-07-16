import { useState } from "react";
import "./App.css";
import { Button, Navbar, Nav, Container } from "react-bootstrap";

function App() {
  let post = "인천 맛집"; //서버에서 가져온 데이터라고 생각해봅시다.
  let [작명, 변경함수] = useState([]); // Destructuring 문법입니다.(javascript)
  let [like, likeUp] = useState([0, 0, 0]);
  let [modal, setModal] = useState([0, 0, 0]); //현재 UI의 상태를 표현해라..자유롭게
  let [title, setTitle] = useState(0);
  let [입력값, set입력값] = useState("");
  let [date, setDate] = useState(["", "", ""]);
  return (
    <div className="App">
      <div className="black-nav">
        <h4 id={post} style={{ color: "red", fontSize: "16px" }}>
          IZM BLOG의 자유로운 포스팅
        </h4>
        
        <h4>프로필보기</h4>
      </div>
      {/* <div className="list">
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

      </div> */}
      {작명.map(function (a, i) {
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
              {작명[i]}
              <span
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

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  let copy = [...작명];
                  copy.splice(i, 1);
                  like.splice(i, 1);
                  변경함수(copy);
                }}
              >
                삭제
              </button>

              {
                modal[i] === 1 ? (
                  <Modal
                    title={title}
                    작명={작명}
                    변경함수={변경함수}
                    date={date}
                  />
                ) : null
                //modal이 true면 컴포넌트실행, false면 빈칸, 현재 state에 따라 컴포넌트를 실행할지 말지 결정하는 조건문,
                //왜 바로 모달을 달지 않나?
                //변경이 쉬운 state만 건드리면 자동으로 컴포넌트가 켜지도록하기 위함..
              }
            </h4>
            <p>{date[i]}</p>
          </div>
        );
      })}
      <input
        onChange={(e) => {
          set입력값(e.target.value);
          console.log(입력값);
        }}
      />{" "}
      <button
        onClick={(e) => {
          let copy = [...작명];
          let today = Date();
          copy.unshift(입력값);
          like.unshift(0);
          modal.unshift(0);
          if (입력값 !== "") {
            변경함수(copy);
            date.unshift(today);
          } else {
            alert("제목을 입력해주세요.");
          }
        }}
      >
        등록
      </button>

    </div>
    
  );
}

// function 함수(){
//   let a = 10; //모든 변수는 함수를 탈출 할 수 없다. props 문법을 써야함.
// }

//컴포넌트 만드는 법!
function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.작명[props.title]}</h4>
      <p>{props.date[props.num]}</p>
      <p>상세내용</p>
      <button
        onClick={() => {
          // 변경함수(["여자코트추천", "강남우동맛집", "코딩독학"]); //why? state전체를 갈아치워야 하기때문, 확장성이 없다.
          let copy = [props.작명[0]]; //...rest를 쓰는 이유는?? array나 object는 주소값을 가리키기때문. 이해완
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
