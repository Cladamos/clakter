import Cards from "../components/Cards";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function SpellsView() {
  return (
    <QueryClientProvider client={queryClient}>
      <Cards />
    </QueryClientProvider>
  );
}

export default SpellsView;
