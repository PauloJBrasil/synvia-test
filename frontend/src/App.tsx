import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import routes from './routes';
import { StyledEngineProvider } from '@mui/material';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <RouterProvider router={routes} />
      </StyledEngineProvider>
      <Toaster
        position="bottom-center"
        containerStyle={{
          zIndex: 99999,
        }}
        toastOptions={{
          style: {
            zIndex: 99999,
            border: "1px solid #0a1c3e63",
            padding: "16px",
            color: "#0a1c3e",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
