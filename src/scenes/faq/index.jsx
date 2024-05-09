import { Box, useTheme, Typography } from '@mui/material';
import Header from '../../components/Header';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { tokens } from '../../theme';

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="常见疑问与解答" />
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            一个重要的问题
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>我是这个页面的开发者</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            一个重要的问题
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>我是这个页面的开发者</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            一个重要的问题
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>我是这个页面的开发者</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            一个重要的问题
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>我是这个页面的开发者</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            另一个重要的问题
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>我是这个页面的开发者</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
