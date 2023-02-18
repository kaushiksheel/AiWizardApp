import { Box, Button, Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import { Container } from "../components/Container";
import { Form } from "../components/Form";
import { Header } from "../components/Header";
import { openai } from "../lib/openAi";
import "prismjs/themes/prism-okaidia.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

function GenerateText() {
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<unknown>("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: query,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      if (res.data) {
        setLoading(false);
        setData(res.data.choices[0].text as string);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setQuery("");
  };

  return (
    <>
      <Header />
      <main>
        <Container>
          <Box m={"52px auto"} width={400}>
            <Form
              loading={loading}
              query={query}
              setData={setData}
              setQuery={setQuery}
              placeholder="search anything"
            />
            <Box
              marginTop={3}
              display={"flex"}
              alignItems="center"
              columnGap={2}
            >
              <Button
                onClick={handleSearch}
                _hover={{ background: "#0D6EFD" }}
                bg={"#0D6EFD"}
                color="white"
                width="100%"
                variant={"solid"}
              >
                {loading ? <Spinner color="white" size={"sm"} /> : "Search"}
              </Button>
              <Button
                disabled={!query}
                onClick={() => setData("")}
                _hover={{ background: "#ED4C67" }}
                bg={"#ED4C67"}
                color="white"
              >
                Clear
              </Button>
            </Box>
          </Box>
          <Box margin={"auto"} width="fit-content">
            {(data as string) && (
              <SyntaxHighlighter
                showInlineLineNumbers
                wrapLongLines
                wrapLines
                language="javascript"
                style={oneLight}
              >
                {data as string}
              </SyntaxHighlighter>
            )}
          </Box>
        </Container>
      </main>
    </>
  );
}

export default GenerateText;
