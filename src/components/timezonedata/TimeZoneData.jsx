/* eslint-disable react/prop-types */
import { Box, Grid, TextField, Typography } from "@mui/material";
import moment from "moment-timezone";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import { TimezoneContext } from "../../timeZoneContext";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const TimeZoneData = ({ timezone, index, setDraggedIndex }) => {
  const [,setTimezoneValues] = useContext(TimezoneContext);

  const handleDelete = (timezoneName) => {
    setTimezoneValues((prev) =>
      prev.filter((item) => item.name !== timezoneName)
    );
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
    setDraggedIndex(index);
  };

  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Box
            sx={{
              position: "absolute",
              top:"5.3rem",
              left: 0,
              display: "flex",
              alignItems: "center",
              marginRight: "12px",
              color: "#ccc",
              cursor:"grab",
            }}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
          >
            <DragIndicatorIcon />
            
          </Box>
          <Typography variant="h5">{timezone.label}</Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            label="Time"
            variant="standard"
            value={moment(timezone.dateTime, "DD:MM:YYYY hh:mm a").format(
              "hh:mm A"
            )}
            size="small"
            InputProps={{
              readOnly: true,
            }}
          />

          <IconButton
            onClick={() => handleDelete(timezone.name)}
            className="erase-timezone"
            sx={{
              position: "relative",
              bottom: "1rem",
              left: "10rem",
              ":hover": { color: "red", background: "white" },
              transition: "0.3s ease-in-out",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
        <Grid item xs={6} color="#999999">
          <Typography variant="body1">{timezone.fullForm}</Typography>
        </Grid>
        <Grid item xs={6} color="#999999">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body1">
              GMT {Math.floor(timezone.offset / 60)}:{timezone.offset % 60}
            </Typography>
            <Typography variant="body1">
              {moment(timezone.dateTime, "DD:MM:YYYY hh:mm a").format(
                "ddd, MMM D"
              )}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TimeZoneData;
