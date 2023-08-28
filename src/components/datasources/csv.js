import React from "react";
import PropTypes from "prop-types";
import { Button, Icon, Stack, Text } from "@chakra-ui/react";
import { TbFileUpload } from "react-icons/tb";
import FilePicker from "../file-picker";

export default function CsvDocument({ files, register, validate }) {
  return (
    <Stack
      padding={8}
      borderWidth="1px"
      borderRadius="sm"
      borderStyle="dashed"
      alignItems="center"
      justifyContent="center"
    >
      <FilePicker accept=".csv" {...register("file", { validate })}>
        <Button
          size="sm"
          variant="ghost"
          fontWeight="normal"
          leftIcon={<Icon as={TbFileUpload} />}
          color="gray.500"
        >
          Select a file to import
        </Button>
      </FilePicker>
      {files?.length > 0 && (
        <Text color="gray.500" fontSize="xs" marginTop={2}>
          {files[0].name}
        </Text>
      )}
    </Stack>
  );
}

CsvDocument.propTypes = {
  files: PropTypes.object,
  register: PropTypes.func,
  validate: PropTypes.func,
};
