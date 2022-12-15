import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import 'src/app/firebase';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import ThemeProvider from './theme/ThemeProvider';
import { store } from 'src/app/store';
const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  <HelmetProvider>
    <ThemeProvider>
      <Provider store={store}>
        <SidebarProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SidebarProvider>
      </Provider>
    </ThemeProvider>
  </HelmetProvider>
);
