import { Box } from '@mui/material';
import { tokens } from '../../theme';
import FullFeaturedCrudGrid from '../../components/DataGridCRUD';
import Header from '../../components/Header';
import { useTheme } from '@mui/material';
import { useState, useEffect } from 'react';

import {
  getVideos,
  insertVideo,
  deleteVideo,
  updateVideo,
} from '../../api_usage';

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    {
      field: 'videoID',
      headerName: '视频ID',
    },
    {
      field: 'userID',
      headerName: '用户ID',
      editable: true,
    },
    {
      field: 'title',
      headerName: '标题',
      flex: 1,
      cellClassName: 'name-column--cell',
      editable: true,
    },
    {
      field: 'description',
      headerName: '描述',
      headerAlign: 'left',
      align: 'left',
      editable: true,
    },
    {
      field: 'uploadTime',
      headerName: '上传时间',
      flex: 1,
      editable: true,
    },
    {
      field: 'videoPath',
      headerName: '视频路径',
      flex: 1,
      editable: true,
    },
    {
      field: 'likes',
      headerName: '点赞数',
      flex: 1,
      editable: true,
    },
    {
      field: 'views',
      headerName: '观看数',
      flex: 1,
      editable: true,
    },
  ];

  // 初始化组件的状态，默认为空数组
  const [data, setData] = useState([]);

  // 使用 useEffect 在组件加载时获取数据
  useEffect(() => {
    const getData = async () => {
      const jsonData = await getVideos();
      const mappedRows = jsonData.map((item, index) => ({
        id: item.videoID,
        ...item,
      }));
      setData(mappedRows); // 确保为数组类型
    };

    getData();
  }, []);

  return (
    <Box m="20px">
      <Header
        title="内容管理"
        subtitle="对用户的视频标题、内容、是否限流等进行管理"
      />
      <Box
        m="40px 0 0 0" // 上、右、下、左 margin边界
        height="75vh" // viewport height
        sx={{
          // 以下选择器的名称可以通过F12查看对应类名称检索到
          // 通过父类选择器，去除表格最外面的边框
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          // 名字那一栏变色
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          // 表头变蓝紫色
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          // 页脚变色去除边框
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <FullFeaturedCrudGrid
          initialRows={data}
          initialColumns={columns}
          handleInsert={insertVideo}
          handleDelete={deleteVideo}
          handleUpdate={updateVideo}
          idField="videoID"
          focus="title"
        />
      </Box>
    </Box>
  );
};

export default Contacts;
