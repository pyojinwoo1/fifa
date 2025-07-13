import React, { useState, useEffect } from "react";
import PlayerStats from "./PlayerStats";
import MatchHistory from "./MatchHistory";
import SquadVisualizer from "./SquadVisualizer";
import RecentWinRate from "./RecentWinRate";
import GoalTypeTable from "./GoalTypeTable";
import SquadList from "./SquadList";
import { fetchPlayerStats } from "../Api/fifaApi";

const MATCH_TYPE_OPTIONS = [
  { value: 50, label: "공식경기" },
  { value: 52, label: "감독 모드" },
  { value: 40, label: "친선경기" },
];

const PlayerDetail = ({ ouid, userInfo }) => {
  const [playerStats, setPlayerStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [matchType, setMatchType] = useState(50);

  useEffect(() => {
    if (!ouid) return;
    setLoading(true);
    fetchPlayerStats(ouid)
      .then((data) => {
        setPlayerStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [ouid]);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
      {/* 경기 타입 선택 버튼 */}
      <div className="flex justify-start gap-2 py-4">
        {MATCH_TYPE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setMatchType(opt.value)}
            className={`text-lg px-4 py-2 rounded-md transition ${matchType === opt.value
                ? "text-white font-extrabold"
                : "text-gray-400 font-bold hover:text-green-400 bg-transparent shadow-none"
              }`}
            style={
              matchType === opt.value
                ? {
                  background: "transparent",
                  boxShadow: "none",
                  paddingBottom: "6px",
                  borderBottom: "3px solid white",
                  fontWeight: 800,
                }
                : { background: "transparent", boxShadow: "none" }
            }
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* 상단 줄: (좌) Stats + RecentWinRate 묶음 | (우) GoalTypeTable */}
      <div className="flex flex-row gap-4">
        {/* Stats + RecentWinRate 묶음: 좌우 끝 고정, 간격 좁게 */}
        <div className="bg-neutral-900 rounded-xl shadow-lg px-4 py-4 w-[56%] flex justify-between items-start">
          {/* Stats (왼쪽 고정) */}
          <div className="flex flex-col gap-16 min-w-[200px]">
            {userInfo ? (
              <div>
                <div className="text-lg font-bold text-white mb-1">
                  <span className="font-bold">{userInfo.nickname}</span>
                </div>
                <div className="text-lg font-bold text-white mb-2">
                  LV: <span className="font-bold">{userInfo.level}</span>
                </div>
              </div>
            ) : (
              <div className="animate-pulse">
                <div className="h-6 w-32 bg-neutral-700 rounded mb-2" />
                <div className="h-6 w-20 bg-neutral-700 rounded" />
              </div>
            )}
            <PlayerStats stats={playerStats} loading={loading} />
          </div>

          {/* RecentWinRate (오른쪽 끝 고정) */}
          <div className="flex-shrink-0">
            <RecentWinRate ouid={ouid} matchType={matchType} />
          </div>
        </div>

        {/* GoalTypeTable (우측) */}
        <div className="bg-neutral-900 rounded-xl shadow-lg px-4 py-4 w-[46%] flex items-center justify-center">
          <GoalTypeTable ouid={ouid} matchType={matchType} />
        </div>
      </div>

      {/* 하단 줄: SquadVisualizer + 빈 박스 */}
      <div className="flex flex-row gap-4">
        {/* SquadVisualizer */}
        <div className="bg-neutral-900 rounded-xl shadow-lg p-4 w-[600px] flex items-center justify-center">
          <SquadVisualizer ouid={ouid} />
        </div>

        {/* 빈 박스 (GoalTypeTable과 비슷한 폭) */}
        <div className="bg-neutral-900 rounded-xl shadow-lg p-4 flex-1 flex items-start]">
          <div className="text-gray-400 w-[100%]"><SquadList ouid={ouid} />
          </div>
        </div>
      </div>

      {/* 최근 경기 기록 */}
      <MatchHistory ouid={ouid} matchType={matchType} />
    </div>
  );
};

export default PlayerDetail;
