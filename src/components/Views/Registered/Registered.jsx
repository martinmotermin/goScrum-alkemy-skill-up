import React from "react";
import { useParams } from "react-router-dom";

export const Registered = () => {
  const { teamID } = useParams();
  return <div>Estan en el team : {teamID}</div>;
};
