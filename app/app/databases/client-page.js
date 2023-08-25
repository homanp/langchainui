"use client";
import React, { useState, useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { xcodeDark, xcodeLight, defaultSettingsXcodeLight } from "@uiw/codemirror-theme-xcode";
import { sql } from "@codemirror/lang-sql";
import {
  Button,
  HStack,
  Icon,
  IconButton,
  Input,
  Select,
  Stack,
  Flex,
  Text,
  Box,
  useColorModeValue,
  SimpleGrid,
  VStack,
  GridItem,
} from "@chakra-ui/react";
import {
  TbArrowBack,
  TbArrowForward,
  TbPlayerPlay,
  TbPlus,
} from "react-icons/tb";
import PageHeader from "@/components/page-header";
import { useSidebar } from "@/lib/sidebar";
import DataTable from "@/components/data-table";
import { TreeView } from "@/components/tree-view";
import { columns, rows, tree } from "./mock";
import Pagination from "@/components/pagination";

const EXTENSIONS = {
  sql: sql(),
};

export default function DatabasesClientPage() {
  const borderColor = useColorModeValue("gray.50", "#333");
  const menu = useSidebar();

  const [currentPage, setCurrentPage] = useState(null);
  const [pageSize, setPageSize] = useState(null);

  const paginatedRows = useMemo(() => {
    if (currentPage && pageSize) {
      return rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    } else {
      return [];
    }
  }, [currentPage, pageSize]);

  return (
    <Stack flex={1} paddingX={4} paddingY={4} spacing={4}>
      <PageHeader
        icon={menu.find(({ id }) => id === "databases").icon}
        title="Databases"
      />
      <SimpleGrid columns={4} flex={1} spacing={4}>
        <GridItem>
          <VStack h="100%" textAlign="left" spacing={2}>
            <Input defaultValue="Search..." />
            <Box textAlign="right" w="100%">
              <Button size="sm" leftIcon={<Icon as={TbPlus} />}>
                Connect
              </Button>
            </Box>
            <Box
              sx={{
                width: "100%",
                flex: 1,
                borderRadius: 4,
                border: `1px solid ${borderColor}`,
                p: 2,
              }}
            >
              <TreeView value={tree} isReadOnly={false} isDisabled={false} />
            </Box>
          </VStack>
        </GridItem>
        <GridItem colSpan={3}>
          <VStack height="100%" spacing={2}>
            <HStack justifyContent="space-between" width="100%">
              <Text>Query Editor</Text>
              <Flex gap={1} alignItems="center">
                <IconButton size="sm" icon={<TbArrowBack />} />
                <IconButton size="sm" icon={<TbArrowForward />} />
                <IconButton
                  size="sm"
                  colorScheme="blue"
                  icon={<TbPlayerPlay />}
                />
                <Text whiteSpace="nowrap" ml={4}>
                  Query Type:
                </Text>
                <Select variant="outline">
                  <option value="CQL">CQL</option>
                  <option value="NL">NL</option>
                </Select>
              </Flex>
            </HStack>
            <Box width="100%">
              <CodeMirror
                value="SELECT * from TABLE where colum='something' ORDER BY vector ANN OF [3.4, 7.8, 9.1] LIMIT 20"
                width="100%"
                height="300px"
                theme={xcodeLight}
                extensions={[EXTENSIONS.sql]}
              />
            </Box>
            <Box height={470} width="100%" overflowY="auto">
              <DataTable columns={columns} data={paginatedRows} />
            </Box>
            <Box>
              <Pagination
                total={rows.length}
                onPageSizeChange={setPageSize}
                onCurrentPageChange={setCurrentPage}
              />
            </Box>
          </VStack>
        </GridItem>
      </SimpleGrid>
    </Stack>
  );
}
