import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme"
import { mockDataInvoices } from "../../data/mockData";

import Header from "../../components/Header";


const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "registrarId", headerName: "Registrar ID" },
    { 
      field: "name", 
      headerName: "Name", 
      flex: 1, // 随着名字增长
      cellClassName: "name-column--cell",
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
      field: "cost", 
      headerName: "Cost", 
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.cost}
        </Typography>
        
      )
    },
    {
      field: "date", 
      headerName: "Date", 
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header 
        title="INVOICES" 
        subtitle="List of Invoice balances" />
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
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important` 
          }
        }}
      >
        <DataGrid 
          checkboxSelection
          rows={mockDataInvoices}
          columns={columns}
        />
      </Box>
    </Box>
  );
}

export default Invoices;