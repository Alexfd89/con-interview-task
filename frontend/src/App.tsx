import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme } from "antd";
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
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#0c3b93",
          },
          algorithm: theme.darkAlgorithm,
        }}
      >
        <AppRouter />
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
