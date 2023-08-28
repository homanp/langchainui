"use client";
import { Inter } from "next/font/google";
import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { TbBrandGithub, TbLink } from "react-icons/tb";
import { signIn } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function LandingPage() {
  const backgroundColor = useColorModeValue("#131416", "#131416");
  const buttonColorScheme = useColorModeValue("blackAlpha", "whiteAlpha");
  const buttonBackgroundColor = useColorModeValue("black", "white");
  const fontColor = useColorModeValue("white", "white");

  return (
    <Flex
      height="100vh"
      backgroundColor={backgroundColor}
      className={inter.className}
    >
      <Container maxWidth="7xl">
        <HStack paddingY={6} justifyContent="space-between">
          <Text as="strong" color={fontColor} fontSize="lg">
            LangChain
            <Text
              as="span"
              bgGradient="linear(to-l, #20BDFF, #85D8CE)"
              backgroundClip="text"
            >
              UI
            </Text>
          </Text>
          <HStack spacing={4}>
            <Link
              href="https://github.com/homanp/langchain-ui"
              color={fontColor}
            >
              Github
            </Link>
            <Link
              color={fontColor}
              href="https://github.com/homanp/langchain-ui/blob/main/.github/CONTRIBUTING.md"
            >
              Contribute
            </Link>
            <Link
              color={fontColor}
              href="https://github.com/homanp/langchain-ui#getting-started"
            >
              Docs
            </Link>
          </HStack>
        </HStack>
        <Stack
          alignItems="center"
          justifyContent="center"
          paddingY="200px"
          spacing={8}
        >
          <Heading
            fontSize="7xl"
            fontWeight={700}
            textAlign="center"
            color={fontColor}
          >
            The open source{" "}
            <Text
              bgGradient="linear(to-l, #20BDFF, #26D0CE)"
              backgroundClip="text"
            >
              chat-ai toolkit
            </Text>
          </Heading>
          <Stack>
            <Button
              leftIcon={<Icon as={TbBrandGithub} />}
              colorScheme={buttonColorScheme}
              backgroundColor={buttonBackgroundColor}
              size="sm"
              onClick={() => signIn("github", { callbackUrl: "/app" })}
            >
              Sign in with Github
            </Button>
            <HStack spacing={1} alignItems="center" justifyContent="center">
              <Icon as={TbLink} fontSize="xs" color="gray.500" />
              <Link
                fontSize="xs"
                href="https://github.com/homanp/langchain-ui"
                target="_blank"
                color="gray.500"
              >
                Contribute on Github
              </Link>
            </HStack>
          </Stack>
        </Stack>
        <Container>
          <Stack></Stack>
        </Container>
      </Container>
    </Flex>
  );
}
