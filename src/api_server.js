const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const backendUrl = `http://localhost:8080`;

app.use(cors());
app.use(express.json());

const fetchData = async (url, method = 'GET', body = null) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : null,
    });
    // 检查响应体是否为空
    const text = await response.text();
    if (!text) {
      return {}; // 或者根据你的需求返回其他内容
    }

    return JSON.parse(text);
  } catch (error) {
    console.error(`Error with ${method} request:`, error);
    throw error;
  } finally {
    console.log(`${method} request completed`);
  }
};

// 获取单个用户
app.get('/api/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const apiUrl = `${backendUrl}/users/async/${userId}`;

  try {
    const userData = await fetchData(apiUrl, 'GET', null);
    res.json(userData);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// 获取所有用户
app.get('/api/users', async (req, res) => {
  const apiUrl = `${backendUrl}/users`;
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const userData = await fetchData(apiUrl, 'GET', null);
    res.json(userData);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// 添加用户
app.post('/api/users', async (req, res) => {
  const apiUrl = `${backendUrl}/users`;

  try {
    const userData = await fetchData(apiUrl, 'POST', req.body);
    res.json(userData);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// 删除用户
app.delete('/api/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const apiUrl = `${backendUrl}/users/async/${userId}`;

  try {
    const userData = await fetchData(apiUrl, 'DELETE', null);
    res.json(userData);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// 修改用户
app.put('/api/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const apiUrl = `${backendUrl}/users/async/${userId}`;
  console.log(req.body);
  try {
    const userData = await fetchData(apiUrl, 'PUT', req.body);
    res.json(userData);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

//************************* */

// 获取一个用户的所有视频
app.get('/api/videos/:videoId', async (req, res) => {
  const videoId = req.params.videoId;
  const apiUrl = `${backendUrl}/videos/async/${videoId}`;

  try {
    const videoData = await fetchData(apiUrl, 'GET', null);
    res.json(videoData);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// 获取所有用户的所有视频
app.get('/api/videos', async (req, res) => {
  const apiUrl = `${backendUrl}/videos`;

  try {
    const videoData = await fetchData(apiUrl, 'GET', null);
    res.json(videoData);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// 添加用户的视频
app.post('/api/videos', async (req, res) => {
  const apiUrl = `${backendUrl}/videos/async`;

  try {
    const videoData = await fetchData(apiUrl, 'POST', req.body);
    res.json(videoData);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// 删除用户的视频
app.delete('/api/videos/:videoId', async (req, res) => {
  const videoId = req.params.videoId;
  const apiUrl = `${backendUrl}/videos/async/${videoId}`;

  try {
    const videoData = await fetchData(apiUrl, 'DELETE', null);
    res.json(videoData);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// 修改用户的视频
app.put('/api/videos/:videoId', async (req, res) => {
  const videoId = req.params.videoId;
  const apiUrl = `${backendUrl}/videos/async/${videoId}`;

  try {
    const videoData = await fetchData(apiUrl, 'PUT', req.body);
    res.json(videoData);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

//************************* */
// 获取所有评论
app.get('/api/comments', async (req, res) => {
  const apiUrl = `${backendUrl}/comments/async`;

  try {
    const commentData = await fetchData(apiUrl, 'GET', null);
    res.json(commentData);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// 获取一个用户的一个视频的所有评论
app.get('/api/comments/video/:videoId', async (req, res) => {
  const videoId = req.params.videoId;
  const apiUrl = `${backendUrl}/comments/async/video/${videoId}`;

  try {
    const commentData = await fetchData(apiUrl, 'GET', null);
    res.json(commentData);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// 添加评论
app.post('/api/comments', async (req, res) => {
  const apiUrl = `${backendUrl}/comments/async`;

  try {
    const commentData = await fetchData(apiUrl, 'POST', req.body);
    res.json(commentData);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// 删除用户的某个评论
app.delete('/api/comments/:commentId', async (req, res) => {
  const commentId = req.params.commentId;
  const apiUrl = `${backendUrl}/comments/async/${commentId}`;

  try {
    const commentData = await fetchData(apiUrl, 'DELETE', null);
    res.json(commentData);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// 修改用户的某个评论
app.put('/api/comments/:commentId', async (req, res) => {
  const commentId = req.params.commentId;
  const apiUrl = `${backendUrl}/comments/async/${commentId}`;

  try {
    const commentData = await fetchData(apiUrl, 'PUT', req.body);
    res.json(commentData);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// ----------------------*****-----------------------
// 监听端口，server启动
app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
