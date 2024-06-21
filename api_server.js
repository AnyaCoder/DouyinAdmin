const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({
  limits: {
    fieldSize: 50 * 1024 * 1024, // 50MB
  },
});
const port = 3001;
const backendUrl = `http://localhost:8080`;

app.use(cors());
// 配置内置的中间件以处理较大的请求体
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(
  '/Thumbnails',
  express.static(
    path.join(__dirname, '../JavaProject/mybatis/Thumbnails')
  )
);

app.use(
  '/UploadedVideos',
  express.static(
    path.join(__dirname, '../JavaProject/mybatis/UploadedVideos')
  )
);

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

// 以某个管理员身份登录
app.post('/api/admins/login', async (req, res) => {
  const apiUrl = `${backendUrl}/admins/async/login`;

  try {
    const data = await fetchData(apiUrl, 'POST', req.body);
    res.json(data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// 获取某个id的管理员
app.get('/api/admins/:adminId', async (req, res) => {
  const adminId = req.params.adminId;
  const apiUrl = `${backendUrl}/admins/async/${adminId}`;
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const data = await fetchData(apiUrl, 'GET', null);
    res.json(data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// 添加管理员
app.post('/api/admins', async (req, res) => {
  const apiUrl = `${backendUrl}/admins/async`;

  try {
    const data = await fetchData(apiUrl, 'POST', req.body);
    res.json(data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// 删除管理员
app.delete('/api/admins/:userId', async (req, res) => {
  const userId = req.params.userId;
  const apiUrl = `${backendUrl}/admins/async/${userId}`;

  try {
    const data = await fetchData(apiUrl, 'DELETE', null);
    res.json(data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// 修改管理员
app.put('/api/admins', async (req, res) => {
  const apiUrl = `${backendUrl}/admins/async`;
  console.log(req.body);
  try {
    const data = await fetchData(apiUrl, 'PUT', req.body);
    res.json(data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

//************************* */

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

app.get('/api/users/stats/:userId', async (req, res) => {
  const userId = req.params.userId;
  const apiUrl = `${backendUrl}/users/async/stats/${userId}`;

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

// 以某个管理员身份登录
app.post('/api/users/login', async (req, res) => {
  const apiUrl = `${backendUrl}/users/async/login`;

  try {
    const data = await fetchData(apiUrl, 'POST', req.body);
    res.json(data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// 添加用户
app.post('/api/users', async (req, res) => {
  const apiUrl = `${backendUrl}/users/async`;

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
app.get('/api/videos/:userId', async (req, res) => {
  const userId = req.params.userId;
  const apiUrl = `${backendUrl}/videos/async/${userId}`;

  try {
    const videoData = await fetchData(apiUrl, 'GET', null);
    console.log('get vid data: ', videoData);
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
app.post('/api/upload', upload.none(), async (req, res) => {
  const apiUrl = `${backendUrl}/videos/async/upload`;

  try {
    const formData = new FormData();
    formData.append('userID', req.body.userID);
    formData.append('title', req.body.title);
    formData.append('description', req.body.description);
    formData.append('filename', req.body.filename);
    formData.append('fileData', req.body.fileData);
    // formData.append('fileData', '13233');
    console.log('fileDatalen: ', req.body.fileData.length);

    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const videoData = await response.json();
      res.json(videoData);
    } else {
      const errorData = await response.text();
      res
        .status(response.status)
        .json({ status: response.status, msg: errorData });
    }
  } catch (error) {
    res.status(500).json({ status: 500, msg: error.toString() });
  }
});

// 删除用户的视频
app.delete('/api/videos/:videoId', async (req, res) => {
  const videoId = req.params.videoId;
  const apiUrl = `${backendUrl}/videos/async/${videoId}`;

  try {
    const formData = new FormData();
    formData.append('videoPath', req.body?.videoPath);
    formData.append('thumbnailPath', req.body?.thumbnailPath);

    const videoData = await fetch(apiUrl, {
      method: 'DELETE',
      body: formData,
    });
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

//*************************** */
// 点赞
app.post('/api/videos/:videoId/like', async (req, res) => {
  const videoId = req.params.videoId;
  const apiUrl = `${backendUrl}/videos/async/${videoId}/like`;

  try {
    const likeData = await fetchData(apiUrl, 'POST', null);
    res.json(likeData);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// 取消点赞
app.delete('/api/videos/:videoId/like', async (req, res) => {
  const videoId = req.params.videoId;
  const apiUrl = `${backendUrl}/videos/async/${videoId}/like`;

  try {
    const likeData = await fetchData(apiUrl, 'DELETE', null);
    res.json(likeData);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// 观看
app.post('/api/videos/:videoId/view', async (req, res) => {
  const videoId = req.params.videoId;
  const apiUrl = `${backendUrl}/videos/async/${videoId}/view`;

  try {
    const likeData = await fetchData(apiUrl, 'POST', null);
    res.json(likeData);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

//*************************** */

// 关注
app.post('/api/follows', async (req, res) => {
  const apiUrl = `${backendUrl}/follows/async`;

  try {
    const followData = await fetchData(apiUrl, 'POST', req.body);
    console.log(followData);
    res.json(followData);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// 取关
app.delete('/api/follows', async (req, res) => {
  const apiUrl = `${backendUrl}/follows/async`;
  try {
    const followData = await fetchData(apiUrl, 'DELETE', req.body);
    console.log(followData);
    res.json(followData);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

//***

// ----------------------*****-----------------------
// 监听端口，server启动
app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
