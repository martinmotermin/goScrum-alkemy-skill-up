import {
  Flex,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useResize } from "../../../hooks/useResize";
import { Header } from "../../Header/Header";
import { TaskForm } from "../../TaskForm/TaskForm";
import { DesktopView } from "./DesktopView";
import { MobileView } from "./MobileView";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import {
  getTasks,
  editTaskStatus,
  deleteTask,
} from "../../../store/actions/tasksActions";

export const Task = () => {
  const [list, setList] = useState(null);
  const [renderList, setRenderList] = useState(null);
  const [radio, setRadio] = useState("ALL");
  const [search, setSearch] = useState("");
  const { isMobile } = useResize();
  const dispatch = useDispatch();
  const { loading, error, tasks } = useSelector((state) => {
    return state.tasksReducer;
  });

  const handleChangeRadio = (value) => setRadio(value);

  const handleChangeSelect = (e) => {
    if (e.currentTarget.value === "") {
      setRenderList(list);
    } else if (e.currentTarget.value === "ALL") {
      setRenderList(list);
    } else {
      setRenderList(
        list.filter((data) => data.importance === e.currentTarget.value)
      );
    }
  };
  const handleChangeSearch = debounce((e) => setSearch(e?.target?.value), 1000);

  const handleDelete = (id) => dispatch(deleteTask(id));

  const handleEditCardStatus = (data) => dispatch(editTaskStatus(data));

  useEffect(() => {
    if (tasks?.length) {
      setList(tasks);
      setRenderList(tasks);
    }
  }, [tasks]);

  useEffect(() => {
    dispatch(getTasks(radio === "ME" ? "me" : ""));
  }, [radio]);

  useEffect(() => {
    if (search) {
      setRenderList(list.filter((data) => data.title.startsWith(search)));
    } else {
      setRenderList(list);
    }
  }, [search]);

  return (
    <>
      <Header />
      <Flex flexDirection={{ base: "column", md: "row" }}>
        <TaskForm />
        <Flex
          flexDirection="column"
          paddingX="8px"
          paddingY="20px"
          boxShadow="md"
          width={{ base: "100%", md: "60%", lg: "50%" }}
        >
          <Heading fontSize="24px">Mis tareas</Heading>

          <RadioGroup onChange={handleChangeRadio} value={radio}>
            <Stack direction="row" spacing={3}>
              <Radio colorScheme="red" value="ALL">
                Todas
              </Radio>
              <Radio colorScheme="red" value="ME">
                Mis tareas
              </Radio>
            </Stack>
          </RadioGroup>

          <Input
            type="text"
            placeholder="Buscar por titulo"
            onChange={handleChangeSearch}
          />

          <Select
            name="importance"
            onChange={handleChangeSelect}
            placeholder="Prioridad"
          >
            <option value="LOW">Baja</option>
            <option value="MEDIUM">Media</option>
            <option value="HIGH">Alta</option>
          </Select>

          {isMobile ? (
            <MobileView
              renderList={renderList}
              loading={loading}
              error={error}
              deleteCard={handleDelete}
              editCardStatus={handleEditCardStatus}
            />
          ) : (
            <DesktopView
              renderList={renderList}
              loading={loading}
              error={error}
              deleteCard={handleDelete}
              editCardStatus={handleEditCardStatus}
            />
          )}
        </Flex>
      </Flex>
    </>
  );
};
