// src/Api/fifaApi.js

let playerMetaCache = null;
let positionMetaCache = null;
let divisionMetaCache = null;
let seasonMetaCache = null;

// 선수 메타데이터
export const getPlayerMeta = async () => {
  if (playerMetaCache) return playerMetaCache;
  const res = await fetch('/api/spid-meta');
  if (!res.ok) throw new Error('선수 메타데이터를 불러올 수 없습니다.');
  playerMetaCache = await res.json();
  return playerMetaCache;
};

// 포지션 메타데이터
export const getPositionMeta = async () => {
  if (positionMetaCache) return positionMetaCache;
  const res = await fetch('https://open.api.nexon.com/static/fconline/meta/spposition.json');
  if (!res.ok) throw new Error('포지션 메타데이터를 불러올 수 없습니다.');
  positionMetaCache = await res.json();
  return positionMetaCache;
};

// 등급 메타데이터
export const getDivisionMeta = async () => {
  if (divisionMetaCache) return divisionMetaCache;
  const res = await fetch('/api/divisions');
  if (!res.ok) throw new Error('등급 메타데이터를 불러올 수 없습니다.');
  divisionMetaCache = await res.json();
  return divisionMetaCache;
};

// 시즌 메타데이터
export const getSeasonMeta = async () => {
  if (seasonMetaCache) return seasonMetaCache;
  const res = await fetch('https://open.api.nexon.com/static/fconline/meta/seasonid.json');
  if (!res.ok) throw new Error('시즌 메타데이터를 불러올 수 없습니다.');
  seasonMetaCache = await res.json();
  return seasonMetaCache;
};

// 플레이어 정보
export const fetchPlayerInfo = async (nickname) => {
  const res = await fetch(`/api/search?nickname=${encodeURIComponent(nickname)}`);
  if (!res.ok) throw new Error('플레이어 정보를 불러올 수 없습니다.');
  return await res.json();
};

// 플레이어 최고 등급
export const fetchPlayerStats = async (ouid) => {
  const res = await fetch(`/api/player-stats?ouid=${encodeURIComponent(String(ouid))}`);
  if (!res.ok) throw new Error('플레이어 통계를 불러올 수 없습니다.');
  return await res.json();
};

// 경기 상세 정보
export const fetchMatchDetail = async (matchid) => {
  const res = await fetch(`/api/match-detail?matchid=${encodeURIComponent(matchid)}`);
  if (!res.ok) throw new Error('경기 상세 정보를 불러올 수 없습니다.');
  return await res.json();
};

// 경기 히스토리
export const fetchMatchHistory = async (ouid, matchType, offset = 0, limit = 10) => {
  const res = await fetch(
    `/api/matches?ouid=${encodeURIComponent(String(ouid))}&matchtype=${matchType}&offset=${offset}&limit=${limit}`
  );
  if (!res.ok) throw new Error('경기 기록을 불러올 수 없습니다.');
  return await res.json();
};

// 선수 이미지 URL
export const getPlayerImageUrl = (spId) => {
  return `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/players/p${spId}.png`;
};

// 시즌 아이콘 URL (ex: icontm.png)
export const getSeasonIconUrl = (iconName) => {
  return `https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/${iconName}`;
};
