import Routes from "./components/Routes/Index";
import io from "socket.io-client";
import { SocketContext } from "./components/AppContext";

function App() {

  const socket = io.connect("http://localhost:5000");

  return (
    <SocketContext.Provider value={socket}>
      <Routes />
    </SocketContext.Provider>
  );
}

export default App;
