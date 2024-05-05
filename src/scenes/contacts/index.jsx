import { Box } from '@mui/material';
import { tokens } from '../../theme';
import { mockDataContacts } from '../../data/mockData';
import FullFeaturedCrudGrid from '../../components/DataGridCRUD';
import Header from '../../components/Header';
import { useTheme } from '@mui/material';

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: 'id', headerName: '视频ID', flex: 0.5 },
    { field: 'registrarId', headerName: '用户ID' },
    {
      field: 'name',
      headerName: '标题',
      flex: 1, // 随着名字增长
      cellClassName: 'name-column--cell',
    },
    {
      field: 'age',
      headerName: '描述',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'phone',
      headerName: '上传时间',
      flex: 1,
    },
    {
      field: 'email',
      headerName: '视频路径',
      flex: 1,
    },
    {
      field: 'address',
      headerName: '点赞数',
      flex: 1,
    },
    {
      field: 'city',
      headerName: '观看数',
      flex: 1,
    },
    {
      field: 'zipCode',
      headerName: 'ZipCode',
      flex: 1,
    },
  ];

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
          initialRows={mockDataContacts}
          initialColumns={columns}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
