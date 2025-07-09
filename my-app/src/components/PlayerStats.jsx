import React from 'react';
import 슈퍼챔피언스 from '../assets/슈퍼챔피언스.png';
import 챔피언스 from '../assets/챔피언스.png';
import 월드클래스1 from '../assets/월드클래스1부.png';
import 월드클래스2 from '../assets/월드클래스2부.png';
import 월드클래스3 from '../assets/월드클래스3부.png';
import 프로1 from '../assets/프로1부.png';
import 프로2 from '../assets/프로2부.png';
import 프로3 from '../assets/프로3부.png';
import 세미프로1 from '../assets/세미프로1부.png';
import 세미프로2 from '../assets/세미프로2부.png';
import 세미프로3 from '../assets/세미프로3부.png';
import 아마추어1 from '../assets/아마추어1부.png';
import 아마추어2 from '../assets/아마추어2부.png';
import 아마추어3 from '../assets/아마추어3부.png';

const divisionMap = {
  800: "슈퍼 챔피언스",
  900: "챔피언스",
  1000: "월드클래스1",
  1100: "월드클래스2",
  1200: "월드클래스3",
  1300: "프로1",
  2000: "프로2",
  2100: "프로3",
  2200: "세미프로1",
  2300: "세미프로2",
  2400: "세미프로3",
  2500: "아마추어1",
  2600: "아마추어2",
  2700: "아마추어3"
};

const divisionImg = {
  800: 슈퍼챔피언스,
  900: 챔피언스,
  1000: 월드클래스1,
  1100: 월드클래스2,
  1200: 월드클래스3,
  1300: 프로1,
  2000: 프로2,
  2100: 프로3,
  2200: 세미프로1,
  2300: 세미프로2,
  2400: 세미프로3,
  2500: 아마추어1,
  2600: 아마추어2,
  2700: 아마추어3,
};

const StatCardSkeleton = () => (
  <div className="bg-neutral-800 rounded-lg px-5 py-3 flex items-center gap-4 mb-4 w-fit min-w-0 max-w-full animate-pulse">
    <div className="w-14 h-14 bg-neutral-700 rounded" />
    <div className="flex flex-col min-w-0 gap-2">
      <div className="h-4 w-20 bg-neutral-700 rounded" />
      <div className="h-6 w-28 bg-neutral-700 rounded" />
    </div>
  </div>
);

const StatCard = ({ title, division, img }) => {
  return (
    <div className="bg-neutral-800 rounded-lg px-5 py-3 flex items-center gap-4 mb-4 w-fit min-w-0 max-w-full">
      {img ? (
        <img src={img} alt={division} className="w-14 h-14 object-contain flex-shrink-0" />
      ) : (
        <div className="w-14 h-14 flex items-center justify-center bg-gray-700 rounded">
          <span className="text-xs text-gray-400">No Image</span>
        </div>
      )}
      <div className="flex flex-col min-w-0">
        <div className="text-xs text-gray-300 mb-1 whitespace-nowrap">{title}</div>
        <div className="font-bold text-lg mb-1 whitespace-nowrap">{division}</div>
      </div>
    </div>
  );
};

const PlayerStats = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="flex flex-col gap-2">
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
    );
  }
  if (!stats || !Array.isArray(stats)) return null;

  const official = stats.find(stat => stat.matchType === 50);
  const manager = stats.find(stat => stat.matchType === 52);

  return (
    <div className="flex flex-col gap-2">
      {official && (
        <StatCard
          title="공식경기"
          division={divisionMap[official.division] || official.division}
          img={divisionImg[official.division]}
        />
      )}
      {manager && (
        <StatCard
          title="감독모드"
          division={divisionMap[manager.division] || manager.division}
          img={divisionImg[manager.division]}
        />
      )}
    </div>
  );
};

export default PlayerStats;
