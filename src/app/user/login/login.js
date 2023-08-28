"use client";
import React from "react";
import {
  Button,
  Center,
  Container,
  Flex,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { TbBrandGithub } from "react-icons/tb";

export default function Login() {
  return (
    <Flex height="100vh">
      <Center flex={1}>
        <Container maxWidth="md">
          <Stack alignItems="center" justifyContent="center" spacing={12}>
            <Text textAlign="center" fontWeight="bold">
              LangChain UI
            </Text>
            <Stack spacing={4}>
              <Button
                size="sm"
                variant="outline"
                leftIcon={<Icon as={TbBrandGithub} />}
                onClick={() => signIn("github", { callbackUrl: "/app" })}
              >
                Login with Github
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Center>
    </Flex>
  );
}
