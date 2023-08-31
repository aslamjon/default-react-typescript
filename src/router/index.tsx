import SignIn from "pages/auth/SignIn";
import SignUpPage from "pages/auth/SignUp";
import { Navigate, Route, Routes } from "react-router-dom";
import Test from "pages/Test";
import Layout from "layouts/Layout";
import IsAuth from "services/auth/IsAuth";
import IsGuest from "services/auth/IsGuest";
import CustomBrowserRouter from "./CustomBrowserRouter";
import LayoutManager from "layouts";
import LoginOrSignUp from "pages/auth/LoginOrSignUp";
import Verification from "pages/auth/Verification";
import ForgotPassword from "pages/auth/ForgotPassword";

const Router = () => {
	return (
		<CustomBrowserRouter>
			<LayoutManager>
				<IsAuth>
					<Routes>
						<Route path="/" element={<Layout />}>
							{/* <Route index element={<Tags />} /> */}
							{/* <Route path="keys" element={<Keys />} /> */}
						</Route>
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</IsAuth>
				<IsGuest>
					<Routes>
						<Route path="/" element={<LoginOrSignUp />} />
						<Route path="sign-up/:phoneNumber" element={<SignUpPage />} />
						<Route path="verification/:data" element={<Verification />} />
						<Route path="test">
							<Route index element={<Test />} />
							<Route path=":number" element={<Test />} />
						</Route>

						<Route path="login/:phoneNumber" element={<SignIn />} />
						<Route path="forgot-password/:data" element={<ForgotPassword />} />
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</IsGuest>
			</LayoutManager>
		</CustomBrowserRouter>
	);
};

export default Router;
