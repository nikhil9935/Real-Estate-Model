import { Routers } from "./routes/Router";
import { lazy, Suspense } from 'react';
import SpinLoader from "./components/Spinner";

const App = () => {
  return (
    <Suspense fallback={<SpinLoader tip="Loading..." size="large" />}>
      <Routers />
    </Suspense>
  );
};

export default App;