import { Router } from "react-router-dom";
import { useRef, useState, useLayoutEffect } from "react";
import { BrowserHistory, createBrowserHistory } from "history";
import { childrenProps } from "interfaces";

export const customHistory = createBrowserHistory();

const CustomBrowserRouter = ({ basename, children }: { basename?: string } & childrenProps) => {
  const historyRef = useRef<BrowserHistory | null>(null);

  if (historyRef.current == null) {
    historyRef.current = customHistory;
  }
  const history = historyRef.current;

  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return <Router basename={basename} children={children} location={state.location} navigationType={state.action} navigator={history} />;
};

export default CustomBrowserRouter;
