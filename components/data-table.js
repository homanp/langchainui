import React, { useMemo, useState } from "react";
import {
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Text,
  chakra,
} from "@chakra-ui/react";
import { TbArrowDown, TbArrowUp } from "react-icons/tb";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export default function DataTable({ data, columns }) {
  const tableBgColor = useColorModeValue("gray.30", "gray.600");
  const [sorting, setSorting] = useState([]);
  const enhancedColumns = useMemo(
    () =>
      columns.map((column) =>
        columnHelper.accessor(column.id, {
          cell: (info) => info.getValue(),
          header: column.header,
          position: "sticky",
        })
      ),
    [columns]
  );
  const table = useReactTable({
    columns: enhancedColumns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <Table size="sm" bgColor={tableBgColor}>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
              const meta = header.column.columnDef.meta;
              return (
                <Th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  isNumeric={meta?.isNumeric}
                >
                  <Flex alignItems="center">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    <chakra.span pl="4">
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === "desc" ? (
                          <TbArrowDown aria-label="sorted descending" />
                        ) : (
                          <TbArrowUp aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Flex>
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
              const meta = cell.column.columnDef.meta;
              return (
                <Td key={cell.id} isNumeric={meta?.isNumeric}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
