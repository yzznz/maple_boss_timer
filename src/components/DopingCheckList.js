import CheckBox from "./CheckBox";

const DopingCheckList = () => {
  const CheckBeforeDopingArr = [
    "링크",
    "유니온",
    "5차 코어",
    "하이퍼 스탯",
    "장비 스위칭",
    "칭호, 훈장, 시드링",
    "스킬 이펙트 줄이기",
    "버프프리저",
    "유니온의 행운 사오기",
  ];
  const DopingListArr = [
    "영웅의 메아리",
    "반짝이는 빨간 별 물약",
    "고급 대영웅의 비약",
    "향상된 10단계 물약(주스탯)",
    "향상된 10단계 물약(부스탯)",
    "익스트림 레드/블루/그린",
    "유니온의 힘 3단계",
    "MVP 슈퍼파워 버프",
    "길드의 더 큰 축복",
    "마슈르의 선물 기상 효과(우뿌)",
    "Lv.275의자 공/마 +50",
    "길드스킬(노블)",
    "캐시샵 기상효과(붕뿌)",
  ];
  const AdditionalDopingArr = [
    "헤븐즈 도어(목숨 +1)",
    "어드밴스드 블레스(공/마 +30)",
    "하울링 (공/마 +10%)",
    "샤프 아이즈 (크뎀 +15%)",
    "스피릿 블레이드 (구 분노, 공 +30)",
    "컴뱃 오더스(4차 스킬 +2)",
  ];

  return (
    <div className="dopingchecklist">
      <div className="checkbeforedoping">
        <span className="title">도핑 전 확인</span>
        {CheckBeforeDopingArr.map((e, key) => (
          <CheckBox key={key} value={e} />
        ))}
      </div>
      <div className="dopingstart">
        <span className="title">도핑 리스트</span>
        {DopingListArr.map((e, key) => (
          <CheckBox key={key} value={e} />
        ))}
      </div>
      <div className="dopingstart">
        <span className="title">추가 도핑</span>
        {AdditionalDopingArr.map((e, key) => (
          <CheckBox key={key} value={e} />
        ))}
      </div>
    </div>
  );
};
export default DopingCheckList;
