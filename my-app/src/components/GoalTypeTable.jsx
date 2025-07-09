import React, { useState, useEffect } from "react";
import { fetchMatchHistory, fetchMatchDetail } from "../Api/fifaApi";

// 골 유형 매핑
const TYPE_MAP = {
  6: "Grounder",
  2: "CurveShot",
  1: "MiddleShot",
  3: "Header",
  12: "PenaltyKick",
};

const GOAL_TYPE_MAP = {
  CurveShot: "Z + D",
  MiddleShot: "D",
  Header: "헤딩",
  Grounder: "D + D",
  PenaltyKick: "F + D"
};

const GOAL_TYPE_LIST = Object.values(GOAL_TYPE_MAP);

// 스켈레톤 컴포넌트
const TableSkeleton = () => (
  <div className="my-6 w-full max-w-lg mx-auto flex flex-col gap-1 animate-pulse">
    <div className="h-6 w-48 bg-neutral-700 rounded mb-4 mx-auto" />
    <div className="w-full bg-[#18181c] rounded-xl overflow-hidden">
      <div className="flex flex-row">
        <div className="h-8 w-1/3 bg-neutral-700" />
        <div className="h-8 w-1/3 bg-neutral-700" />
        <div className="h-8 w-1/3 bg-neutral-700" />
      </div>
      {[...Array(5)].map((_, i) => (
        <div className="flex flex-row" key={i}>
          <div className="h-8 w-1/3 bg-neutral-800" />
          <div className="h-8 w-1/3 bg-neutral-800" />
          <div className="h-8 w-1/3 bg-neutral-800" />
        </div>
      ))}
    </div>
  </div>
);

const GoalTypeTable = ({ ouid, matchType = 50 }) => {
  const [loading, setLoading] = useState(true);
  const [scoreCount, setScoreCount] = useState({});
  const [concedeCount, setConcedeCount] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ouid) return;
    setLoading(true);
    setError("");

    fetchMatchHistory(ouid, matchType, 0, 10)
      .then(async (data) => {
        const details = await Promise.all(
          data.matches.map((id) => fetchMatchDetail(id))
        );

        const score = {};
        const concede = {};
        GOAL_TYPE_LIST.forEach((t) => {
          score[t] = 0;
          concede[t] = 0;
        });

        details.forEach((match) => {
          const myInfo = match.matchInfo.find((info) => info.ouid === ouid);
          const enemyInfo = match.matchInfo.find((info) => info.ouid !== ouid);

          if (!myInfo || !enemyInfo) return;

          myInfo.shootDetail.forEach((shoot) => {
            if (shoot.result === 3) {
              const typeKey = TYPE_MAP[shoot.type];
              const korType = GOAL_TYPE_MAP[typeKey];
              if (korType) score[korType]++;
            }
          });

          enemyInfo.shootDetail.forEach((shoot) => {
            if (shoot.result === 3) {
              const typeKey = TYPE_MAP[shoot.type];
              const korType = GOAL_TYPE_MAP[typeKey];
              if (korType) concede[korType]++;
            }
          });
        });

        setScoreCount(score);
        setConcedeCount(concede);
      })
      .catch(() => {
        setError("득점/실점 유형 정보를 불러오지 못했습니다.");
        setLoading(false);
      }).finally(() => {
        setLoading(false);
      });
  }, [ouid, matchType]);

  if (loading) return <TableSkeleton />;
  if (error) return <div className="text-center text-red-400">{error}</div>;

  return (
    <div className="my-6 w-full max-w-lg mx-auto flex flex-col gap-1">
      <h3 className="text-lg font-bold text-center text-white mb-4">
        최근 10경기 득점 및 실점 유형
      </h3>
      <table className="w-full text-center bg-[#18181c] rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-[#23232a] text-white">
            <th className="py-2">골 유형</th>
            <th className="py-2">득점</th>
            <th className="py-2">실점</th>
          </tr>
        </thead>
        <tbody>
          {GOAL_TYPE_LIST.map((type) => (
            <tr key={type} className="border-b border-[#23232a]">
              <td className="py-2 text-white">{type}</td>
              <td className="py-2 text-blue-400">{scoreCount[type]}</td>
              <td className="py-2 text-red-400">{concedeCount[type]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GoalTypeTable;
