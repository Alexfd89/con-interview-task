import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { AppRouter } from "./router/AppRouter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
        <AppRouter />
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
