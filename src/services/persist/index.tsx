import { InitialLoader } from "components/loaders";
import { childrenProps } from "interfaces";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "services/store/configure";

const PersistComponent = ({ children }: childrenProps) => (
	<PersistGate loading={<InitialLoader />} persistor={persistor}>
		{children}
	</PersistGate>
);

export default PersistComponent;
