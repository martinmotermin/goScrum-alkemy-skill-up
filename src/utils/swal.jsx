import React from "react";
import Swal from "sweetalert2";

export const swal = () => {
  return Swal.fire({
    title: "Error!",
    text: "Credeciales invalidas",
    icon: "error",
    confirmButtonText: "Cerrar",
    background: "#ffffff",
    confirmButtonColor: "#FF452B",
    timer: 2000,
    timerProgressBar: true,
  });
};
