import React from "react";
import { Container } from "./Container";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";

export const Header = () => {
  const location = useLocation();

  const { pathname } = location;

  const navLinks = [
    {
      name: "Generate Image",
      href: "/",
    },
    {
      name: "Generate Text",
      href: "/text-generate",
    },
  ];

  return (
    <header>
      <Container>
        <nav style={{ padding: "12px 0" }}>
          <Box display={"flex"} justifyContent="space-between">
            <Link to="#!" style={{ fontWeight: "bold" }}>
              AI Wizard
            </Link>
            <Box display={"flex"} alignSelf="flex-end" columnGap={2}>
              {navLinks.map(({ href, name }, index) => (
                <Link
                  key={index}
                  style={{
                    borderBottom: pathname === href ? "2px solid black" : "",
                    paddingBottom:6
                  }}
                  to={href}
                >
                  {name}
                </Link>
              ))}
            </Box>
          </Box>
        </nav>
      </Container>
    </header>
  );
};
