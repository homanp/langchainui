"use client";
import {
  Card,
  CardBody,
  CardHeader,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import PageHeader from "../../components/page-header";
import { useSidebar } from "../../lib/sidebar";

export default function AppClientPage() {
  const menu = useSidebar();

  return (
    <Stack minHeight="100vh" flex={1} padding={4} spacing={4}>
      <PageHeader
        icon={menu.find(({ id }) => id === "home").icon}
        title="Home"
      />
      <SimpleGrid columns={4} gap={10}>
        <Card variant="outline">
          <CardHeader fontSize="sm">Connected datasources</CardHeader>
          <CardBody paddingTop={4}>
            <Text as="strong">-</Text>
          </CardBody>
        </Card>
        <Card variant="outline">
          <CardHeader fontSize="sm">Active chatbots</CardHeader>
          <CardBody paddingTop={4}>
            <Text as="strong">-</Text>
          </CardBody>
        </Card>
        <Card variant="outline">
          <CardHeader fontSize="sm">Used tokens</CardHeader>
          <CardBody paddingTop={4}>
            <Text as="strong">-</Text>
          </CardBody>
        </Card>
        <Card variant="outline">
          <CardHeader fontSize="sm">Estimated costs</CardHeader>
          <CardBody paddingTop={4}>
            <Text as="strong">-</Text>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Stack>
  );
}
