"use client";
import { Center, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Center flex={1}>
      <Spinner size="sm" />
    </Center>
  );
}
