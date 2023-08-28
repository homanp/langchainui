import { useEffect, useMemo, useState } from "react";
import {
  chakra,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  IconButton,
  Input,
  Button,
} from "@chakra-ui/react";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
  HiChevronDown,
} from "react-icons/hi";

const Pagination = ({ total = 0, onPageSizeChange, onCurrentPageChange }) => {
  const pageSizes = useMemo(() => [10, 20, 30, 40, 50], []);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageText, setCurrentPageText] = useState("");

  const [pageSize, setPageSize] = useState(pageSizes[0]);
  const pageCount = useMemo(
    () => Math.floor((total - 1) / pageSize) + 1,
    [total, pageSize]
  );

  const handleChange = (event) => {
    setCurrentPageText(event.target.value);
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      const text = event.target.value.replace(/^\s*\n/gm, "");
      const cur = Number(text.split("/")[0]);
      setCurrentPage(cur);
      setCurrentPageText(`${cur}/${pageCount}`);
    }
  };
  useEffect(() => {
    onCurrentPageChange && onCurrentPageChange(currentPage);
  }, [currentPage, onCurrentPageChange]);

  useEffect(() => {
    onPageSizeChange && onPageSizeChange(pageSize);
  }, [pageSize, onPageSizeChange]);

  const handleNext = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFirst = () => {
    setCurrentPage(1);
  };

  const handleLast = () => {
    setCurrentPage(pageCount);
  };

  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <HStack>
        <IconButton size="sm" onClick={handleFirst}>
          <Icon
            as={HiChevronDoubleLeft}
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
            boxSize={4}
          />
        </IconButton>
        <IconButton size="sm" onClick={handlePrev}>
          <Icon
            as={HiChevronLeft}
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
            boxSize={4}
          />
        </IconButton>
        <Input
          size="sm"
          w="100px"
          textAlign="center"
          value={currentPageText || `${currentPage}/${pageCount}`}
          onChange={handleChange}
          onKeyDown={handleEnter}
        />
        <IconButton size="sm" onClick={handleNext}>
          <Icon
            as={HiChevronRight}
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
            boxSize={4}
          />
        </IconButton>
        <IconButton size="sm" onClick={handleLast}>
          <Icon
            as={HiChevronDoubleRight}
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
            boxSize={4}
          />
        </IconButton>
        <Menu>
          <MenuButton
            size="sm"
            ml={1}
            as={Button}
            rightIcon={<HiChevronDown />}
          >
            {pageSize} / page
          </MenuButton>
          <MenuList>
            {pageSizes.map((size, index) => (
              <MenuItem
                key={`pagination-size-${index}`}
                onClick={() => setPageSize(size)}
              >
                {size}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default Pagination;
