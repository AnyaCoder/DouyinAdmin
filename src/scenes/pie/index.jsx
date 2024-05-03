import MyPieChart from '../../components/PieChart';
import { Box } from '@mui/material';
import Header from '../../components/Header';
const Pie = () => {
  return (
    <Box m="20px">
      <Header
        title="Bar Chart"
        subtitle="Simple Bar Chart"
      ></Header>
      <Box height="75vh">
        <MyPieChart />
      </Box>
    </Box>
  );
};

export default Pie;
