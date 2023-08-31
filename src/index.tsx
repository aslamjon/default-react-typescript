import ReactDOM from "react-dom/client";
import Persist from "services/persist";
import Store from "services/store";
import Router from "router";
import Auth from "services/auth/Auth";
import Theme from "theme";
import I18n from "i18n/Provider";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
	// <React.StrictMode>
	<Store>
		<Auth>
			<Persist>
				<I18n>
					<Theme>
						<Router />
					</Theme>
				</I18n>
			</Persist>
		</Auth>
	</Store>
	// </React.StrictMode>
);
