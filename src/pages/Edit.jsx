import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  // 쿼리스트링
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");

  const mode = searchParams.get("mode");

  // 페이지 이동(강제이동)
  const navigate = useNavigate();

  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 에딧 입니다</p>
      <button onClick={() => setSearchParams({ who: "sunjin" })}>
        qs바꾸기
      </button>

      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        홈으로 이동
      </button>

      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
    </div>
  );
};

export default Edit;
