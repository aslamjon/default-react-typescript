import { childrenProps } from "interfaces";
import { useAppSelector } from "services/hooks";

const IsAuth = ({ children }: childrenProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return <>{isAuthenticated ? children : null}</>;
};

export default IsAuth;
