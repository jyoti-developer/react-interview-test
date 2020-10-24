import { Button, Flex, Input, Span } from "@icstark/ui";
import React from "react";
import bg from "../../../assets/images/login_background.jpg";

function Login({ history }: any) {
  const [form, setForm] = React.useState<any>({
    values: {},
    error: {},
    msg: "",
  });
  const onChange = ({ target }: any) => {
    const data = {
      ...form,
      values: { ...form.values, [target.name]: target.value },
    };
    setForm(data);
  };
  const onBlur = ({ target }: any) => {
    if (!target.value) {
      let data = {
        ...form,
        error: {
          ...form.error,
          [target.name]: "This Field Is Required",
        },
      };
      setForm(data);
    } else {
      let data = {
        ...form,
        error: { ...form.error, [target.name]: "" },
      };
      setForm(data);
    }
  };

  const onSubmit = () => {
    const { username, password } = form.values;
    if (username === "admin" && password === "admin") {
      history.push("/");
    } else {
      setForm({ ...form, msg: "Incorrect username and password" });
    }
  };

  return (
    <Flex
      width={1}
      justifyContentCenter
      alignItemsCenter
      style={{
        height: "100vh",
        background: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <Flex
        width={[1, 0.3]}
        bg={`#fff`}
        column
        justifyContentCenter
        alignItemsCenter
        m={5}
        p={5}
      >
        <Span variant="h1" color={`#aaa`}>
          LOGIN
        </Span>
        <hr
          style={{
            height: 1,
            width: "99%",
            background: "#aaa",
            border: "none",
            margin: "10px 0",
          }}
        />
        <Input
          type="text"
          name="username"
          placeholder="Enter Username"
          style={{ margin: "10px" }}
          width={[0.8, 0.7]}
          onChange={onChange}
          onBlur={onBlur}
        />
        {form.error["username"] && (
          <Span style={{ color: "red" }}>*{form.error["username"]}</Span>
        )}
        <Input
          type="password"
          name="password"
          placeholder="Enter Password"
          style={{ margin: "10px" }}
          width={[0.8, 0.7]}
          onChange={onChange}
          onBlur={onBlur}
        />
        {form.error["password"] && (
          <Span style={{ color: "red" }}>*{form.error["password"]}</Span>
        )}
        <Button variant="primary" width={[0.8]} onClick={onSubmit}>
          Submit
        </Button>
        <Span style={{ color: "red" }}>{form.msg}</Span>
      </Flex>
    </Flex>
  );
}

export default Login;
