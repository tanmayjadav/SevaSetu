
import { Outlet} from "react-router-dom";

import HeaderNew from "./components/header/HeaderNew";


function App() {
  return (
    <>
    {/* <Provider store={store}> */}
      {/* <FoundationContextProvider> */}
       <HeaderNew />
       <Outlet />
      {/* </FoundationContextProvider> */}
    {/* </Provider> */}
    </>
  );
}

export default App;
