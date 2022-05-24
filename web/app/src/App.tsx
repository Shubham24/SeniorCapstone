import React from 'react';
import Layout from './components/layout/Layout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ConditionalRoute from './components/conditionalroute/ConditionalRoute';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Location from './pages/Location';
import Courses from './pages/Courses';
import Crashes from './pages/Crashes';
import Login from './pages/Login';
import AccessDenied from './pages/AccessDenied';
import StudentCourse from './pages/students/StudentCourse';
import StudentAssignment from './pages/students/StudentAssignment';
import InstructorCourse from './pages/instructors/InstructorCourse';
import InstructorAssignment from './pages/instructors/InstructorAssignment';
import { useSelector, RootStateOrAny } from 'react-redux';

function App() {

  // get user info from Redux Store
  const user = useSelector((state: RootStateOrAny) => state.userReducer);
  const role = user.role;

  // Front end content
  // Mostly contains routing maps
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {/* <Login getRole={(userRole: any) => setUserRole(userRole)} /> */}
            <Login />
          </Route>

          <Route exact path="/dashboard">
            <Layout role={role}>
              <Dashboard role={role} />
            </Layout>
          </Route>

          <ConditionalRoute condition={role === 'admin'} redirectPath={(null || '') ? '/' : '/accessDenied'} exact path="/analytics">
            <Layout role={role}>
              <Crashes role={role} />
            </Layout>
          </ConditionalRoute>

          <Route exact path="/users">
            <Layout role={role}>
              <Users role={role} />
            </Layout>
          </Route>

          <Route exact path="/courses">
            <Layout role={role}>
              <Courses role={role} />
            </Layout>
          </Route>

          <ConditionalRoute condition={role === 'admin'} redirectPath={(null || '') ? '/' : '/accessDenied'} exact path="/location">
            <Layout role={role}>
              <Location role={role} />
            </Layout>
          </ConditionalRoute>

          <ConditionalRoute condition={role === 'student' || role === 'instructor'} redirectPath={(null || '') ? '/' : '/accessDenied'} path="/courses/:id" component={
            role === 'student' ? StudentCourse :
              role === 'instructor' ? InstructorCourse : AccessDenied
          } />

          <ConditionalRoute condition={role === 'student' || role === 'instructor'} redirectPath={(null || '') ? '/' : '/accessDenied'} path="/assignments/:id" component={
            role === 'student' ? StudentAssignment :
            role === 'instructor' ? InstructorAssignment : AccessDenied
            } />

          <Route path="/accessDenied">
            <AccessDenied />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
