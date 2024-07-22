import { Button, Flex } from '@chakra-ui/react';

interface Props {
  currentPage: number;
  totalPages: number;
  callback: (page: number) => void;
}

const Pagination = ({ callback, currentPage, totalPages }: Props) => {
  const handleChangePage = (page: number) => {
    if (currentPage === page) {
      return;
    }
    callback(page);
  };

  return (
    <Flex align="center" justify="center" gap={2} mt="5">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button key={page} onClick={() => handleChangePage(page)} isDisabled={currentPage === page} size="xs">
          {page}
        </Button>
      ))}
    </Flex>
  );
};

export default Pagination;
