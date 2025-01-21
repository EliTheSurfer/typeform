import { createBrowserRouter } from 'react-router-dom';
import QuestionnaireForm from './pages/QuestionnaireForm';
import Welcome from './pages/Welcome';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: '/questionnaire',
    element: <QuestionnaireForm />,
  }
]); 