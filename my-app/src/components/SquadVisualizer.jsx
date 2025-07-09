// src/components/SquadVisualizer.jsx

import React, { useState, useEffect } from "react";
import {
  fetchMatchHistory,
  fetchMatchDetail,
  getPlayerMeta,
  getPositionMeta,
  getSeasonMeta,
  getPlayerImageUrl,
} from "../Api/fifaApi";
import 축구장 from "../assets/축구장.png";

// 포지션별 겹치지 않는 축구장 내 위치 (SUB 제외)
const gridLayout = {
  // 공격수
  ST:   { row: 1, col: 4 }, // 최상단
  CF:   { row: 2, col: 4 },
  RF:   { row: 2, col: 5 },
  LF:   { row: 2, col: 3 },
  RS:   { row: 2, col: 5 },
  LS:   { row: 2, col: 3 },
  RW:   { row: 2, col: 7 },
  LW:   { row: 2, col: 1 },

  // 공격형 미드필더
  CAM:  { row: 3, col: 4 },
  RAM:  { row: 3, col: 5 },
  LAM:  { row: 3, col: 3 },

  // 일반 미드필더
  RM:   { row: 4, col: 7 },
  RCM:  { row: 4, col: 5 },
  CM:   { row: 4, col: 4 },
  LCM:  { row: 4, col: 3 },
  LM:   { row: 4, col: 1 },

  // 수비형 미드필더
  CDM:  { row: 5, col: 4 },
  RDM:  { row: 5, col: 5 },
  LDM:  { row: 5, col: 3 },

  // 수비수
  RB:   { row: 6, col: 7 },
  RWB:  { row: 6, col: 7 },
  RCB:  { row: 6, col: 5 },
  CB:   { row: 6, col: 4 }, // CB는 한 줄 더 아래
  LCB:  { row: 6, col: 3 },
  LB:   { row: 6, col: 1 },
  LWB:  { row: 6, col: 1 },
  SW:   { row: 7, col: 4 },

  // 골키퍼
  GK:   { row: 8, col: 4 },
};


const PlayerImage = ({ player }) => {
  const [imgSrc, setImgSrc] = useState(getPlayerImageUrl(player.spId));

  const handleError = () => {
    setImgSrc("/fallback-player.png");
  };

  return (
    <div className="flex flex-col items-center space-y-1 text-center">
      <img
        src={imgSrc}
        alt={player.name || ""}
        className="w-[12%] min-w-[64px] max-w-[80px] h-auto object-contain"
        onError={handleError}
        draggable={false}
      />
      {/* 포지션명과 이름을 한 줄에 가로로 이어서 표시 */}
      <div className="flex flex-row items-center justify-center whitespace-nowrap">
        {player.positionName && player.positionName !== "Unknown" && (
          <span className="text-white text-xs font-semibold mr-1">{player.positionName}</span>
        )}
        {player.name && player.name !== "Unknown" && (
          <span className="text-gray-200 text-xs">{player.name}</span>
        )}
      </div>
      {player.seasonName && player.seasonName !== "Unknown" && (
        <span className="text-yellow-300 text-[10px]">{player.seasonName}</span>
      )}
    </div>
  );
};

const SquadSkeleton = () => (
  <div className="w-full h-full flex justify-center items-center">
    <div className="relative w-full h-full aspect-[5/8] max-w-[320px] max-h-[500px] rounded-2xl overflow-hidden bg-neutral-800 animate-pulse">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-neutral-900 to-neutral-800 opacity-70" />
      <div className="absolute inset-0 grid grid-cols-7 grid-rows-4 gap-0 w-full h-full">
        {[...Array(11)].map((_, i) => (
          <div
            key={i}
            className="flex justify-center items-center"
            style={{
              gridColumnStart: Math.floor(Math.random() * 7) + 1,
              gridRowStart: Math.floor(Math.random() * 4) + 1,
            }}
          >
            <div className="w-[12%] min-w-[28px] max-w-[48px] aspect-square bg-neutral-700 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SquadVisualizer = ({ ouid }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [squad, setSquad] = useState([]);

  useEffect(() => {
    if (!ouid) return;

    const loadSquad = async () => {
      setLoading(true);
      setError("");

      try {
        const [matchHistory, playerMeta, positionMeta, seasonMeta] = await Promise.all([
          fetchMatchHistory(ouid, 50, 0, 1),
          getPlayerMeta(),
          getPositionMeta(),
          getSeasonMeta(),
        ]);

        const match = matchHistory.matches[0];
        const matchId = typeof match === "string" ? match : match.matchId;
        const matchDetail = await fetchMatchDetail(matchId);

        const myInfo = matchDetail.matchInfo.find((info) => String(info.ouid) === String(ouid));
        if (!myInfo || !myInfo.player) throw new Error("스쿼드를 찾을 수 없습니다.");

        const startingPlayers = myInfo.player
          .filter((p) => p.spPosition !== 28)
          .slice(0, 11)
          .map((player) => {
            const meta = playerMeta.find((m) => String(m.id) === String(player.spId));
            const season = seasonMeta.find((s) => String(s.seasonId) === String(player.spId).slice(0, 3));
            const position = positionMeta.find((p) => p.spposition === player.spPosition);

            return {
              ...player,
              name: meta?.name,
              seasonName: season?.seasonName,
              positionName: position?.desc || player.spPositionName,
              positionKey: position?.desc,
            };
          });

        setSquad(startingPlayers);
      } catch (err) {
        console.error("스쿼드 로딩 실패:", err);
        setError("스쿼드를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadSquad();
  }, [ouid]);

  if (loading) return <SquadSkeleton />;
  if (error) return <div className="text-red-400 text-center py-8">{error}</div>;

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="relative w-full h-full aspect-[5/8] max-w-[580px] max-h-[650px] rounded-2xl overflow-hidden m-0">
        <img
          src={축구장}
          alt="구장배경"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 grid grid-cols-7 grid-rows-4 gap-0 w-full h-full">
          {squad.map((player, idx) => {
            const layout = gridLayout[player.positionKey] || { row: 2, col: 4 };
            return (
              <div
                key={`${player.spId}-${idx}`}
                style={{
                  gridColumnStart: layout.col,
                  gridRowStart: layout.row,
                }}
                className="flex justify-center items-center"
              >
                <PlayerImage player={player} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SquadVisualizer;
