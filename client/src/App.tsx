import React, { useEffect } from "react";
import { axios } from "@api/axios";
import Button from "@components/button";

function App() {
  useEffect(() => {
    axios.get("/api/sample").then((data) => console.log(data));
  }, []);

  return (
    <React.Fragment>
      <Button>this button</Button>
    </React.Fragment>
  );
}

export default App;
