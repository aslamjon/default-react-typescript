import { ReactNode } from "react";

export type childrenType = JSX.Element | JSX.Element[] | string | string[] | ReactNode | null;

type childrenProps = {
	children?: childrenType;
};
export type { childrenProps };

export type tType = (name: string) => string;
export interface tProps {
	t: tType;
}
