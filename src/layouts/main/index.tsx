import Toastify from "components/toastify";
import { childrenProps } from "interfaces";

const MainLayout = ({ children }: childrenProps) => {
	return (
		<>
			<Toastify />
			{children}
		</>
	);
};

export default MainLayout;
