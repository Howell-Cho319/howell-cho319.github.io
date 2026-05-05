import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Blog } from "./pages/Blog";
import { About } from "./pages/About";
import { Portfolio } from "./pages/Portfolio";
import { Certifications } from "./pages/Certifications";
import { Contact } from "./pages/Contact";
import { FocusFlow } from "./pages/FocusFlow";
import { DoMemo } from "./pages/DoMemo";
import { DoMemoTool } from "./pages/DoMemoTool";
import { Tetris } from "./pages/Tetris";
import { Snake } from "./pages/Snake";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "blog", Component: Blog },
      { path: "about", Component: About },
      { path: "portfolio", Component: Portfolio },
      { path: "certifications", Component: Certifications },
      { path: "contact", Component: Contact },
      { path: "focusflow", Component: FocusFlow },
      { path: "domemo", Component: DoMemo },
      { path: "domemo/app", Component: DoMemoTool },
      { path: "tetris", Component: Tetris },
      { path: "snake", Component: Snake },
      { path: "*", Component: NotFound },
    ],
  },
]);
