import Icon from "components/icon";
import { memo } from "react";

const CustomDropDownIcon = ({ index, dropDownRef, onClickHandler, id }) => {
	return <Icon icon="icon-more-dots" mainClassName="notClose" color="#353945" mainOnClick={onClickHandler} data-index={index} data-id={id} />;
};

export default memo(CustomDropDownIcon);
