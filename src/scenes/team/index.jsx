import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { mockDataTeam } from '../../data/mockData';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import Header from '../../components/Header';
import FullFeaturedCrudGrid from '../../components/DataGridCRUD';

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    {
      field: 'id',
      headerName: '编号',
      editable: true,
    },
    {
      field: 'name',
      headerName: '用户名',
      flex: 1, // 随着名字增长
      cellClassName: 'name-column--cell',
      editable: true,
    },
    {
      field: 'age',
      headerName: '密码',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
      editable: true,
    },
    {
      field: 'phone',
      headerName: '手机号码',
      flex: 1,
      editable: true,
    },
    {
      field: 'email',
      headerName: '电子邮件地址',
      flex: 1,
      editable: true,
    },
    {
      field: 'reg date',
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
      field: 'email',
      headerName: '电子邮件地址',
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
          initialRows={mockDataTeam}
          initialColumns={columns}
        />
      </Box>
    </Box>
  );
};

export default Team;
