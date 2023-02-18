import React, { ChangeEvent, FC } from "react";
import { Textarea, FormControl } from "@chakra-ui/react";
import { IData } from "../App";

export const Form: FC<{
  query: string;
  setQuery: (query: string) => void;
  generateImage?: () => void;
  loading: boolean;
  setData: (data: IData[]) => void;
  placeholder: string;
}> = ({ query, setQuery, generateImage, placeholder }) => {
  return (
    <FormControl onSubmit={generateImage}>
      <Textarea
        value={query}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setQuery(e.currentTarget.value)
        }
        width={"100%"}
        placeholder={placeholder}
      />
    </FormControl>
  );
};
