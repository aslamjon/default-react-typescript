import React, { memo, useCallback, useEffect, useRef } from "react";
import { get, isArray, isEmpty, isNil, isNull, isString } from "lodash";
import classNames from "classnames";

const CustomOptions = ({
  options,
  isMulti,
  selectHandling,
  selected,
  action,
  nullable,
  searchValue,
  disabledSomeOptions,
  ignoreOption,
  valueKey,
  labelKey,
  dropDownRef,
  dropdownConfig,
  CustomDropDownIcon,
  selectOptionWithArrow,
  bodyRef,
}) => {
  const firstOptionRef = useRef(null);
  useEffect(() => {
    if (!isNull(firstOptionRef.current)) {
      let height = firstOptionRef.current.offsetHeight;
      const style = firstOptionRef.current.currentStyle || window.getComputedStyle(firstOptionRef.current);
      try {
        if (style.marginBottom?.endsWith("px")) {
          const bottom = style.marginBottom?.substring(0, style.marginBottom.length - 2);
          height += bottom * 1;
        } else if (style.marginTop?.endsWith("px")) {
          const top = style.marginTop?.substring(0, style.marginTop.length - 2);
          height += top * 1;
        }
      } catch (e) {
        console.log("custom Options", e);
      }
      bodyRef.current?.scroll({
        top: selectOptionWithArrow * height,
        behavior: "smooth",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectOptionWithArrow]);

  const onClickHandler = useCallback((e) => {
    let index = e.target.getAttribute("data-index");
    let id = e.target.getAttribute("data-id");
    let { y } = e.target.getBoundingClientRect();
    let width = get(dropdownConfig, "width", -10);
    let height = get(dropdownConfig, "height", 20);
    let right = get(dropdownConfig, "right", 0);
    let elemWidth = dropDownRef.current.offsetWidth;
    let elemHeight = dropDownRef.current.offsetHeight;

    dropDownRef.current.style.top = y - elemHeight - height + "px";
    dropDownRef.current.style.right = -elemWidth + width + right + "px";
    dropDownRef.current.classList.add("active");
    dropDownRef.current.setAttribute("index", index);
    dropDownRef.current.setAttribute("id", id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderForMulti = ({ index, ...other }) => {
    return (
      <div className={`select__body__options__option`} key={other[valueKey] + isString(other[labelKey])}>
        <div className="content" style={{ color: other?.colorCode || "#000" }} onClick={() => selectHandling(other)}>
          {other[labelKey]}
        </div>
        {(get(action, "edit", false) || get(action, "delete", false) || get(action, "create", false)) && (
          <CustomDropDownIcon
            {...{
              index,
              dropDownRef,
              onClickHandler,
              id: other[valueKey],
            }}
          />
        )}
      </div>
    );
  };

  const render = ({ index, ...other }) => {
    let res = isArray(disabledSomeOptions)
      ? disabledSomeOptions.find((item) => get(item, valueKey, "") === other[valueKey])
      : null;
    if (!isEmpty(ignoreOption)) {
      if (ignoreOption[other[valueKey]]) return "";
    }
    return (
      <div
        key={
          other[valueKey] + isString(other[labelKey])
            ? other[valueKey] + isString(other[labelKey])
            : Math.floor(Math.random() * 9999)
        }
      >
        {nullable && !index && (
          <div className={`select__body__options__option nullable`}>
            <div className="content" onClick={() => selectHandling(null)}>
              -
            </div>
          </div>
        )}
        <div
          className={classNames("select__body__options__option", {
            selected: other[valueKey] === selected,
            disabled: !isNil(res),
            selectedWithArrow: selectOptionWithArrow === index,
          })}
          data-index={index}
          {...(index === 0 ? { ref: firstOptionRef } : {})}
        >
          <div
            className="content"
            style={{ color: other?.colorCode || "#000" }}
            onClick={() => isNil(res) && selectHandling(other)}
          >
            {other[labelKey]}
          </div>
          {(get(action, "edit", false) || get(action, "delete", false) || get(action, "create", false)) && (
            <CustomDropDownIcon
              {...{
                id: other[valueKey],
                index,
                dropDownRef,
                onClickHandler,
              }}
            />
          )}
        </div>
      </div>
    );
  };

  return isEmpty(options) ? (
    <div className="select__body__options__empty">
      {action.create && !isEmpty(searchValue) ? "Press Enter or click create button" : "Result not found"}{" "}
    </div>
  ) : (
    isArray(options) &&
      options.map(
        (val, index) => (!isMulti ? render({ ...val, index }) : !get(val, "isSelected") && renderForMulti({ ...val, index }))
        // : !selected.some((item) => get(item, valueKey) === val[valueKey]) && renderForMulti({ ...val, index })
      )
  );
};
export default memo(CustomOptions);
