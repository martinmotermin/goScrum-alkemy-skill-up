import React from "react";
import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  FormErrorMessage,
  Heading,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { swal } from "../../../../utils/swal";

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;

export const Login = () => {
  const required = "*Campo requerido";
  const LoginSchema = Yup.object().shape({
    userName: Yup.string().min(4, "Minimo 4 caracteres").required(required),
    password: Yup.string().required(required),
  });

  const navigate = useNavigate();

  return (
    <Flex align="center" justify="center" h="100vh">
      <Box
        bg="white"
        paddingY="20px"
        paddingX="22px"
        borderRadius="lg"
        width="441px"
        border="1px"
        borderColor="#E9E9E9"
      >
        <Formik
          initialValues={{
            userName: "",
            password: "",
            rememberMe: false,
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            fetch(`${API_ENDPOINT}auth/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userName: values.userName,
                password: values.password,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.status_code === 200) {
                  localStorage.setItem("loggedIn", data?.result?.token);
                  localStorage.setItem("userName", data?.result?.user.userName);
                  navigate("/");
                } else {
                  swal();
                }
              });
          }}
        >
          {({ handleSubmit, errors, touched, resetForm }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <Heading fontSize={"24px"} fontWeight="600">
                  Iniciar Sesion
                </Heading>
                <FormControl isInvalid={!!errors.userName && touched.userName}>
                  <FormLabel
                    htmlFor="userName"
                    fontSize="15px"
                    fontWeight="400"
                  >
                    Nombre de usuario
                  </FormLabel>
                  <Field
                    as={Input}
                    id="userName"
                    name="userName"
                    type="text"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel
                    htmlFor="password"
                    fontSize="15px"
                    fontWeight="400"
                  >
                    Contraseña
                  </FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Button
                  type="submit"
                  bg="primary"
                  isFullWidth
                  color="white"
                  _hover={{
                    background: "white",
                    color: "primary",
                    border: "1px",
                    borderColor: "primary",
                  }}
                >
                  Enviar
                </Button>
                <Button
                  variant="link"
                  color="#000000"
                  fontSize="15px"
                  fontWeight="400"
                  onClick={() => navigate("/register")}
                >
                  Registrarme
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};
