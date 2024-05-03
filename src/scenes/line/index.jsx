import MyLineChart from '../../components/LineChart';
import { Box } from '@mui/material';
import Header from '../../components/Header';
const Line = () => {
  return (
    <Box m="20px">
      <Header
        title="Bar Chart"
        subtitle="Simple Bar Chart"
      ></Header>
      <Box height="75vh">
        <MyLineChart />
      </Box>
    </Box>
  );
};

export default Line;
