import { createBrowserRouter, RouterProvider } from "react-router";
import { ThemeProvider } from "next-themes";
import App from "@/app/App";
import FaqPage from "@/app/pages/FaqPage";
import ServiceDetailPage from "@/app/pages/ServiceDetailPage";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/servicios/:slug", element: <ServiceDetailPage /> },
  { path: "/preguntas-frecuentes", element: <FaqPage /> },
]);

/** Isla React con el mismo layout/rutas que DR.Jaime-web */
export default function AppRoot() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
      enableSystem={false}
    >
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
