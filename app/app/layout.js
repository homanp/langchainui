import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "pages/api/auth/[...nextauth]";
import AppContainer from "./container";

export const metadata = {
  title: "Home",
  description: "LangChain UI app home page",
};

export default async function AppLayout({ children }) {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/");
  // }

  return <AppContainer>{children}</AppContainer>;
}
