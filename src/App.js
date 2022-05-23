import { lazy, Suspense } from "react";
import { Login } from "./components/Views/auth/Login/Login";
import { ChakraProvider } from "@chakra-ui/react";
import { Register } from "./components/Views/auth/Register/Register";
import { Task } from "./components/Views/Task/Task";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import theme from "./theme";
import "@fontsource/inter";
import { Registered } from "./components/Views/Registered/Registered";
import { Donate } from "./components/Views/Donate/Donate";

const Error404 = lazy(() => import("./components/Views/Error404/Error404"));

const RequiredAuth = ({ children }) => {
  return !localStorage.getItem("loggedIn") ? (
    <Navigate to="/login" replace={true} />
  ) : (
    children
  );
};

const pageTransition = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const App = () => {
  const location = useLocation();
  return (
    <ChakraProvider theme={theme}>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <RequiredAuth>
                <motion.div
                  className="page"
                  initial="out"
                  animate="in"
                  exit="out"
                  variants={pageTransition}
                >
                  <Task />
                </motion.div>
              </RequiredAuth>
            }
          />
          <Route
            path="/donate"
            element={
              <RequiredAuth>
                <motion.div
                  className="page"
                  initial="out"
                  animate="in"
                  exit="out"
                  variants={pageTransition}
                >
                  <Donate />
                </motion.div>
              </RequiredAuth>
            }
          />
          <Route
            path="/login"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Login />
              </motion.div>
            }
          />
          <Route
            path="/register"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Register />
              </motion.div>
            }
          />
          <Route
            path="/registered/:teamID"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Registered />
              </motion.div>
            }
          />
          <Route
            path="*"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Suspense fallback={<>...</>}>
                  <Error404 />
                </Suspense>
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </ChakraProvider>
  );
};

export default App;
