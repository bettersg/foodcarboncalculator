import { AuthProvider } from './contexts/AuthContext';
import { MealProvider } from './contexts/MealContext';
import { Router } from './Router';

const App = () => {
  return (
    <AuthProvider>
      <MealProvider>
        <Router />
      </MealProvider>
    </AuthProvider>
  );
};

export default App;
