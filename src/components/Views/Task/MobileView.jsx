import React from "react";
import { Flex, Heading, Skeleton } from "@chakra-ui/react";
import { Card } from "../../Card/Card";

export const MobileView = ({
  renderList,
  loading,
  error,
  deleteCard,
  editCardStatus,
}) => {
  const renderAllCards = () => {
    return renderList?.map((data) => (
      <Card
        key={data._id}
        data={data}
        deleteCard={deleteCard}
        editCardStatus={editCardStatus}
      />
    ));
  };

  return (
    <Flex flexDirection="column" paddingX="8px" paddingY="20px" boxShadow="md">
      {loading ? (
        <Skeleton width="200px" height="200px" />
      ) : !renderList?.length ? (
        <Heading>No hay tareas creadas</Heading>
      ) : (
        renderAllCards()
      )}
      {error && <Heading>Hubo un problema al cargar las tareas</Heading>}
    </Flex>
  );
};
