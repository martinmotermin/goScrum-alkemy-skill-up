import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import { postNewTask } from "../../store/actions/tasksActions";
import { useDispatch } from "react-redux";

export const TaskForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    title: "",
    status: "",
    importance: "",
    description: "",
  };

  const onSubmit = (values) => {
    dispatch(postNewTask(values));
    resetForm();
    toast("Tarea nueva creada");
  };

  const validationSchema = () =>
    Yup.object().shape({
      title: Yup.string()
        .min(6, "Titulo demasiado corto")
        .required("*Campo requerido"),
      status: Yup.string().required("*Campo requerido"),
      importance: Yup.string().required("*Campo requerido"),
      description: Yup.string().required("*Campo requerido"),
    });
  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const {
    handleSubmit,
    handleChange,
    errors,
    touched,
    handleBlur,
    values,
    resetForm,
  } = formik;

  return (
    <Flex
      flexDirection="column"
      justifyContent="flex-start"
      borderRadius="lg"
      height={{ lg: "calc(100vh - 100px)" }}
      padding="10px"
      width={{ base: "100%", md: "30%", xl: "50%" }}
    >
      <Heading as="h2" fontSize="24px" fontWeight="600" lineHeight="29.05px">
        Crear Tareas
      </Heading>
      <Text
        as="h6"
        mt="11px"
        fontSize="15px"
        fontWeight="400"
        lineHeight="18.15px"
      >
        Crea tus Tareas
      </Text>
      <form style={{ height: "100%" }} onSubmit={handleSubmit}>
        <Flex
          display="flex"
          mt="10px"
          flexDirection={{ base: "column", xl: "row" }}
        >
          <FormControl>
            <Input
              name="title"
              placeholder="Título"
              onChange={handleChange}
              onBlur={handleBlur}
              errorBorderColor="primary"
              isInvalid={errors.title ? true : false}
              value={values.title}
            />
            {errors.title && touched.title && (
              <Text fontSize="10px" color="primary" letterSpacing="1px">
                {errors.title}
              </Text>
            )}
          </FormControl>

          <FormControl>
            <Select
              name="status"
              placeholder="Estado"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.status}
            >
              <option value="NEW">Nuevo</option>
              <option value="IN PROGRESS">En proceso</option>
              <option value="FINISHED">Finalizado</option>
            </Select>
            {errors.status && touched.status && (
              <Text fontSize="10px" color="primary" letterSpacing="1px">
                {errors.status}
              </Text>
            )}
          </FormControl>
          <FormControl>
            <Select
              name="importance"
              placeholder="Prioridad"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.importance}
            >
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </Select>
            {errors.importance && touched.importance && (
              <Text fontSize="10px" color="primary" letterSpacing="1px">
                {errors.importance}
              </Text>
            )}
          </FormControl>
        </Flex>
        <FormControl height="200px" mt="11px" mb="15px">
          <Textarea
            name="description"
            resize="none"
            height="100%"
            placeholder="Descripción"
            onChange={handleChange}
            value={values.description}
          />
          {errors.description && touched.description && (
            <Text fontSize="10px" color="primary" letterSpacing="1px">
              {errors.description}
            </Text>
          )}
        </FormControl>
        <Button
          type="submit"
          bg="primary"
          color="white"
          fontSize="15px"
          fontWeight="400"
          lineHeight="18.15px"
          paddingX="30px"
          paddingY="10px"
        >
          Crear
        </Button>
      </form>
      <ToastContainer />
    </Flex>
  );
};
