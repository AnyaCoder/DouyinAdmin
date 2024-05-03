import { Box } from '@mui/material';
import Header from '../../components/Header';
import MyBarChart from '../../components/BarChart';

const Bar = () => {
  return (
    <>
      <Box m="20px">
        <Header
          title="Bar Chart"
          subtitle="Simple Bar Chart"
        ></Header>
        <Box height="75vh">
          <MyBarChart />
        </Box>
      </Box>
    </>
  );
};

export default Bar;
