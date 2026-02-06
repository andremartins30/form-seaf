import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthForm } from "./components/AuthForm";
import DynamicForm from "./components/DynamicForm";
import Home from "./components/Home";
import { useSearchParams } from "react-router-dom";

function FormularioWrapper() {
  const [searchParams] = useSearchParams();
  const editMode = searchParams.get('editMode') === 'true';

  // Se está em modo de edição, não ativa viewMode
  return <DynamicForm viewMode={!editMode} />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthForm>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formulario" element={<DynamicForm />} />
          <Route path="/formulario/:id" element={<FormularioWrapper />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthForm>
    </BrowserRouter>
  );
}

export default App;
