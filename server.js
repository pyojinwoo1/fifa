require('dotenv').config({ path: '.env.local' });

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001;

const NEXON_API_KEY = process.env.NEXON_API_KEY;
if (!NEXON_API_KEY) {
  throw new Error('NEXON_API_KEY 환경변수가 설정되어 있지 않습니다.');
}

const headers = { 'x-nxopen-api-key': NEXON_API_KEY };

app.use(cors());
app.use(express.json());

// 1. 닉네임으로 OUID 및 기본 정보 조회
app.get('/api/search', async (req, res) => {
  const nickname = req.query.nickname;
  if (!nickname) return res.status(400).json({ error: '닉네임이 필요합니다.' });
  try {
    const userRes = await axios.get(
      `https://open.api.nexon.com/fconline/v1/id?nickname=${encodeURIComponent(nickname)}`,
      { headers }
    );
    const ouid = userRes.data.ouid;
    const infoRes = await axios.get(
      `https://open.api.nexon.com/fconline/v1/user/basic?ouid=${ouid}`,
      { headers }
    );
    res.json({
      nickname: infoRes.data.nickname,
      level: infoRes.data.level,
      ouid,
    });
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.message || '유저 정보를 찾을 수 없습니다.';
    res.status(status).json({ error: message });
  }
});

// 2. 유저 경기 기록 목록 조회
app.get('/api/matches', async (req, res) => {
  const { ouid, matchtype = 50, offset = 0, limit = 10 } = req.query;
  if (!ouid) return res.status(400).json({ error: 'ouid가 필요합니다.' });
  try {
    const matchRes = await axios.get(
      `https://open.api.nexon.com/fconline/v1/user/match?ouid=${ouid}&matchtype=${matchtype}&offset=${offset}&limit=${limit}`,
      { headers }
    );
    res.json({ matches: matchRes.data });
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.message || '경기 기록을 불러올 수 없습니다.';
    res.status(status).json({ error: message });
  }
});

// 3. 경기 상세 정보 조회
app.get('/api/match-detail', async (req, res) => {
  const { matchid } = req.query;
  if (!matchid) return res.status(400).json({ error: 'matchid가 필요합니다.' });
  try {
    const detailRes = await axios.get(
      `https://open.api.nexon.com/fconline/v1/match-detail?matchid=${matchid}`,
      { headers }
    );
    res.json(detailRes.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.message || '경기 상세 정보를 불러올 수 없습니다.';
    res.status(status).json({ error: message });
  }
});

// 4. 유저 최고 등급 통계 조회
app.get('/api/player-stats', async (req, res) => {
  const ouid = req.query.ouid;
  if (!ouid) return res.status(400).json({ error: 'ouid가 필요합니다.' });
  try {
    const statsRes = await axios.get(
      `https://open.api.nexon.com/fconline/v1/user/maxdivision?ouid=${ouid}`,
      { headers }
    );
    res.json(statsRes.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.message || "플레이어 통계를 불러올 수 없습니다.";
    res.status(status).json({ error: message });
  }
});


// 5. 선수 메타데이터 (spid + 시즌 ID 포함)
app.get('/api/spid-meta', async (req, res) => {
  try {
    const response = await axios.get('https://open.api.nexon.com/static/fconline/meta/spid.json');
    res.json(response.data);
  } catch (error) {
    console.error('spid-meta API 에러:', error.message);
    res.status(500).json({ error: 'spid.json을 불러올 수 없습니다.' });
  }
});

// 6. 포지션 메타데이터
app.get('/api/spposition-meta', async (req, res) => {
  try {
    const response = await axios.get('https://open.api.nexon.com/static/fconline/meta/spposition.json');
    res.json(response.data);
  } catch (error) {
    console.error('spposition API 에러:', error.message);
    res.status(500).json({ error: 'spposition.json을 불러올 수 없습니다.' });
  }
});

// 7. 시즌 아이콘 메타데이터 (시즌 ID + 이미지 등)
app.get('/api/season-meta', async (req, res) => {
  try {
    const response = await axios.get('https://open.api.nexon.com/static/fconline/meta/seasonid.json');
    res.json(response.data);
  } catch (error) {
    console.error('seasonid API 에러:', error.message);
    res.status(500).json({ error: 'seasonid.json을 불러올 수 없습니다.' });
  }
});

// 8. division 등급 메타데이터
app.get('/api/divisions', async (req, res) => {
  try {
    const response = await axios.get('https://open.api.nexon.com/static/fconline/meta/seasonid.json');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: '등급 메타데이터를 불러오지 못했습니다.', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`✅ 백엔드 서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
