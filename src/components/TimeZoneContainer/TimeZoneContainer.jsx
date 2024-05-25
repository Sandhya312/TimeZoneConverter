/* eslint-disable react/prop-types */
import { Container, Box, Typography } from "@mui/material";
import TimeZoneSetting from "../timeZoneSettings/TimeZoneSettings";
import TimeZone from "../timeZone/TimeZone";
import { useContext, useState } from "react";
import { TimezoneContext } from "../../timeZoneContext";


const TimeZoneContainer = ({ selectedTheme, setselectedTheme }) => {
  const [timezoneValues, setTimezoneValues] = useContext(TimezoneContext);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (index != draggedIndex) {
      // updating timezones
      const updatedTimezoneValues = [...timezoneValues];
      const draggedTimezone = updatedTimezoneValues[draggedIndex];
      updatedTimezoneValues.splice(draggedIndex, 1);
      updatedTimezoneValues.splice(index, 0, draggedTimezone);

      // updating url

      setTimezoneValues(updatedTimezoneValues);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <Container sx={{ mt:5, p:4, borderRadius: "30px", }}>
      <TimeZoneSetting
        selectedTheme={selectedTheme}
        setselectedTheme={setselectedTheme}
      />
      {timezoneValues?.length != 0 ? (
        timezoneValues.map((timezone, index) => {
          return (
            <Box
              sx={ {
                border: "1px solid #eaeaea",
                padding: 4,
                margin: "10px 0",
                position: "relative",
                transition: "0.3s ease-in-out",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                
              }}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`task-item ${index === draggedIndex && "dragged"}`}
              key={index}
            >
              <TimeZone
                index={index}
                draggedIndex={draggedIndex}
                setDraggedIndex={setDraggedIndex}
                timezoneval={timezone}
              />
            </Box>
          );
        })
      ) : (
        <Box sx={{ m: 4, p: 2, textAlign: "center" }}>
          <Typography component="h6">
            Start by searching and adding time zone in the search box above
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default TimeZoneContainer;
