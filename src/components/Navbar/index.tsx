import { Button, Flex, Input, Span } from "@icstark/ui";
import React from "react";

function index({ search, setSearch, history }: any) {
  return (
    <Flex bg={`black`} justifyContentSpaceBetween style={{ padding: "0 20px" }}>
      <Flex width={0.5} justifyContentSpaceBetween>
        <Span
          style={{
            color: "#fff",
            margin: "10px 50px",
            fontSize: "20px",
          }}
        >
          Task
        </Span>
        <Flex width={0.7}>
          <Input
            placeholder="Search..."
            type="text"
            value={search}
            onChange={setSearch}
            style={{ width: "100%", margin: "5px 0" }}
          />
        </Flex>
      </Flex>
      <Button
        variant="xs primary"
        style={{ margin: "5px 0" }}
        onClick={() => history.push("/login")}
      >
        Logout
      </Button>
    </Flex>
  );
}

export default index;
