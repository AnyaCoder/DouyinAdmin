import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme"
import { mockDataContacts } from "../../data/mockData";

import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    { 
      field: "name", 
      headerName: "Name", 
      flex: 1, // 随着名字增长
      cellClassName: "name-column--cell",
    }, 
    { 
      field: "age", 
      headerName: "Age", 
      type: "number",
      headerAlign: "left",
      align: "left",
    }, 
    { 
      field: "phone", 
      headerName: "Phone Number", 
      flex: 1,
    }, 
    { 
      field: "email", 
      headerName: "Email", 
      flex: 1,
    }, 
    {
      field: "address", 
      headerName: "Address", 
      flex: 1,
    },
    {
      field: "city", 
      headerName: "City", 
      flex: 1,
    },
    {
      field: "zipCode", 
      headerName: "ZipCode", 
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="CONTACTS" subtitle="List of Contacts for Future Reference" />
      <Box
        m="40px 0 0 0" // 上、右、下、左 margin边界
        height="75vh" // viewport height
        sx={{
          // 以下选择器的名称可以通过F12查看对应类名称检索到
          // 通过父类选择器，去除表格最外面的边框
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none"
          },
          // 名字那一栏变色
          "& .name-column--cell": {
            color: colors.greenAccent[300]
          },
          // 表头变蓝紫色
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          // 页脚变色去除边框
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`
          }
        }}
      >
        <DataGrid 
          rows={mockDataContacts}
          columns={columns}
          slots={{toolbar: GridToolbar}} // 表格上面的四个小
        />
      </Box>
    </Box>
  );
}

export default Contacts;