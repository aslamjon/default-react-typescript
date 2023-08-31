// import config from "config";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { request } from "services/api";

const Index = () => {
	const [message, setmessage] = useState("");
	const { number } = useParams();
	// console.log(config.isProduction);
	useEffect(() => {
		// console.log("render use Effect");

		// request({
		//   url: "auth/v1/auth/get-sms-code",
		//   method: "post",
		//   body: { phoneNumber: "998915411998" },
		//   success: (res) => {
		//     console.log(res);
		//   },
		//   fail: (e) => {
		//     console.log("error", e);
		//   },
		// });
		if (number) setmessage(number);
		else setmessage("no");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const navigate = useNavigate();
	return (
		<div>
			Index {message}
			<Link to="/about">about</Link>
			<button onClick={() => navigate("/about")}>about</button>
		</div>
	);
};

export default Index;
