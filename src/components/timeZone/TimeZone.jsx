/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/prop-types */

import { useContext } from "react";
import { Box, Slider } from "@mui/material";
import "moment-timezone";
import { TimezoneContext } from "../../timeZoneContext";
import moment from "moment";
import TimeZoneData from "../timezonedata/TimeZoneData";

// marks according to mins 12 am - 3am - 180mins
const marks = [
  { value: 0, label: "12 AM" },
  { value: 180, label: "3 AM" },
  { value: 360, label: "6 AM" },
  { value: 540, label: "9 AM" },
  { value: 720, label: "12 PM" },
  { value: 900, label: "3 PM" },
  { value: 1080, label: "6 PM" },
  { value: 1260, label: "9 PM" },
];

const TimeZone = ({
  index,
  timezoneval,
  draggedIndex,
  setDraggedIndex,
}) => {
  const [timezoneValues, setTimezoneValues] = useContext(TimezoneContext);

  const sliderOnChange = (e) => {
    // Get the current value of the slider that triggered the event
    const currentValue = e.target.value;

    const currentTimeZoneName = e.target.name;

    // Filter the timezoneValues array to find the timezone that matches the event target's name
    let slider = timezoneValues.filter((tz) => currentTimeZoneName === tz.name);

    // Map through the timezoneValues array to update the time and slider value for each timezone
    const updateTimeZones = timezoneValues.map((timezone) => {
      let newFormattedDateTime = moment(slider[0].dateTimeMoment)
        .add(currentValue - slider[0].sliderValue, "minutes")
        .tz(timezone.name)
        .format("DD:MM:YYYY hh:mm a");

      // Check if the current timezone in the map function is not the one that triggered the event
      if (currentTimeZoneName !== timezone.name) {
        // Get the slider value of the triggered slider
        const triggeredSliderPrevValue = slider[0].sliderValue;

        // Calculate the new slider value for the current timezone based on the changed slider's value
        const currentSlidersValue =
          (timezone.sliderValue +
            currentValue -
            triggeredSliderPrevValue +
            1440) %
          1440;

        // Return the updated timezone object
        return {
          ...timezone,
          sliderValue: currentSlidersValue,
          dateTime: newFormattedDateTime,
        };
      } else {
        // Return the updated timezone object
        return {
          ...timezone,
          sliderValue: currentValue,
          dateTime: newFormattedDateTime,
        };
      }
    });

    setTimezoneValues(updateTimeZones);

    // Update the slider value state
  };

  return (
    <Box component="div">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <TimeZoneData
          timezone={timezoneval}
          index={index}
          draggedIndex={draggedIndex}
          setDraggedIndex={setDraggedIndex}
        />
      </Box>
      <Box>
        <Slider
          name={timezoneval.name}
          min={0}
          value={timezoneval.sliderValue}
          max={1439}
          step={1}
          marks={marks}
          onChange={sliderOnChange}
        />
      </Box>
    </Box>
  );
};

export default TimeZone;
