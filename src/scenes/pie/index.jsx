import MyPieChart from '../../components/PieChart';
import { Box } from '@mui/material';
import Header from '../../components/Header';
const Pie = () => {
  return (
    <Box m="20px">
      <Header title="饼状图" subtitle="简单的饼状图展示页"></Header>
      <Box height="75vh">
        <MyPieChart />
      </Box>
    </Box>
  );
};

export default Pie;
