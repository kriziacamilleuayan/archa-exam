import { SnackbarProvider } from "notistack";
import CategoryList from "@components/features/category/CategoryList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={3}>
        <CategoryList />
      </SnackbarProvider>
    </QueryClientProvider>
  );
};

export default App;
