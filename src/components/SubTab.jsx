import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import General from './General';
import Details from './Details';

const SubTab = ({handleChangeMain}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='sub-tab-div'>
      <Tabs className='subtab-sub-div' value={value} onChange={handleChange} centered>
        <Tab label="General" />
        <Tab label="Details" />
      </Tabs>
      <Box p={3}>
        {value === 0 && <General />}
        {value === 1 && <Details handleChangeMain={handleChangeMain}/>}
      </Box>
    </div>
  );
};

export default SubTab;
