import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import { StateProvider } from "./utils/StateProvider";
import reducer, { initialState } from "./utils/Reducer";

import { SocketContext, socket } from "./utils/socket";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <SocketContext.Provider value={socket}>
        <App />
      </SocketContext.Provider>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
