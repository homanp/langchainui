import { Inter } from "next/font/google";
import AppClientPage from "./client-page";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <AppClientPage />;
}
