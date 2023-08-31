import React, { memo, useEffect, useRef } from "react";
import { get, isArray } from "lodash";
import { hexToRgb } from "utils";
import { getColorByValue } from "./CustomMultiLabel";

const colorKey = "colorCode";

const CustomMultiHeader = ({ data, maxShowSelected, options, labelKey, setAutoSelectedCount }) => {
	const headerRef = useRef({});

	useEffect(() => {
		if (data?.length > 0 && !maxShowSelected) {
			const cols = headerRef.current?.children;
			let count = 0;
			Array.from(cols).forEach((col) => {
				const rect = col.getBoundingClientRect();
				if (rect.top === cols[0].getBoundingClientRect().top) {
					count++;
				}
			});
			setAutoSelectedCount(count);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data?.length]);

	return (
		<div className="multiValueList" ref={headerRef}>
			{isArray(data) &&
				data.map(
					(val, index) =>
						index < (maxShowSelected || 10000) && (
							<div
								className="multiValue"
								style={{
									color: get(val, colorKey, ""),
									background: `rgba(${hexToRgb(getColorByValue(options, val))}, 0.1)`,
								}}
								key={index}
							>
								{val[labelKey]}
							</div>
						)
				)}
		</div>
	);
};

export default memo(CustomMultiHeader);
