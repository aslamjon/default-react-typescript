import { childrenProps } from "interfaces";
import { Provider } from "react-redux";

import store, { persistor } from "./configure";

const ProviderComponent = ({ children }: childrenProps) => {
	return <Provider store={store}>{children}</Provider>;
};

export default ProviderComponent;
export { persistor, store };
