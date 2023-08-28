"use client";
import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormHelperText,
  HStack,
  Icon,
  IconButton,
  Input,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Textarea,
  Text,
  Tr,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";
import { TbPlus, TbTrashX } from "react-icons/tb";
import { useAsync } from "react-use";
import { useForm } from "react-hook-form";
import PageHeader from "../../../components/page-header";
import { useSidebar } from "../../../lib/sidebar";
import {
  createPromptTemplate,
  getPrompTemplates,
  getPromptVariables,
  removePromptTemplateById,
} from "../../../lib/api";

export default function PromptTemplatesClientPage() {
  const buttonColorScheme = useColorModeValue("blackAlpha", "whiteAlpha");
  const buttonBackgroundColor = useColorModeValue("black", "white");
  const borderBottomColor = useColorModeValue("gray.50", "#333");
  const menu = useSidebar();
  const [promptTemplates, setPromptTemplates] = useState([]);

  const { loading: isLoading } = useAsync(async () => {
    const { data } = await getPrompTemplates();
    setPromptTemplates(data);

    return data;
  }, [getPrompTemplates, setPromptTemplates]);
  const [showForm, setShowForm] = useState(
    !isLoading && promptTemplates.length === 0
  );

  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm();

  const prompt = watch("prompt");

  const onSubmit = useCallback(
    async ({ name, prompt }) => {
      const payload = {
        name,
        prompt,
        inputs: getPromptVariables(prompt),
      };

      const { data: promptTemplate } = await createPromptTemplate(payload);

      setPromptTemplates((prev) => [promptTemplate, ...prev]);
      setShowForm();
      reset();
    },
    [reset, setPromptTemplates]
  );

  const handleRemovePromptTemplate = useCallback(async (promptTemplateId) => {
    await removePromptTemplateById(promptTemplateId);

    setPromptTemplates((prev) =>
      prev.filter(({ id }) => id !== promptTemplateId)
    );
  }, []);

  return (
    <Stack flex={1} padding={4} spacing={4}>
      <PageHeader
        icon={menu.find(({ id }) => id === "prompt_templates").icon}
        title="Prompt templates"
      >
        <HStack>
          <Button
            leftIcon={<Icon as={TbPlus} />}
            colorScheme={buttonColorScheme}
            backgroundColor={buttonBackgroundColor}
            size="sm"
            onClick={() => setShowForm(true)}
          >
            New template
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
              {promptTemplates.map(({ id, name }) => (
                <Tr key={id}>
                  <Td
                    cursor="pointer"
                    _hover={{ opacity: 0.5 }}
                    borderBottomColor={borderBottomColor}
                  >
                    {name}
                  </Td>
                  <Td textAlign="right" borderBottomColor={borderBottomColor}>
                    <IconButton
                      size="sm"
                      icon={<Icon as={TbTrashX} fontSize="lg" />}
                      variant="ghost"
                      onClick={() => handleRemovePromptTemplate(id)}
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
                  as={menu.find(({ id }) => id === "prompt_templates").icon}
                />
                <Text>New prompt template</Text>
                <Text fontSize="sm" color="gray.500">
                  Create a prompt template to use in your chat apps
                </Text>
              </Stack>
              <Stack>
                <FormControl isInvalid={errors?.name}>
                  <Input
                    size="sm"
                    placeholder="My custom prompt..."
                    {...register("name", { required: true })}
                  />
                </FormControl>
                <FormControl isInvalid={errors?.prompt}>
                  <Box
                    borderRadius="md"
                    borderWidth="1px"
                    padding={3}
                    spacing={0}
                  >
                    <Textarea
                      minHeight="250px"
                      variant="unstyled"
                      fontSize="sm"
                      {...register("prompt", { required: true })}
                    />
                    <HStack justifyContent="flex-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowForm()}
                      >
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
                  </Box>
                  <FormHelperText>
                    Type <Tag size="sm">{`{{myVariable}}`}</Tag> to insert
                    variables into your template.
                  </FormHelperText>
                </FormControl>
              </Stack>
              <HStack>
                <Text fontSize="sm">Inputs:</Text>
                <HStack>
                  {getPromptVariables(prompt).map((variable) => (
                    <Tag key={variable} size="sm">
                      {variable}
                    </Tag>
                  ))}
                </HStack>
              </HStack>
            </Stack>
          </Container>
        </Center>
      )}
    </Stack>
  );
}
