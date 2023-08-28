"use client";
import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  HStack,
  Icon,
  IconButton,
  Input,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Text,
  Tr,
  Td,
  useColorModeValue,
  Select,
  Tag,
} from "@chakra-ui/react";
import { TbPlus, TbTrashX } from "react-icons/tb";
import { useAsync } from "react-use";
import { useForm } from "react-hook-form";
import PageHeader from "../../../components/page-header";
import { useSidebar } from "../../../lib/sidebar";
import {
  createDatasource,
  getDatasources,
  removeDatasourceById,
} from "../../../lib/api";
import { DATASOURCE_TYPES } from "../../../lib/datasources";
import { uploadFile } from "../../../lib/upload-file.js";
import { getUploadUrl } from "../../../lib/upload-url.js";

export default function DatasourcesClientPage() {
  const buttonColorScheme = useColorModeValue("blackAlpha", "whiteAlpha");
  const buttonBackgroundColor = useColorModeValue("black", "white");
  const borderBottomColor = useColorModeValue("gray.50", "#333");
  const menu = useSidebar();
  const [datasources, setDatasources] = useState([]);

  const { loading: isLoading } = useAsync(async () => {
    const { data } = await getDatasources();
    setDatasources(data);

    return data;
  }, [getDatasources, setDatasources]);
  const [showForm, setShowForm] = useState(
    !isLoading && datasources.length === 0
  );

  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm({ values: { type: "csv" } });

  const files = watch("file");
  const type = watch("type");
  const validate = useCallback((value) => value.length > 0, []);

  const onSubmit = useCallback(
    async ({ name, type }) => {
      const fileType = files[0].type;
      const uploadUrl = await getUploadUrl({ type: fileType });
      const s3Url = `${uploadUrl.url}/${uploadUrl.fields.key}`;

      await uploadFile(files[0], uploadUrl);

      const { data: datasource } = await createDatasource({
        url: s3Url,
        name: name,
        type: type,
      });

      setDatasources((prev) => [datasource, ...prev]);
      setShowForm();
      reset();
    },
    [files, reset, setDatasources]
  );

  const handleRemoveDatasource = useCallback(async (datasourceId) => {
    await removeDatasourceById(datasourceId);

    setDatasources((prev) => prev.filter(({ id }) => id !== datasourceId));
  }, []);

  return (
    <Stack flex={1} padding={4} spacing={4}>
      <PageHeader
        icon={menu.find(({ id }) => id === "datasources").icon}
        title="Datasources"
      >
        <HStack>
          <Button
            leftIcon={<Icon as={TbPlus} />}
            colorScheme={buttonColorScheme}
            backgroundColor={buttonBackgroundColor}
            size="sm"
            onClick={() => setShowForm(true)}
          >
            New datasource
          </Button>
        </HStack>
      </PageHeader>
      {isLoading && (
        <Center flex={1}>
          <Spinner size="sm" />
        </Center>
      )}
      {!isLoading && !showForm && (
        <TableContainer>
          <Table size="sm">
            <Tbody>
              {datasources.map(({ id, name, type }) => (
                <Tr key={id}>
                  <Td
                    cursor="pointer"
                    _hover={{ opacity: 0.5 }}
                    borderBottomColor={borderBottomColor}
                  >
                    <HStack>
                      <Text fontSize="sm">{name}</Text>{" "}
                      <Tag colorScheme="teal" size="sm">
                        {type}
                      </Tag>
                    </HStack>
                  </Td>
                  <Td textAlign="right" borderBottomColor={borderBottomColor}>
                    <IconButton
                      size="sm"
                      icon={<Icon as={TbTrashX} fontSize="lg" />}
                      variant="ghost"
                      onClick={() => handleRemoveDatasource(id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      {showForm && (
        <Center flex={1}>
          <Container as="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={6}>
              <Stack spacing={1}>
                <Icon
                  fontSize="2xl"
                  as={menu.find(({ id }) => id === "datasources").icon}
                />
                <Text>Datasources</Text>
                <Text fontSize="sm" color="gray.500">
                  Create a datasource that you can use in your chat app.
                </Text>
              </Stack>
              <Stack>
                <FormControl isInvalid={errors?.name}>
                  <Input
                    size="sm"
                    placeholder="My datasource..."
                    {...register("name", { required: true })}
                  />
                  {errors?.file && (
                    <FormErrorMessage>Please choose a name</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={errors?.type}>
                  <Select size="sm" {...register("type", { required: true })}>
                    {DATASOURCE_TYPES.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </Select>
                  {errors?.file && (
                    <FormErrorMessage>
                      Please select a datasource
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={errors?.file}>
                  <Box
                    as={
                      DATASOURCE_TYPES.find(({ id }) => id === type).component
                    }
                    files={files}
                    register={register}
                    validate={validate}
                  />
                  {errors?.file && (
                    <FormErrorMessage>Please select a file</FormErrorMessage>
                  )}
                </FormControl>
              </Stack>
              <HStack justifyContent="flex-end">
                <Button variant="ghost" size="sm" onClick={() => setShowForm()}>
                  Cancel
                </Button>
                <Button
                  colorScheme={buttonColorScheme}
                  backgroundColor={buttonBackgroundColor}
                  type="sumbit"
                  size="sm"
                  isLoading={isSubmitting}
                >
                  Save
                </Button>
              </HStack>
            </Stack>
          </Container>
        </Center>
      )}
    </Stack>
  );
}
