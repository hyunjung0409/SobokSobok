import React, { Children } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DetailTaps(props) {
  const [value, setValue] = React.useState(0);
  const target = props.target;
  const crit = props.crit;
  const howto = props.howto;
  const contact = props.contact;
  const phone = props.phone;
  const deptName = props.deptName;
  const siteLink = props.siteLink;
  const siteName = props.siteName;
  const content = props.content;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: 1014,
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
        mb: 3,
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab label="지원대상" {...a11yProps(0)} />
          <Tab label="서비스 내용" {...a11yProps(1)} />
          <Tab label="신청방법" {...a11yProps(2)} />
          <Tab label="추가정보" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div style={{ marginBottom: "5vh" }}>지원대상</div>
        <li>{target}</li>
        <Box sx={{ bgcolor: "#dee2e6", borderRadius: 2, p: 2, mt: 3 }}>
          {crit}
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div style={{ marginBottom: "5vh" }}>서비스 내용</div>
        {content}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div style={{ marginBottom: "5vh" }}>신청방법</div>
        {howto}
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div style={{ marginBottom: "5vh" }}>추가정보</div>
        <div style={{ fontWeight: "bold" }}>관련부서</div>
        <li>{deptName}</li>
        <li style={{ marginBottom: "5vh" }}>{contact}</li>
        <div style={{ fontWeight: "bold" }}>전화문의</div>
        <li style={{ marginBottom: "5vh" }}>{phone}</li>
        <div style={{ fontWeight: "bold" }}>관련 웹사이트</div>
        <li>{siteLink}</li>
        <li>{siteName}</li>
      </TabPanel>
    </Box>
  );
}
