import { RouterProvider } from "react-router";
import { router } from "./routes";
import { MusicProvider } from "./contexts/MusicContext";
import { DevToolsDetector } from "./components/DevToolsDetector";

export default function App() {
  return (
    <MusicProvider>
      <DevToolsDetector />
      <RouterProvider router={router} />
    </MusicProvider>
  );
}