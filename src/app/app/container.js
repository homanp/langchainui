"use client";
import React from "react";
import { Flex } from "@chakra-ui/react";
import Sidebar from "./sidebar";

export default function AppContainer({ children }) {
  return (
    <Flex height="100vh">
      <Sidebar />
      {children}
    </Flex>
  );
}
