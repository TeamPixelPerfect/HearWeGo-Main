import { Box, Typography } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  fullWidth: boolean;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, fullWidth, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{overflowY: "scroll", height: "100%"}}
    >
      {value === index && (
        <Box sx={{ p: fullWidth?"1em 0":3, mb: "1em" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default CustomTabPanel;
