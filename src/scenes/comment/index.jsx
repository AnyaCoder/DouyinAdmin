import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
// import { mockDataInvoices } from '../../data/mockData';
import FullFeaturedCrudGrid from '../../components/DataGridCRUD';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';

import {
  getAllComments,
  insertComment,
  deleteComment,
  updateComment,
} from '../../api_usage';

const Comment = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'content',
      headerName: '评论内容',
      flex: 3, // 随着名字增长
      cellClassName: 'name-column--cell',
      editable: true,
    },
    {
      field: 'commentTime',
      headerName: '评论时间',
      flex: 1,
    },
    {
      field: 'userID',
      headerName: '用户ID',
      flex: 1,
    },
    {
      field: 'username',
      headerName: '用户名称',
      flex: 1,
    },
    {
      field: 'videoID',
      headerName: '视频ID',
      flex: 1,
    },
    {
      field: 'title',
      headerName: '视频标题',
      flex: 1,
    },
  ];
  // 初始化组件的状态，默认为空数组
  const [data, setData] = useState([]);

  // 使用 useEffect 在组件加载时获取数据
  useEffect(() => {
    const getData = async () => {
      const jsonData = await getAllComments();
      const mappedRows = jsonData.map((item, index) => ({
        id: item.commentID,
        ...item,
      }));
      setData(mappedRows); // 确保为数组类型
    };

    getData();
  }, []);

  return (
    <Box m="20px">
      <Header
        title="评论管理"
        subtitle="可以对所有用户的评论进行增加、删除、修改、查询"
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
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <FullFeaturedCrudGrid
          initialRows={data}
          initialColumns={columns}
          handleInsert={insertComment}
          handleDelete={deleteComment}
          handleUpdate={updateComment}
          idField="commentID"
          focus="content"
        />
      </Box>
    </Box>
  );
};

export default Comment;
