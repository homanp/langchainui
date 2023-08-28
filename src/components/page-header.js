import React from "react";
import PropTypes from "prop-types";
import { HStack, Icon, Stack, Text } from "@chakra-ui/react";

export default function PageHeader({ title, children, icon, ...properties }) {
  return (
    <HStack {...properties} justifyContent="space-between">
      <Stack spacing={0}>
        <HStack>
          <Icon as={icon} />
          <Text fontWeight={500}>{title}</Text>
        </HStack>
      </Stack>
      {children}
    </HStack>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.func,
  children: PropTypes.node,
};
