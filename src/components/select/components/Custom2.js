import React, { memo, useEffect, useState } from "react";
import Dropdown from "../../dropDown";
import Icon from "../../icon";
import styled, { css } from "styled-components";
import { get } from "lodash";
import ColorPicker from "../../colorPicker/colorPicker";
import OutsideClickHandler from "react-outside-click-handler";
import { connect } from "react-redux";
import ApiActions from "services/globalContextMenu/actions";

const DropDownStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 10px;
  .dropdown__option {
    display: flex;
    font-size: 14px;
    align-items: center;
    cursor: pointer;
    gap: 3px;
  }
  /* .drop-down-dots {
    ${({ color = "rgba(69, 178, 107, 0.1)" }) =>
    color &&
    css`
      background: ${color};
      height: 100%;
      display: flex;
      align-items: center;
      border-radius: 5px 0 0 5px;
      opacity: 0.8;

      .ui__icon__wrapper {
        .icon {
          background-color: #fcfcfd;
        }
      }

      &:hover {
        opacity: 0.9 !important;
      }
    `}
  } */

  .dropDown__body {
    right: -20px;
    left: auto;
    top: auto;
    overflow: unset;
    width: 150px;
  }
`;

const ActionBody = ({
  action,
  clickDelete,
  clickRename,
  optionsIndex,
  selectedIndex,
  isMulti,
  clickChangeColor,
  options,
  value,
  label,
  ...rest
}) => {
  const [state, setState] = useState({
    showColorPicker: false,
  });

  const colorSelectHandling = (color) => {
    clickChangeColor({ optionsIndex, selectedIndex, color });
  };
  return (
    <DropDownStyle {...rest}>
      {!state?.showColorPicker && (
        <>
          {" "}
          {action.delete && (
            <div className="dropdown__option" onClick={() => clickDelete({ optionsIndex, selectedIndex, options })}>
              <Icon icon="icon-recycle" color="#EF466F" mainClassName="notClose" /> Delete
            </div>
          )}
          {action.edit && (
            <div className="dropdown__option" onClick={() => clickRename({ optionsIndex, selectedIndex, options })}>
              <Icon icon="icon-edit" color="#777E90" mainClassName="notClose" /> Rename
            </div>
          )}
          {action.edit && isMulti && (
            <div className="dropdown__option" onClick={() => setState((s) => ({ showColorPicker: true }))}>
              <Icon icon="icon-change-color" color="#777E90" mainClassName="notClose" /> Change color
            </div>
          )}
          {get(action, "items", []).map((Item, index) => (
            <Item key={index} options={options} optionsIndex={optionsIndex} {...{ value, label }} />
          ))}
        </>
      )}
      <OutsideClickHandler onOutsideClick={() => state.showColorPicker && setState((s) => ({ showColorPicker: false }))}>
        {state.showColorPicker && (
          <ColorPicker
            handleChange={colorSelectHandling}
            colorPicker={state.showColorPicker}
            setColorPicker={(e) => setState((s) => ({ showColorPicker: e }))}
          />
        )}
      </OutsideClickHandler>
    </DropDownStyle>
  );
};

const CustomActionDropDownn = ({
  action,
  color,
  clickDelete,
  clickRename,
  clickChangeColor,
  optionsIndex,
  selectedIndex,
  isMulti,
  isFixed = false,
  options,
  value,
  label,
  setGlobalBodyData,
}) => {
  // const [clientXY, setClientXY] = useState({})

  const openGlobalBody = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const position = e.currentTarget.getBoundingClientRect();
    setGlobalBodyData({
      Body: ActionBody,
      position,
      open: true,
      styled: true,
      props: {
        action,
        color,
        clickDelete,
        clickRename,
        clickChangeColor,
        optionsIndex,
        selectedIndex,
        isMulti,
        isFixed,
        options,
        value,
        label,
        position,
      },
    });
  };

  return (
    <div onClick={openGlobalBody} className="drop-down-dots">
      <Icon icon="icon-more-dots" mainClassName="notClose" color="#353945" />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setGlobalBodyData: (data, storeName = "globalBodyData") => {
    dispatch({
      type: ApiActions.SET_DATA_IN_GLOBAL_CONTEXT.REQUEST,
      payload: {
        data,
        storeName,
      },
    });
  },
});

export default connect(null, mapDispatchToProps)(CustomActionDropDownn);
