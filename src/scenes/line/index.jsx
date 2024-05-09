import MyLineChart from '../../components/LineChart';
import { Box } from '@mui/material';
import Header from '../../components/Header';
const Line = () => {
  return (
    <Box m="20px">
      <Header title="折线图" subtitle="简单的折线图展示页"></Header>
      <Box height="75vh">
        <MyLineChart />
      </Box>
    </Box>
  );
};

export default Line;
