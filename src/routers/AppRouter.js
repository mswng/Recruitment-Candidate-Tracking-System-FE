import { Routes, Route } from "react-router-dom";
import {
  publicRouter,
  adminRouter,
  hrRouter,
  interviewerRouter,
  candidateRouter,
} from "./routes";

function AppRouter() {
  return (
    <Routes>
      {/* PUBLIC */}
      {publicRouter.map((r, i) => (
        <Route key={i} path={r.path} element={r.element} />
      ))}

      {/* ADMIN */}
      {adminRouter.map((r, i) => (
        <Route key={`admin-${i}`} path={`/admin${r.path}`} element={r.element} />
      ))}

      {/* HR */}
      {hrRouter.map((r, i) => (
        <Route key={`hr-${i}`} path={`/hr${r.path}`} element={r.element} />
      ))}

      {/* INTERVIEWER */}
      {interviewerRouter.map((r, i) => (
        <Route
          key={`interviewer-${i}`}
          path={`/interviewer${r.path}`}
          element={r.element}
        />
      ))}

      {/* CANDIDATE */}
      {candidateRouter.map((r, i) => (
        <Route key={`candidate-${i}`} path={r.path} element={r.element} />
      ))}
    </Routes>
  );
}

export default AppRouter;
