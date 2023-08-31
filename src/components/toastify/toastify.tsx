import React, { memo } from "react";
import { ToastContainer, Flip } from "react-toastify";

const Toastify = () => {
	return (
		<ToastContainer transition={Flip} position="bottom-right" autoClose={3000} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable />
	);
};

export default memo(Toastify);
