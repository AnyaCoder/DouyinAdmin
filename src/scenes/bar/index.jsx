import { Box } from '@mui/material';
import Header from '../../components/Header';
import MyBarChart from '../../components/BarChart';

const Bar = () => {
  return (
    <>
      <Box m="20px">
        <Header title="柱状图" subtitle="简单的柱状图展示页"></Header>
        <Box height="75vh">
          <MyBarChart />
        </Box>
      </Box>
    </>
  );
};

export default Bar;
