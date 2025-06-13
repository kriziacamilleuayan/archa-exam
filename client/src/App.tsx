import { SnackbarProvider } from "notistack";
import CategoryList from "@components/CategoryList";

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <CategoryList />
    </SnackbarProvider>
  );
};

export default App;
