import React from 'react';

const getMatchTypeLabel = (type) => {
  if (type === 50) return "공식경기";
  if (type === 52) return "감독모드";
  if (type === 40) return "친선경기";
  return `기타(${type})`;
};

const MatchDetailPopup = ({ match, ouid }) => {
  if (!match || !ouid || !Array.isArray(match.matchInfo)) {
    return <div className="text-white text-center">경기 데이터를 불러오는 중...</div>;
  }

  const myInfo = match.matchInfo.find(info => info.ouid === ouid);
  const opponentInfo = match.matchInfo.find(info => info.ouid !== ouid);

  if (!myInfo || !opponentInfo) {
    return <div className="text-white text-center">경기 참가자 정보를 불러올 수 없습니다.</div>;
  }

  // 패스 성공률 계산 함수
  const getPassSuccessRate = (info) => {
    const success = info.pass?.passSuccess ?? 0;
    const tryCount = info.pass?.passTry ?? 0;
    return tryCount > 0 ? Math.round((success / tryCount) * 100) : "-";
  };

  return (
    <div className="text-white text-center">
      <div className="font-bold mb-2 text-lg">상세정보</div>
      <div className="mb-2 text-sm text-gray-300">
        {match.matchDate?.replace('T', ' ').slice(0, 16) || "-"}
      </div>

      {/* 점수 및 닉네임 표시 */}
      <div className="font-bold text-2xl mb-2 flex justify-center items-center gap-6">
        <span className="text-base text-gray-300">{myInfo.nickname}</span>
        <span className="text-2xl">{myInfo.shoot?.goalTotalDisplay ?? 0}</span>
        :
        <span className="text-2xl">{opponentInfo.shoot?.goalTotalDisplay ?? 0}</span>
        <span className="text-base text-gray-300">{opponentInfo.nickname}</span>
      </div>

      <div className="mb-4 text-xs text-gray-400">{getMatchTypeLabel(match.matchType)}</div>

      {/* 점유율 */}
      <div className="flex justify-center items-center gap-8 mb-4">
        <div>
          <div className="font-bold">{myInfo.matchDetail?.possession ?? "-"}</div>
          <div className="text-xs">{myInfo.nickname}</div>
        </div>
        <div className="h-8 w-1 bg-gray-500 rounded mx-2" />
        <div>
          <div className="font-bold">{opponentInfo.matchDetail?.possession ?? "-"}</div>
          <div className="text-xs">{opponentInfo.nickname}</div>
        </div>
      </div>

      {/* 주요 기록 */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>슈팅: {myInfo.shoot?.shootTotal ?? "-"}</div>
        <div>슈팅: {opponentInfo.shoot?.shootTotal ?? "-"}</div>

        <div>유효슈팅: {myInfo.shoot?.effectiveShootTotal ?? "-"}</div>
        <div>유효슈팅: {opponentInfo.shoot?.effectiveShootTotal ?? "-"}</div>

        <div>패스성공률: {getPassSuccessRate(myInfo)}%</div>
        <div>패스성공률: {getPassSuccessRate(opponentInfo)}%</div>

        <div>파울: {myInfo.matchDetail?.foul ?? "-"}</div>
        <div>파울: {opponentInfo.matchDetail?.foul ?? "-"}</div>

        <div>드리블: {myInfo.matchDetail?.dribble ?? "-"}</div>
        <div>드리블: {opponentInfo.matchDetail?.dribble ?? "-"}</div>

        <div>오프사이드: {myInfo.matchDetail?.offsideCount ?? "-"}</div>
        <div>오프사이드: {opponentInfo.matchDetail?.offsideCount ?? "-"}</div>
      </div>

      <div className="mt-4 text-xs text-gray-400"></div>
    </div>
  );
};

export default MatchDetailPopup;

