import TimeZoneContainer from "./components/TimeZoneContainer/TimeZoneContainer";
import {TimezoneProvider} from "./timeZoneContext";
import {useState } from "react";
import moment from "moment-timezone";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";

moment.tz.link([
  "America/Los_Angeles|US/Pacific",
  "America/New_York|US/Eastern",
  "Asia/Kolkata|IST",
  "Asia/Tokyo|JST",
]);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#2c2b2b !important",
      
    },
   
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          
          boxShadow:  "20px 20px 34px #222222, -20px -20px 34px #363434",
        },
      },
    },
  }
  
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      header: "##e0e0e0",
     
    },
    
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          boxShadow: "20px 20px 60px #bebebe, -20px -20px 60px #ffffff !important",
        },
      },
    },
  }
});

function App() {


  const [selectedTheme, setselectedTheme] = useState(true); // true for light theme

  return (
  
      <TimezoneProvider>
        <ThemeProvider theme={selectedTheme ? lightTheme : darkTheme}>
          <CssBaseline />
          <TimeZoneContainer
            selectedTheme={selectedTheme}
            setselectedTheme={setselectedTheme}
          
          />
        </ThemeProvider>
      </TimezoneProvider>
  
  );
}

export default App;
