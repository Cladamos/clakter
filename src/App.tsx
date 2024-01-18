import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

import Navbar from "./components/Navbar";
import Cards from "./components/Cards";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Cards />
      </QueryClientProvider>
    </MantineProvider>
  );
}
