import { Outlet } from "react-router-dom";
import Nav from "components/Nav/Nav";

const LayoutComponent = () => {
	return (
		<>
			<div className="layout">
				<Nav />
				<Outlet />
			</div>
		</>
	);
};

export default LayoutComponent;
