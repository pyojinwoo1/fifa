// SquadList.jsx
import React, { useEffect, useState } from "react";
import { fetchPlayerStats, getPlayerImageUrl } from "../Api/fifaApi";

const SquadList = ({ ouid }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlayerStats = async () => {
      try {
        const statsData = await fetchPlayerStats(ouid);
        // 예시: statsData 안에 선수 배열이 있다고 가정 (실제 API 구조에 맞게 수정 필요)
        // 예: statsData.players 또는 statsData.playerList
        const playerList = statsData.players || [];

        // 선수 데이터에 이미지 URL 추가
        const enrichedPlayers = playerList.map((player) => ({
          ...player,
          imageUrl: getPlayerImageUrl(player.spId),
        }));

        setPlayers(enrichedPlayers);
      } catch (error) {
        console.error("플레이어 통계 데이터를 불러오는 데 실패했습니다:", error);
        setPlayers([]);
      } finally {
        setLoading(false);
      }
    };

    if (ouid) {
      loadPlayerStats();
    }
  }, [ouid]);

  if (loading) return <div className="text-gray-400">로딩 중...</div>;
  if (players.length === 0) return <div className="text-gray-400">플레이어 정보가 없습니다.</div>;

  return (
    <div className="w-full text-white">
      <table className="w-full table-fixed text-sm bg-neutral-800 rounded-lg overflow-hidden">
        <thead className="bg-neutral-700 text-gray-300">
          <tr>
            <th className="w-1/4 p-2 text-left">선수 이미지</th>
            <th className="w-1/4 p-2 text-left">이름</th>
            <th className="w-1/4 p-2 text-left">포지션</th>
            <th className="w-1/4 p-2 text-left">기타 정보</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, idx) => (
            <tr key={idx} className="border-b border-neutral-600 hover:bg-neutral-700">
              <td className="p-2">
                <img
                  src={player.imageUrl}
                  alt={player.name || "선수 이미지"}
                  className="w-12 h-12 rounded"
                />
              </td>
              <td className="p-2">{player.name || "이름 없음"}</td>
              <td className="p-2">{player.position || "-"}</td>
              <td className="p-2">{player.gradeName || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SquadList;
