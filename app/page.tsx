import type { Metadata } from "next";
import { Counter } from "./components/counter/Counter";
import Home from "./home/page";

export default function IndexPage() {
  return <Home />;
}

export const metadata: Metadata = {
  title: "CodeSyncs",
};
