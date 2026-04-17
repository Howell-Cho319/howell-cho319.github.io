import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Blog } from "./pages/Blog";
import { About } from "./pages/About";
import { Portfolio } from "./pages/Portfolio";
import { Certifications } from "./pages/Certifications";
import { Contact } from "./pages/Contact";
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
      { path: "*", Component: NotFound },
    ],
  },
]);
