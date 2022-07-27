import { useEffect } from "react";

const Notice = ({ date, desc }) => {
  return (
    <div className={`notice`}>
      <div className="date">{date}</div>
      <div className="desc">{desc}</div>
    </div>
  );
};

const Update = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = "보스타이머 - 업데이트 내역";
  }, []);
  return (
    <div className="update">
      <header>★업데이트 내역</header>
      <article>
        <Notice
          date="2022-07-28"
          desc={`루시드, 진힐라 현재시간 조정버튼 추가.\n오류문의 환영합니다.`}
        />

        <Notice
          date="2022-07-16"
          desc="진힐라 하드모드 3페이즈 패턴시간 변경
          (100초 -> 101초)"
        />
        <Notice
          date="2022-07-15"
          desc="진힐라 페이즈 변경시 패턴시간 오류 개선"
        />
      </article>
    </div>
  );
};
export default Update;
