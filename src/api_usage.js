import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// 管理员用户登录
export const loginAdmin = async adminData => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/admins/login`,
      adminData
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching admin:', error);
    throw error;
  }
};

// 增加新管理员用户
export const insertAdmin = async adminData => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/admins`,
      adminData
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching admin:', error);
  }
};

/************** */

// 查询某用户
export const getUserById = async userId => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

// 查询所有用户
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data ? response.data : {};
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

// 普通短视频用户登录
export const loginUser = async userData => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users/login`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// 增加新用户
export const insertUser = async userData => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

// 删除用户
export const deleteUser = async userId => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/users/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

// 修改用户
export const updateUser = async (userId, userData) => {
  try {
    console.log(userData);
    const response = await axios.put(
      `${API_BASE_URL}/users/${userId}`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

//*********************************************** */
// 查询某用户的所有视频
export const getVideosByUserId = async userId => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/videos/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching video:', error);
  }
};

// 查询所有用户
export const getVideos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/videos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching video:', error);
  }
};

// 增加新用户
export const insertVideo = async userData => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/videos`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching video:', error);
  }
};

// 删除用户
export const deleteVideo = async userId => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/videos/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching video:', error);
  }
};

// 修改用户
export const updateVideo = async (userId, userData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/videos/${userId}`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching video:', error);
  }
};

//*********************************************** */

export const getAllComments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/comments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching video:', error);
  }
};

// 增加新用户
export const insertComment = async commentData => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/comments`,
      commentData
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching video:', error);
  }
};

// 删除用户
export const deleteComment = async commentId => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/comments/${commentId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching video:', error);
  }
};

// 修改用户
export const updateComment = async (commentId, commentData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/comments/${commentId}`,
      commentData
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching video:', error);
  }
};
