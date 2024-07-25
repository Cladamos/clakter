import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import "@mantine/core/styles.css"
import "@mantine/notifications/styles.css"
import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"

import SpellsView from "./views/SpellsView"
import DiceRollerView from "./views/DiceRollerView"
import CharacterView from "./views/CharacterView"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { CharacterProvider } from "./contexts/CharacterContext"
import Navbar from "./components/Navbar/Navbar"
import NotesView from "./views/NotesView"
import { ThemeProvider, useTheme } from "./contexts/ThemeContext"

function AppLayout() {
  const { theme } = useTheme()
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <Navbar />
      <Outlet />
    </MantineProvider>
  )
}

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <ThemeProvider>
        <AppLayout />
      </ThemeProvider>
    ),

    children: [
      { path: "/", index: true, element: <CharacterView /> },
      { path: "/spells", element: <SpellsView /> },
      { path: "/notes", element: <NotesView /> },
      { path: "/dice-roller", element: <DiceRollerView /> },
    ],
  },
])

const queryClient = new QueryClient()

export default function App() {
  return (
    <CharacterProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </CharacterProvider>
  )
}
