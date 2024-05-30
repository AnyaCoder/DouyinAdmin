import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';

import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import Header from '../../components/Header';
import FullFeaturedCrudGrid from '../../components/DataGridCRUD';
import { useEffect, useState } from 'react';

import {
  getUsers,
  insertUser,
  deleteUser,
  updateUser,
} from '../../api_usage';

const User = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: 'userID',
      headerName: '编号',
    },
    {
      field: 'username',
      headerName: '用户名',
      flex: 1, // 随着名字增长
      cellClassName: 'name-column--cell',
      editable: true,
    },
    {
      field: 'password',
      headerName: '密码',
      headerAlign: 'left',
      align: 'left',
      editable: true,
    },
    {
      field: 'email',
      headerName: '电子邮件地址',
      flex: 1,
      editable: true,
    },
    {
      field: 'phoneNumber',
      headerName: '手机号码',
      flex: 1,
      editable: true,
    },
    {
      field: 'registrationDate',
      headerName: '注册时间',
      flex: 1,
      editable: true,
    },
    {
      field: 'gender',
      headerName: '性别',
      flex: 1,
      editable: true,
    },
    {
      field: 'access',
      headerName: '访问等级',
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="40%"
            m="10px 0" // 缩写，margin: top: 0, left: auto
            p="5px" // 缩写 padding
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === 'admin'
                ? colors.greenAccent[600]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === 'admin' && <AdminPanelSettingsOutlinedIcon />}
            {access === 'manager' && <SecurityOutlinedIcon />}
            {access === 'user' && <LockOpenOutlinedIcon />}

            <Typography color={colors.grey[100]} sx={{ ml: '5px' }} />
          </Box>
        );
      },
    },
  ];

  // 初始化组件的状态，默认为空数组
  const [data, setData] = useState([]);

  // 使用 useEffect 在组件加载时获取数据
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonData = await getUsers();
        console.log(jsonData);
        const dataArray = Array.isArray(jsonData) ? jsonData : [];
        const mappedRows = dataArray.map((item, index) => ({
          id: item.userID,
          ...item,
          access: 'user', // 新增 'access' 键并赋值
        }));
        setData(mappedRows); // 确保为数组类型
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]); // 在出错时设置一个空数组
      }
    };

    getData();
  }, []);

  return (
    <Box m="20px">
      <Header
        title="用户管理"
        subtitle="可以对用户的账户信息进行增加、删除、修改、查询"
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
          handleInsert={insertUser}
          handleUpdate={updateUser}
          handleDelete={deleteUser}
          idField="userID"
          focus="username"
        />
      </Box>
    </Box>
  );
};

export default User;
