import { signOut } from "next-auth/react";
import { useColorMode } from "@chakra-ui/react";
import {
  TbDatabase,
  TbLogout,
  TbMessage,
  TbPrompt,
  TbSettings,
  TbMoon,
  TbSun,
  TbHome,
} from "react-icons/tb";

const PLACEMENT = {
  top: "top",
  bottom: "bottom",
};

export const useSidebar = () => {
  const { toggleColorMode } = useColorMode();

  return [
    {
      id: "home",
      label: "Home",
      href: "/app",
      icon: TbHome,
      placement: PLACEMENT.top,
    },
    // {
    //   id: "datasources",
    //   label: "Datasources",
    //   href: "/app/datasources",
    //   icon: TbDatabase,
    //   placement: PLACEMENT.top,
    // },
    {
      id: "prompt_templates",
      label: "Prompt templates",
      href: "/app/prompt-templates",
      icon: TbPrompt,
      placement: PLACEMENT.top,
    },
    // {
    //   id: "chatbots",
    //   label: "Chatbots",
    //   href: "/app/chatbots",
    //   icon: TbMessage,
    //   placement: PLACEMENT.top,
    // },
    {
      id: "databases",
      label: "Databases",
      href: "/app/databases",
      icon: TbDatabase,
      placement: PLACEMENT.top,
    },
    {
      id: "dark_mode",
      label: "Dark",
      labelDark: "Light",
      onClick: () => toggleColorMode(),
      icon: TbMoon,
      iconDark: TbSun,
      placement: PLACEMENT.bottom,
    },
    {
      id: "settings",
      label: "Settings",
      href: "/app/settings",
      icon: TbSettings,
      placement: PLACEMENT.bottom,
    },
    {
      id: "singout",
      label: "Sign out",
      onClick: () => signOut(),
      icon: TbLogout,
      placement: PLACEMENT.bottom,
    },
  ];
};
