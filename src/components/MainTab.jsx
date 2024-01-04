import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import List from '../components/List';
import '../components/style.scss'
import SubTab from '../components/SubTab';


const MainTab = () => {
  const [value, setValue] = React.useState(0  );

  const handleChangeMain = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='main-tab'>
      <Tabs value={value} onChange={handleChangeMain} centered>
        <Tab label="Entry" />
        <Tab label="List" />
      </Tabs>
      <Box p={3}>
        {value === 0 && <SubTab handleChangeMain={handleChangeMain}/>}
        {value === 1 && <List />}
      </Box>
    </div>
  );
};

export default MainTab;
