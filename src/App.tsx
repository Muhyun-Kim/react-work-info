import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { Layout } from "./components/layout";
import { LoadingScreen } from "./components/loading-screen";
import { Navbar } from "./components/navbar";
import { ProtectedLoginRoute } from "./components/protected-login-route";
import { auth } from "./firebase";
import { CreateAccount } from "./routs/create-account";
import { Home } from "./routs/home";
import { Login } from "./routs/login";
import { Work } from "./routs/work";
import { WorkInput } from "./routs/work-input";
import { WorkJson } from "./routs/work-json";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedLoginRoute>
            <Layout />
          </ProtectedLoginRoute>
        ),
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "work",
            element: <Work />,
          },
          {
            path: "work-input",
            element: <WorkInput />,
          },
          {
            path: "work-json",
            element: <WorkJson />,
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "create-account",
        element: <CreateAccount />,
      },
    ],
  },
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color:white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <Wrapper>
        <GlobalStyles />
        {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
      </Wrapper>
    </>
  );
}

export default App;
