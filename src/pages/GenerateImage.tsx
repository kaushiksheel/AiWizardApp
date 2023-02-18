import React, { useState } from "react";
import { Box, Button, Image, Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Header } from "../components/Header";
import { Container } from "../components/Container";
import { Form } from "../components/Form";
import { openai } from "../lib/openAi";

export interface IData {
  url: string;
}

function GenerateImage() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<IData[]>();
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!query) return;
    try {
      setLoading(true);
      const res = await openai.createImage({
        prompt: query,
        n: 10,
        size: "512x512",
      });
      if (res.data) {
        setLoading(false);
        setData(res.data.data as IData[]);
      }
      if (!query) return;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <main>
        <Container>
          <Box m={"52px auto"} width={400}>
            <Form
              generateImage={generateImage}
              loading={loading}
              query={query}
              setData={setData}
              setQuery={setQuery}
              placeholder="search image"
            />
            <Box
              marginTop={3}
              display={"flex"}
              alignItems="center"
              columnGap={2}
            >
              <Button
                onClick={generateImage}
                _hover={{ background: "#0D6EFD" }}
                bg={"#0D6EFD"}
                color="white"
                width="100%"
                variant={"solid"}
              >
                {loading ? (
                  <Spinner color="white" size={"sm"} />
                ) : (
                  "Generate Image"
                )}
              </Button>
              <Button
                onClick={() => setData([])}
                _hover={{ background: "#ED4C67" }}
                bg={"#ED4C67"}
                color="white"
              >
                Clear
              </Button>
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexWrap="wrap"
            justifyContent={"center"}
            gap={5}
          >
            {data?.map(
              (
                {
                  url,
                }: {
                  url: string;
                },
                index: number
              ) => (
                <motion.div
                  whileHover={{
                    scale: 1.08,
                    filter: "saturate(1.4)",
                  }}
                  key={index}
                >
                  <Image rounded={"2xl"} width={280} height={280} src={url} />
                </motion.div>
              )
            )}
          </Box>
        </Container>
      </main>
    </>
  );
}

export default GenerateImage;
