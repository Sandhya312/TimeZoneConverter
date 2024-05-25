/* eslint-disable react/prop-types */

import { createContext, useState } from "react";

export const TimezoneContext = createContext();

export const TimezoneProvider = ({ children }) => {
    const [timezoneValues, setTimezoneValues] = useState([]);
    return (
        <TimezoneContext.Provider value={[timezoneValues, setTimezoneValues]}>
            {children}
        </TimezoneContext.Provider>
    );
};
