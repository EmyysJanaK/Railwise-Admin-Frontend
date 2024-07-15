import { Button } from "@mui/material";

function App() {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => alert("Hello World!")}
    >
      Click Me
    </Button>
  );
}

export default App;
