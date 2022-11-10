import {Route, Routes} from 'react-router-dom';
import {get} from 'lodash';

const PagePathsWithComponents: {
  [k: string]: {
    default: any;
  };
} = import.meta.glob('../routes/*.ts', {eager: true});

const routes = Object.keys(PagePathsWithComponents).map((_path: string) => {
  const name = get(_path.match(/\.\.\/routes\/(.*)\.ts$/), 1, '');
  const path = name === 'home' ? '/' : `/${name}`;
  const pathAbsolute = path.replace(/\|/g, '/');
  return {
    name,
    path: pathAbsolute,
    component: PagePathsWithComponents[_path].default
  };
});

const App = () => (
  <Routes>
    {routes.map(({path, component: RouteComp}) => {
      return <Route key={path} path={path} element={<RouteComp/>}/>;
    })}
  </Routes>
);
export default App;
