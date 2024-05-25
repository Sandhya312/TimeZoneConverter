/* eslint-disable react/prop-types */

import {TextField,Autocomplete } from "@mui/material";
import {timezone} from '../../utility/timezone';

const TimeZoneSearchBar = ({handleSearch}) =>{
    return (
        <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={timezone}
        sx={{ width: 300 }}
        onChange={handleSearch}
        renderInput={(params) => <TextField name="tz"  {...params} label="Search Timezone" />}
      />
    )
}

export default TimeZoneSearchBar;