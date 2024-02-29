import { Routes, Route } from "react-router-dom";
import { getRoutes } from "../../core/util/helpers/routing";

export const PublicRoutes = () => {
  const routes = getRoutes({ private: false });
  return (
    <Routes>
      {routes.map((item) =>
        item.pages ? (
          <Route key={item.id} path={item.route} element={item.element}>
            {item.pages.map((page) => (
              <Route key={page.id} path={page.route} element={page.element} />
            ))}
          </Route>
        ) : (
          <Route key={item.id} path={item.route} element={item.element} />
        )
      )}
    </Routes>
  );
};
