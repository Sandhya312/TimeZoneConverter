/* eslint-disable react/prop-types */

import { useState } from "react";
import { Box, createTheme, Button } from "@mui/material";
import { timezone } from "../../utility/timezone";
import { TimezoneContext } from "../../timeZoneContext";
import { useContext } from "react";
import TimeZoneSearchBar from "../timezoneSearchbar/TimeZoneSearchBar";
import TimeDatePicker from "../datePicker/TimeDatePicker";
import moment from "moment-timezone";
import dayjs from "dayjs";
import { ThemeProvider } from "@emotion/react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
const buttonTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          border: "1px solid #ccc",
          "&:hover": {
            background: "#2196f3",
            color: "white",
          },
        },
      },
    },
  },
});

const TimeZoneSetting = ({ selectedTheme, setselectedTheme }) => {
  const [timezoneValues, setTimezoneValues] = useContext(TimezoneContext);
  const [datePicker, setDatePicker] = useState(dayjs());

  const handleSearch = (e) => {
    const timezoneName = e.target.innerText;
    const ExitingTimeZone = timezoneValues.find(
      (item) => item.label === timezoneName
    );

    if (!ExitingTimeZone && timezoneName !== undefined) {
      let newTimeZone = timezone.find((item) => item.label === timezoneName);
      setTimezoneValues((prev) => [newTimeZone, ...prev]);
    }
  };

  const handleDateChange = (val) => {
    const year = val.year();
    const month = val.month();
    const day = val.date();
    const hour = val.hour();
    const minute = val.minute();

    const updatedTimezoneValue = timezoneValues.map((timezone) => {
      const dateTimeMoment = moment({ year, month, day, hour, minute }).tz(
        timezone.name
      );
      const dateTime = dateTimeMoment.format("DD:MM:YYYY hh:mm a");
      const sliderValue = dateTimeMoment.hour() * 60 + dateTimeMoment.minute();

      return {
        ...timezone,
        dateTime,
        dateTimeMoment,
        sliderValue,
      };
    });
    setDatePicker(val);
    setTimezoneValues(updatedTimezoneValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box component="div" sx={{}}>
        <TimeZoneSearchBar handleSearch={handleSearch} />
      </Box>
      <Box>
        {timezoneValues.length !== 0 && (
          <TimeDatePicker
            date={datePicker}
            handleDateChange={handleDateChange}
          />
        )}
      </Box>

      <Box>
        <ThemeProvider theme={buttonTheme}>
          <Button onClick={() => setselectedTheme(!selectedTheme)}>
            {selectedTheme ? <DarkModeIcon /> : <LightModeIcon />}
          </Button>
        </ThemeProvider>
      </Box>
    </Box>
  );
};

export default TimeZoneSetting;
