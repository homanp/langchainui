"use client";
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";
import { Box, Button, Icon, Stack, useColorMode } from "@chakra-ui/react";
import { useSidebar } from "../../lib/sidebar";
import UserMenu from "../../components/user-menu";

function SidebarItem({ id, href, label, icon, ...properties }) {
  const router = useRouter();

  return (
    <Button
      key={id}
      width="full"
      size="sm"
      variant="ghost"
      justifyContent="flex-start"
      leftIcon={<Icon as={icon} fontSize="lg" />}
      onClick={() => router.push(href)}
      {...properties}
    >
      {label}
    </Button>
  );
}

SidebarItem.propTypes = {
  id: PropTypes.string,
  href: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.func,
};

export default function Sidebar() {
  const menu = useSidebar();
  const { colorMode } = useColorMode();
  const isLight = colorMode === "light";
  const backgroundColor = isLight ? "gray.50" : "gray.900";

  return (
    <Stack
      width="200px"
      height="100vh"
      borderRightWidth={0.5}
      justifyContent="space-between"
      paddingBottom={4}
      backgroundColor={backgroundColor}
    >
      <Stack spacing={4}>
        <UserMenu padding={2} />
        <Box paddingX={1}>
          {menu
            .filter(({ placement }) => placement === "top")
            .map(({ id, label, href, icon, iconDark, ...properties }) => (
              <SidebarItem
                key={id}
                id={id}
                label={label}
                icon={isLight ? icon : iconDark || icon}
                href={href}
                {...properties}
              />
            ))}
        </Box>
      </Stack>
      <Stack paddingX={1} spacing={0}>
        {menu
          .filter(({ placement }) => placement === "bottom")
          .map(
            ({ id, label, labelDark, href, icon, iconDark, ...properties }) => (
              <SidebarItem
                key={id}
                id={id}
                label={isLight ? label : labelDark || label}
                icon={isLight ? icon : iconDark || icon}
                href={href}
                {...properties}
              />
            )
          )}
      </Stack>
    </Stack>
  );
}
