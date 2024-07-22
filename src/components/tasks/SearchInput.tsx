import { Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface Props {
  handleChangeQuery: (value: string) => void;
}

const SearchInput = ({ handleChangeQuery }: Props) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleChangeQuery(input);
    }, 500);

    return () => clearTimeout(timeout);
  }, [input, handleChangeQuery]);

  return <Input placeholder="Search tasks..." onChange={(e) => setInput(e.target.value)} backgroundColor="white" />;
};

export default SearchInput;
