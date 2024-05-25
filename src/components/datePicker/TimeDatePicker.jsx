/* eslint-disable react/prop-types */
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

const TimeDatePicker = ({ date, handleDateChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DateTimePicker
          label="Basic date time picker"
          value={date}
          onChange={(val) => handleDateChange(val)}
          sx={{ transform: "scale(0.8)" }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default TimeDatePicker;
