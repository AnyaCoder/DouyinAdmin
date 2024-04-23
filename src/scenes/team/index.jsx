import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme"
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },
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
      field: "access", 
      headerName: "Access Level", 
      flex: 1,
      renderCell: ({ row: {access}}) => {
        return (
          <Box
            width="60%"
            m="0 auto" // 缩写，margin: top: 0, left: auto
            p="5px" // 缩写 padding
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && 
              <AdminPanelSettingsOutlinedIcon />
            }
            {access === "manager" && 
              <SecurityOutlinedIcon />
            }
            {access === "user" && 
              <LockOpenOutlinedIcon />
            }

            <Typography color={colors.grey[100]} sx={{ ml: "5px"}} />
          </Box>
        )
      }
    }, 
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the team Members" />
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
        }}
      >
        <DataGrid 
          rows={mockDataTeam}
          columns={columns}
        />
      </Box>
    </Box>
  );
}

export default Team;