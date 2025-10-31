import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/handshake")
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <h1>Frontend ↔ Backend ↔ DB Test</h1>
      {data ? (
        <>
          <p>{data.message}</p>
          <p>Database: {data.dbStatus}</p>
        </>
      ) : (
        <p>Connecting...</p>
      )}
    </div>
  );
}

export default App;
