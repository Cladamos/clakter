import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import "@mantine/core/styles.css"
import "@mantine/notifications/styles.css"
import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"

import HomeView from "./views/HomeView"
import SpellsView from "./views/SpellsView"
import DiceRollerView from "./views/DiceRollerView"
import CharactersView from "./views/CharactersView"

import Navbar from "./components/Navbar"
import { theme } from "./theme"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <MantineProvider theme={theme}>
        <Notifications />
        <Navbar />
        <Outlet />
      </MantineProvider>
    ),
    children: [
      { path: "/", index: true, element: <HomeView /> },
      { path: "/spells", element: <SpellsView /> },
      { path: "/dice-roller", element: <DiceRollerView /> },
      { path: "/characters", element: <CharactersView /> },
    ],
  },
])

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
