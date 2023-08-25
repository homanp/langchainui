"use client";
import React, { useState, useMemo, useEffect } from "react";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import axios from "axios";
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
import { columns } from "./mock";
import Pagination from "@/components/pagination";

const EXTENSIONS = {
  sql: sql(),
};

const Types = ["CQL", "NL"];

export default function DatabasesClientPage() {
  const borderColor = useColorModeValue("gray.50", "#333");
  const menu = useSidebar();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dbName, setDBName] = useState("");
  const [connectedDBName, setConnectedDBName] = useState(null);
  const [treeData, setTreeData] = useState([]);
  const [queryType, setQueryType] = useState(Types[0]);
  const [tableData, setTableData] = useState([]);

  const [currentPage, setCurrentPage] = useState(null);
  const [pageSize, setPageSize] = useState(null);

  const paginatedRows = useMemo(() => {
    if (currentPage && pageSize) {
      return tableData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      );
    } else {
      return [];
    }
  }, [currentPage, pageSize, tableData]);

  const onConnectModalOpen = () => {
    setIsOpenModal(true);
  };

  const onConnectModalClose = () => {
    setIsOpenModal(false);
  };

  const onConnectDB = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/databases`, {
        database_name: dbName,
      });
      setConnectedDBName(dbName);
      onConnectModalClose();
    } catch (err) {
      setConnectedDBName(null);
    }
  };

  const fetchData = async (dbName) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/databases/${dbName}/keyspaces`
      );
      const trees = await Promise.all(
        res.data.map(async (keySpace) => {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/databases/${dbName}/keyspaces/${keySpace}/tables`
          );
          return {
            key: keySpace,
            label: keySpace,
            descendants: res.data.map((table) => ({
              key: table,
              label: table,
            })),
          };
        })
      );
      setTreeData([
        {
          key: dbName,
          label: dbName,
          descendants: trees,
        },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (connectedDBName) {
      fetchData(connectedDBName);
    }
  }, [connectedDBName]);

  const onRunQuery = async () => {
    try {
      const res = await axios.post(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/databases/${connectedDBName}/${queryType.toLowerCase()}`,
        {
          query: "SELECT * from TABLE",
        }
      );
      setTableData(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Stack flex={1} paddingX={4} paddingY={4} spacing={4}>
      <PageHeader
        icon={menu.find(({ id }) => id === "databases").icon}
        title="Databases"
      />
      <SimpleGrid columns={4} flex={1} spacing={4}>
        <GridItem>
          <VStack h="100%" textAlign="left" spacing={2}>
            <Input placeholder="Search..." />
            <Box textAlign="right" w="100%">
              <Button
                size="sm"
                leftIcon={<Icon as={TbPlus} />}
                onClick={onConnectModalOpen}
              >
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
              <TreeView
                value={treeData}
                isReadOnly={false}
                isDisabled={false}
              />
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
                  onClick={onRunQuery}
                />
                <Text whiteSpace="nowrap" ml={4}>
                  Query Type:
                </Text>
                <Select
                  variant="outline"
                  value={queryType}
                  onChange={(e) => setQueryType(e.target.value)}
                >
                  {Types.map((type, index) => (
                    <option key={`query-type-${index}`} value={type}>
                      {type}
                    </option>
                  ))}
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
                total={tableData.length}
                onPageSizeChange={setPageSize}
                onCurrentPageChange={setCurrentPage}
              />
            </Box>
          </VStack>
        </GridItem>
      </SimpleGrid>
      <Modal isOpen={isOpenModal} onClose={onConnectModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect Database</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack spacing={2}>
              <Text size="md">Database name</Text>
              <Input
                size="md"
                value={dbName}
                onChange={(e) => setDBName(e.target.value)}
              />
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onConnectModalClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={onConnectDB}>
              Connect
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
}
