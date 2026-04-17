import { RouterProvider } from "react-router";
import { router } from "./routes";
import { MusicProvider } from "./contexts/MusicContext";

export default function App() {
  return (
    <MusicProvider>
      <RouterProvider router={router} />
    </MusicProvider>
  );
}