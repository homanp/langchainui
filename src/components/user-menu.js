import React from "react";
import { Avatar, Divider, HStack, Stack, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

export default function UserMenu({ ...properties }) {
  const { data: session, status } = useSession();

  return (
    <Stack spacing={0}>
      <HStack alignItems="center" {...properties}>
        <Avatar src={session?.user.image} size="sm" />
        <Stack spacing={0} justifyContent="center">
          <Text fontSize="sm" noOfLines={1}>
            {session?.user.name}
          </Text>
          <Text fontSize="xs" color="gray.500" noOfLines={1}>
            {session?.user.email}
          </Text>
        </Stack>
      </HStack>
      <Divider />
    </Stack>
  );
}
