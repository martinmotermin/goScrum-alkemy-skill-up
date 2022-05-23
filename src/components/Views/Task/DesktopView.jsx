import React from "react";
import { Flex, Heading, Skeleton } from "@chakra-ui/react";
import { Card } from "../../Card/Card";

export const DesktopView = ({
  renderList,
  loading,
  error,
  deleteCard,
  editCardStatus,
}) => {
  const renderColumnCards = (text) => {
    return renderList
      ?.filter((data) => data.status === text)
      .map((data) => (
        <Card
          key={data._id}
          data={data}
          deleteCard={deleteCard}
          editCardStatus={editCardStatus}
        />
      ));
  };

  return (
    <Flex
      flexDirection="column"
      paddingX="8px"
      paddingBottom="20px"
      height={"calc(100vh - 300px)"}
      overflowY="scroll"
    >
      <Flex
        flexDirection="row"
        flexWrap="wrap"
        borderRadius="lg"
        padding="10px"
        marginTop="35px"
      >
        {loading ? (
          <Skeleton width="200px" height="200px" />
        ) : !renderList?.length ? (
          <Heading>No hay tareas creadas</Heading>
        ) : (
          <>
            <Flex
              flexDirection="column"
              width="228px"
              minHeight="237px"
              borderRadius="lg"
              paddingX="8px"
              paddingBottom="15px"
              justifyContent="flex-start"
              boxShadow="md"
              marginX="8px"
            >
              <Heading
                fontSize="15px"
                fontWeight="600"
                lineHeight="18.15px"
                marginBottom="8px"
              >
                Nuevas
              </Heading>
              {renderColumnCards("NEW")}
            </Flex>
            <Flex
              flexDirection="column"
              width="228px"
              minHeight="237px"
              borderRadius="lg"
              paddingX="8px"
              paddingBottom="15px"
              justifyContent="flex-start"
              boxShadow="md"
              marginX="8px"
            >
              <Heading
                fontSize="15px"
                fontWeight="600"
                lineHeight="18.15px"
                marginBottom="8px"
              >
                En proceso
              </Heading>
              {renderColumnCards("IN PROGRESS")}
            </Flex>
            <Flex
              flexDirection="column"
              width="228px"
              minHeight="237px"
              borderRadius="lg"
              paddingX="8px"
              paddingBottom="15px"
              justifyContent="flex-start"
              boxShadow="md"
              marginX="8px"
            >
              <Heading
                fontSize="15px"
                fontWeight="600"
                lineHeight="18.15px"
                marginBottom="8px"
              >
                Finalizadas
              </Heading>
              {renderColumnCards("FINISHED")}
            </Flex>
          </>
        )}
        {error && <Heading>Hubo un problema al cargar las tareas</Heading>}
      </Flex>
    </Flex>
  );
};
