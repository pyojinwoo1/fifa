import React, { useEffect, useState, useRef } from "react";
import { fetchMatchHistory, fetchMatchDetail } from "../Api/fifaApi";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const RecentWinRate = ({ ouid, matchType }) => {
  const [loading, setLoading] = useState(true);
  const [win, setWin] = useState(0);
  const [draw, setDraw] = useState(0);
  const [lose, setLose] = useState(0);
  const [error, setError] = useState("");
  const chartRef = useRef(null);

  useEffect(() => {
    if (!ouid) return;
    setLoading(true);
    setError("");

    fetchMatchHistory(ouid, matchType, 0, 10)
      .then(async (data) => {
        if (!data.matches || data.matches.length === 0) {
          setError("최근 경기 기록이 없습니다.");
          setLoading(false);
          return;
        }

        const details = await Promise.all(
          data.matches.map((id) => fetchMatchDetail(id))
        );

        let w = 0, d = 0, l = 0;
        details.forEach((match) => {
          const myInfo = match.matchInfo.find((info) => info.ouid === ouid);
          if (!myInfo) return;
          const result = myInfo.matchDetail.matchResult;
          if (result === "승") w++;
          else if (result === "무") d++;
          else if (result === "패") l++;
        });

        setWin(w);
        setDraw(d);
        setLose(l);
        setLoading(false);
      })
      .catch(() => {
        setError("경기 정보를 불러오지 못했습니다.");
        setLoading(false);
      });
  }, [ouid, matchType]);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const total = win + draw + lose;
  const winRate = total ? Math.round((win / total) * 100) : 0;

  // 스켈레톤 UI (neutral 계열)
  if (loading)
    return (
      <div className="max-w-sm bg-neutral-900 rounded-xl shadow-xl p-6 mx-auto animate-pulse">
        <div className="h-6 w-32 bg-neutral-700 rounded mb-6 mx-auto" />
        <div className="w-40 h-40 bg-neutral-800 rounded-full mx-auto mb-6" />
        <div className="h-6 w-24 bg-neutral-700 rounded mx-auto" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-48 text-red-500 text-lg font-semibold">
        {error}
      </div>
    );

  const chartData = {
    labels: ["승", "무", "패"],
    datasets: [
      {
        data: [win, draw, lose],
        backgroundColor: ["#3B82F6", "#FBBF24", "#EF4444"],
        borderWidth: 0,
        hoverOffset: 20,
      },
    ],
  };

  const chartOptions = {
    cutout: "70%",
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.parsed}`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="max-w-sm bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-900 rounded-xl shadow-xl p-6 mx-auto">
      <h2 className="text-white text-xl font-semibold mb-6 text-center tracking-wide">
        최근 경기 승률
      </h2>
      <div className="relative w-40 h-40 mx-auto drop-shadow-lg">
        <Doughnut ref={chartRef} data={chartData} options={chartOptions} />
        <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none">
          <span className="text-4xl font-extrabold text-white drop-shadow-md">
            {winRate}%
          </span>
          <span className="text-sm text-neutral-300 tracking-wide">승률</span>
        </div>
      </div>
      <div className="mt-6 text-center text-white text-lg font-medium tracking-tight">
        총 <span className="text-blue-400">{total}</span>전{" "}
        <span className="text-green-400">{win}승</span>{" "}
        <span className="text-yellow-400">{draw}무</span>{" "}
        <span className="text-red-500">{lose}패</span>
      </div>
      {winRate < 40 && (
        <p className="mt-3 text-center text-red-500 font-semibold text-sm animate-pulse">
          승률이 많이 낮아요. 조금 더 힘내봐요!
        </p>
      )}
      {winRate >= 40 && winRate < 60 && (
        <p className="mt-3 text-center text-yellow-400 font-semibold text-sm">
          승률이 보통이에요. 꾸준히 해봐요!
        </p>
      )}
      {winRate >= 60 && (
        <p className="mt-3 text-center text-green-400 font-semibold text-sm">
          승률이 아주 좋아요! 멋져요!
        </p>
      )}
    </div>
  );
};

export default RecentWinRate;

