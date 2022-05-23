import React, { useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, IconButton, Text } from "@chakra-ui/react";
import { limitString } from "../../helpers";

export const Card = ({ data, deleteCard, editCardStatus }) => {
  const [showMore, setShowMore] = useState(false);

  const dateTime = new Date(data.createdAt).toLocaleString();

  const checkStatusButton = (data) => {
    switch (data.status) {
      case "NEW":
        return (
          <Button
            name="status"
            type="button"
            variant="new"
            fontSize="8px"
            letterSpacing="0.5px"
            onClick={() => editCardStatus(data)}
          >
            Nueva
          </Button>
        );
        break;
      case "IN PROGRESS":
        return (
          <Button
            name="status"
            type="button"
            variant="inProgress"
            fontSize="8px"
            letterSpacing="0.5px"
            onClick={() => editCardStatus(data)}
          >
            En progreso
          </Button>
        );
        break;
      case "FINISHED":
        return (
          <Button
            name="status"
            type="button"
            variant="finished"
            fontSize="8px"
            letterSpacing="0.5px"
            onClick={() => editCardStatus(data)}
          >
            Finalizada
          </Button>
        );
        break;

      default:
        break;
    }
  };

  const checkImportanceButton = (data) => {
    switch (data.importance) {
      case "LOW":
        return (
          <Button
            name="importance"
            type="button"
            variant="low"
            fontSize="8px"
            letterSpacing="0.5px"
          >
            Baja
          </Button>
        );
        break;
      case "MEDIUM":
        return (
          <Button
            name="importance"
            type="button"
            variant="medium"
            fontSize="8px"
            letterSpacing="0.5px"
          >
            Media
          </Button>
        );
        break;
      case "HIGH":
        return (
          <Button
            name="importance"
            type="button"
            variant="high"
            fontSize="8px"
            letterSpacing="0.5px"
          >
            Alta
          </Button>
        );
        break;

      default:
        break;
    }
  };

  return (
    <Box
      paddingX="15px"
      paddingTop="15px"
      paddingBottom="40px"
      width="212px"
      boxShadow="lg"
      borderRadius="lg"
      position="relative"
      marginBottom="10px"
    >
      <Text
        as="h3"
        fontSize="15px"
        fontWeight="600"
        lineHeight="15px"
        letterSpacing="0.5px"
        width="70%"
        marginBottom="5px"
      >
        {data?.title}
      </Text>
      <Text as="h6" fontSize="10px" fontWeight="400" lineHeight="10px">
        {dateTime}
      </Text>
      <Text
        as="h6"
        fontSize="10px"
        fontWeight="400"
        lineHeight="10px"
        letterSpacing="0.5px"
      >
        {data?.user.userName}
      </Text>
      {checkStatusButton(data)}
      {checkImportanceButton(data)}
      <IconButton
        icon={<CloseIcon />}
        background="transparent"
        color="primary"
        position="absolute"
        top="0"
        right="0"
        fontSize="12px"
        onClick={() => deleteCard(data?._id)}
      />

      <Text
        fontSize="10px"
        fontWeight="400"
        letterSpacing=".8px"
        lineHeight="9.68px"
        marginTop="10px"
      >
        {showMore ? data.description : limitString(data?.description).str}
      </Text>
      {!showMore && limitString(data?.description).addButton && (
        <Button
          variant="new"
          fontSize="8px"
          fontWeight="400"
          onClick={() => setShowMore(true)}
        >
          Ver mas
        </Button>
      )}
      {showMore && (
        <Button
          variant="new"
          fontSize="8px"
          fontWeight="400"
          onClick={() => setShowMore(false)}
        >
          Ver menos
        </Button>
      )}
    </Box>
  );
};
