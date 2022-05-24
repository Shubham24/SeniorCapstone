import { Redirect, Route, RouteProps } from 'react-router';

/**
 * Props for the ConditionalRoute Component
 * condition: condition on whether or not to route to a certain path
 * redirectPath: the path that will be used to redirect the user to
 */
export type ProtectedRouteProps = {
  condition: boolean;
  redirectPath: string;
} & RouteProps;


/*
 * ConditionalRoute: Wraps 'react-router-dom' Route object. Only routes to a certain path if the given condition is true
 * @param condition: condition to check whether or not the route should take the user to the given path
 * @param redirectPath: path to redirect to if the condition is not met
 * @param ...routeProps: rest of the props regarding a regular Route component from 'react-router-dom'
 * @returns Route Component to given path if condition is met, otherwise Redirect component with the given redirect path
 */
export default function ConditionalRoute({ condition, redirectPath, ...routeProps }: ProtectedRouteProps) {
  if (condition) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: redirectPath }} />;
  }
};