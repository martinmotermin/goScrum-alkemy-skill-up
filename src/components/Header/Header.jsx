import { CloseIcon } from "@chakra-ui/icons";
import { Button, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Header = () => {
  const { tasks } = useSelector((state) => {
    return state.tasksReducer;
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userName");
    navigate("/login", { replace: true });
  };

  return (
    <Flex
      justifyContent="space-between"
      padding="12px 15px"
      boxShadow={"md"}
      mb="10px"
    >
      <Image src="./img/GoScrum.svg" />
      <Flex alignItems="center">
        <Button onClick={() => navigate("/donate")}>Doná</Button>
        <Text marginRight="15px">Tareas creadas: {tasks?.length}</Text>
        <Text
          marginRight="15px"
          color="primary"
          fontSize="18px"
          textDecoration="underline"
        >
          {localStorage.getItem("userName")}
        </Text>
        <IconButton
          icon={<CloseIcon />}
          onClick={handleLogout}
          background="transparent"
        />
      </Flex>
    </Flex>
  );
};
