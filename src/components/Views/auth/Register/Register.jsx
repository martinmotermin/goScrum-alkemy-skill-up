import React, { useEffect, useState } from "react";
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
  Select,
  Heading,
  Switch,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;

export const Register = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`${API_ENDPOINT}auth/data`)
      .then((res) => res.json())
      .then((data) => setData(data.result))
      .catch((err) => console.log(err));
  }, []);

  const required = "*Campo requerido";
  const RegisterSchema = Yup.object().shape({
    userName: Yup.string().min(4, "Minimo 4 caracteres").required(required),
    email: Yup.string().email("Email invalido").required(required),
    switchId: Yup.boolean(),
    password: Yup.string().required(required),
    // teamID: Yup.string().required(required),
    role: Yup.string().required(required),
    continent: Yup.string().required(required),
    region: Yup.string().required(required),
  });

  const navigate = useNavigate();

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
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
            email: "",
            password: "",
            teamID: "",
            role: "",
            continent: "",
            region: "",
            switchId: false,
          }}
          validationSchema={RegisterSchema}
          onSubmit={(values) => {
            const teamID = !values.teamID ? uuidv4() : values.teamID;
            console.log(teamID);
            fetch(`${API_ENDPOINT}auth/register`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user: {
                  userName: values.userName,
                  email: values.email,
                  password: values.password,
                  teamID: teamID,
                  role: values.role,
                  continent: values.continent,
                  region: values.region,
                },
              }),
            })
              .then((res) => res.json())
              .then((data) =>
                navigate(`/registered/${data.result?.user?.teamID}`)
              );
          }}
        >
          {({
            handleSubmit,
            errors,
            touched,
            values,
            handleChange,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <Heading fontSize={"24px"} fontWeight="600">
                  Registrarse
                </Heading>
                <FormControl isInvalid={!!errors.userName && touched.userName}>
                  <FormLabel htmlFor="userName">Nombre de Usuario</FormLabel>
                  <Field
                    as={Input}
                    id="userName"
                    name="userName"
                    type="text"
                    variant="filled"
                  />
                  {errors.userName && touched.userName && (
                    <FormErrorMessage>{errors.userName}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                  />
                  {errors.password && touched.password && (
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors.email && touched.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    variant="filled"
                  />
                  {errors.email && touched.email && (
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="switchId">
                    Pertecenes a un equipo ya creado?
                  </FormLabel>
                  <Field as={Switch} id="switchId" colorScheme="red" />
                </FormControl>

                {values.switchId && (
                  <FormControl isInvalid={!!errors.teamID && touched.teamID}>
                    <FormLabel htmlFor="teamID">
                      Introduce el identificador de equipo:
                    </FormLabel>
                    <Field
                      as={Input}
                      type="text"
                      id="teamID"
                      name="teamID"
                      variant="filled"
                      value={values.teamID}
                    />
                    {console.log(values.teamID)}
                  </FormControl>
                )}

                <FormControl isInvalid={!!errors.role && touched.role}>
                  <FormLabel htmlFor="role">Rol</FormLabel>
                  <Select
                    placeholder="Seleccionar Rol"
                    onChange={handleChange}
                    name="role"
                  >
                    {data?.Rol?.map((elem) => (
                      <option key={elem} value={elem}>
                        {elem}
                      </option>
                    ))}
                  </Select>
                  {errors.role && touched.role && (
                    <FormErrorMessage>{errors.role}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  isInvalid={!!errors.continent && touched.continent}
                >
                  <FormLabel htmlFor="continent">Continente</FormLabel>
                  <Select
                    name="continent"
                    placeholder="Seleccionar Continente"
                    onChange={({ target }) => {
                      setFieldValue("continent", target.value);
                      if (target.value !== "America")
                        setFieldValue("region", "Otro");
                    }}
                  >
                    {data?.continente?.map((elem) => (
                      <option key={elem} value={elem}>
                        {elem}
                      </option>
                    ))}
                  </Select>
                  {errors.continent && touched.continent && (
                    <FormErrorMessage>{errors.continent}</FormErrorMessage>
                  )}
                </FormControl>

                {values.continent === "America" && (
                  <FormControl isInvalid={!!errors.region && touched.region}>
                    <FormLabel htmlFor="region">Region</FormLabel>
                    <Select
                      placeholder="Seleccionar region"
                      name="region"
                      onChange={handleChange}
                    >
                      {data?.region?.map((elem) => (
                        <option key={elem} value={elem}>
                          {elem}
                        </option>
                      ))}
                    </Select>
                    {errors.region && touched.region && (
                      <FormErrorMessage>{errors.region}</FormErrorMessage>
                    )}
                  </FormControl>
                )}

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
                  onClick={() => navigate("/login")}
                >
                  Ya tengo cuenta
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};
