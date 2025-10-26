import { createContext, useContext, useState } from "react";

const DJModeContext = createContext();

export const DJModeProvider = ({ children }) => {
  const [devices, setDevices] = useState([
    { id: 1, name: "Mixer 1" },
    { id: 2, name: "CDJ 2" },
  ]);
  const [connectedDevice, setConnectedDevice] = useState(null);

  const connectToDevice = (deviceId) => {
    const device = devices.find(d => d.id === deviceId);
    if (device) setConnectedDevice(device);
  };

  return (
    <DJModeContext.Provider value={{ devices, connectedDevice, connectToDevice }}>
      {children}
    </DJModeContext.Provider>
  );
};

export const useDJMode = () => useContext(DJModeContext);
