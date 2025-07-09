import React, { useEffect, useState } from "react";
import { fetchMatchHistory, fetchMatchDetail } from "../Api/fifaApi";
import Modal from "./Modal";
import MatchDetailPopup from "./MatchDetailPopup";

// 결과별 배경색
const getResultColor = (result) => {
  if (result === "승") return "bg-gradient-to-r from-blue-500 to-blue-700";
  if (result === "패") return "bg-gradient-to-r from-red-500 to-red-700";
  if (result === "무") return "bg-gradient-to-r from-yellow-500 to-yellow-700";
  return "bg-gradient-to-r from-gray-600 to-gray-800";
};

const getMatchTypeLabel = (type) => {
  if (type === 50) return "공식경기";
  if (type === 52) return "감독모드";
  if (type === 40) return "친선경기";
  return `기타(${type})`;
};

// 스켈레톤 UI
const MatchHistorySkeleton = () => (
  <div className="w-full max-w-4xl flex flex-col gap-4 bg-neutral-800 rounded-xl p-6 animate-pulse">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="w-full rounded-lg bg-neutral-700 p-4">
        <div className="h-6 w-1/3 bg-neutral-600 rounded mb-2" />
        <div className="h-4 w-2/3 bg-neutral-600 rounded" />
      </div>
    ))}
  </div>
);

const MatchHistory = ({ ouid, matchType }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const getMatchHistory = async (ouid, matchType) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchMatchHistory(ouid, matchType);
      if (!data.matches) {
        setMatches([]);
        setLoading(false);
        return;
      }
      const details = await Promise.all(
        data.matches.map((matchId) => fetchMatchDetail(matchId))
      );
      setMatches(details);
    } catch (err) {
      setError("경기 정보를 불러오지 못했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!ouid) return;
    getMatchHistory(ouid, matchType);
  }, [ouid, matchType]);

  const openModal = (match) => {
    setSelectedMatch(match);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMatch(null);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {loading ? (
        <MatchHistorySkeleton />
      ) : (
        <div className="w-full max-w-6xl flex flex-col gap-4 bg-neutral-800 rounded-xl p-6">
          {error ? (
            <div className="text-red-400 font-semibold">{error}</div>
          ) : matches.length === 0 ? (
            <div className="text-gray-300">경기 기록이 없습니다.</div>
          ) : (
            matches.map((match, idx) => {
              if (!Array.isArray(match.matchInfo)) {
                return (
                  <div
                    key={idx}
                    className="w-full rounded-lg bg-neutral-800 p-4 text-white"
                  >
                    경기 참가자 정보를 불러올 수 없습니다.
                  </div>
                );
              }
              const myInfo = match.matchInfo.find((info) => info.ouid === ouid);
              const opponentInfo = match.matchInfo.find(
                (info) => info.ouid !== ouid
              );
              const result = myInfo?.matchDetail?.matchResult || "-";
              const resultColor = getResultColor(result);

              if (!myInfo || !opponentInfo) {
                return (
                  <div
                    key={idx}
                    className="w-full rounded-lg bg-neutral-800 p-4 text-white"
                  >
                    경기 참가자 정보를 불러올 수 없습니다.
                  </div>
                );
              }

              return (
                <div
                  key={idx}
                  className={`w-full rounded-lg ${resultColor} flex flex-col p-4 gap-2 shadow-lg text-white`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="font-bold text-lg min-w-[40px] text-center">
                      {result}
                    </div>
                    <div className="flex-1 flex items-center justify-center gap-4">
                      <span className="font-bold">{myInfo.nickname}</span>
                      <span className="text-2xl font-bold">
                        {myInfo.shoot?.goalTotalDisplay ?? 0}
                      </span>
                      <span className="text-2xl font-bold">:</span>
                      <span className="text-2xl font-bold">
                        {opponentInfo.shoot?.goalTotalDisplay ?? 0}
                      </span>
                      <span className="font-bold">{opponentInfo.nickname}</span>
                    </div>
                    <button
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs text-white"
                      onClick={() => openModal(match)}
                    >
                      경기데이터보기
                    </button>
                  </div>
                  <div className="flex justify-center gap-6 text-xs text-white/80 mt-2">
                    <span>
                      {myInfo.nickname}{" "}
                      {typeof myInfo.matchDetail?.possession !== "undefined"
                        ? myInfo.matchDetail.possession + "%"
                        : "-"}
                    </span>
                    <span>
                      {opponentInfo.nickname}{" "}
                      {typeof opponentInfo.matchDetail?.possession !== "undefined"
                        ? opponentInfo.matchDetail.possession + "%"
                        : "-"}
                    </span>
                    <span>{getMatchTypeLabel(match.matchType)}</span>
                    <span>
                      {match.matchDate
                        ? match.matchDate.slice(0, 16).replace("T", " ")
                        : match.date
                        ? match.date
                        : "-"}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={closeModal}>
        {selectedMatch && <MatchDetailPopup match={selectedMatch} ouid={ouid} />}
      </Modal>
    </div>
  );
};

export default MatchHistory;
