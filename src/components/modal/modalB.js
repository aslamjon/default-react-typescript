import classNames from "classnames";
import { isBoolean } from "lodash";
import React, { memo } from "react";
import styled from "styled-components";

const Style = styled.div`
  &.modal {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    transform: scale(0);
    z-index: 100;
    background: rgba(0, 0, 0, 0.8);
    vertical-align: middle;
    .modal__body {
      min-height: 100px;
      min-width: 100px;
      background: rgba(255, 255, 255, 1);
      border-radius: 5px;
    }
  }

  &.unfolding {
    transform: scaleY(0.01) scaleX(0);
    animation: unfoldIn ${({ one }) => one}s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

    .modal__body {
      transform: scale(0);
      animation: zoomIn ${({ helf }) => helf}s ${({ one }) => one - 0.2}s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    }
    &.out {
      transform: scale(1);
      animation: unfoldOut ${({ one }) => one}s 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
      .modal__body {
        animation: zoomOut ${({ helf }) => helf}s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
      }
    }
  }

  &.unfolding_rotete {
    transform: scaleY(0.01) scaleX(0);
    animation: unfoldInRotate 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

    .modal__body {
      transform: scale(0);
      animation: zoomIn 0.5s 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    }
    &.out {
      transform: scale(1);
      animation: unfoldOutRotate 1s 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
      .modal__body {
        animation: zoomOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
      }
    }
  }

  &.revealing {
    transform: scale(1);
    background: rgba(0, 0, 0, 0);
    animation: fadeIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  }

  @keyframes unfoldInRotate {
    0% {
      transform: scaleY(0.005) scaleX(0);
    }
    50% {
      transform: scaleY(0.005) scaleX(1) rotate(180deg);
    }
    100% {
      transform: scaleY(1) scaleX(1);
    }
  }

  @keyframes unfoldOutRotate {
    0% {
      transform: scaleY(1) scaleX(1);
    }
    50% {
      transform: scaleY(0.005) scaleX(1) rotate(180deg);
    }
    100% {
      transform: scaleY(0.005) scaleX(0);
    }
  }

  @keyframes unfoldIn {
    0% {
      transform: scaleY(0.005) scaleX(0);
    }
    50% {
      transform: scaleY(0.005) scaleX(1);
    }
    100% {
      transform: scaleY(1) scaleX(1);
    }
  }
  @keyframes unfoldOut {
    0% {
      transform: scaleY(1) scaleX(1);
    }
    50% {
      transform: scaleY(0.005) scaleX(1);
    }
    100% {
      transform: scaleY(0.005) scaleX(0);
    }
  }
  @keyframes zoomIn {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes zoomOut {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes fadeIn {
    0% {
      background: rgba(0, 0, 0, 0);
    }
    100% {
      background: rgba(0, 0, 0, 0.7);
    }
  }
  @keyframes fadeOut {
    0% {
      background: rgba(0, 0, 0, 0.7);
    }
    100% {
      background: rgba(0, 0, 0, 0);
    }
  }
  @keyframes scaleUp {
    0% {
      transform: scale(0.8) translateY(1000px);
      opacity: 0;
    }
    100% {
      transform: scale(1) translateY(0px);
      opacity: 1;
    }
  }
  @keyframes scaleDown {
    0% {
      transform: scale(1) translateY(0px);
      opacity: 1;
    }
    100% {
      transform: scale(0.8) translateY(1000px);
      opacity: 0;
    }
  }
  @keyframes scaleBack {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.85);
    }
  }
  @keyframes scaleForward {
    0% {
      transform: scale(0.85);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes quickScaleDown {
    0% {
      transform: scale(1);
    }
    99.9% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes slideUpLarge {
    0% {
      transform: translateY(0%);
    }
    100% {
      transform: translateY(-100%);
    }
  }
  @keyframes slideDownLarge {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0%);
    }
  }
  @keyframes moveUp {
    0% {
      transform: translateY(150px);
    }
    100% {
      transform: translateY(0);
    }
  }
  @keyframes moveDown {
    0% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(150px);
    }
  }
  @keyframes blowUpContent {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    99.9% {
      transform: scale(2);
      opacity: 0;
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes blowUpContentTwo {
    0% {
      transform: scale(2);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  @keyframes blowUpModal {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes blowUpModalTwo {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0);
      opacity: 0;
    }
  }
  @keyframes roadRunnerIn {
    0% {
      transform: translateX(-1500px) skewX(30deg) scaleX(1.3);
    }
    70% {
      transform: translateX(30px) skewX(0deg) scaleX(0.9);
    }
    100% {
      transform: translateX(0px) skewX(0deg) scaleX(1);
    }
  }
  @keyframes roadRunnerOut {
    0% {
      transform: translateX(0px) skewX(0deg) scaleX(1);
    }
    30% {
      transform: translateX(-30px) skewX(-5deg) scaleX(0.9);
    }
    100% {
      transform: translateX(1500px) skewX(30deg) scaleX(1.3);
    }
  }
  @keyframes sketchIn {
    0% {
      stroke-dashoffset: 778;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
  @keyframes sketchOut {
    0% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: 778;
    }
  }
  @keyframes modalFadeIn {
    0% {
      background-color: transparent;
    }
    100% {
      background-color: white;
    }
  }
  @keyframes modalFadeOut {
    0% {
      background-color: white;
    }
    100% {
      background-color: transparent;
    }
  }
  @keyframes modalContentFadeIn {
    0% {
      opacity: 0;
      top: -20px;
    }
    100% {
      opacity: 1;
      top: 0;
    }
  }
  @keyframes modalContentFadeOut {
    0% {
      opacity: 1;
      top: 0px;
    }
    100% {
      opacity: 0;
      top: -20px;
    }
  }
  @keyframes bondJamesBond {
    0% {
      transform: translateX(1000px);
    }
    80% {
      transform: translateX(0px);
      border-radius: 75px;
      height: 75px;
      width: 75px;
    }
    90% {
      border-radius: 3px;
      height: 182px;
      width: 247px;
    }
    100% {
      border-radius: 3px;
      height: 162px;
      width: 227px;
    }
  }
  @keyframes killShot {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(300px) rotate(45deg);
      opacity: 0;
    }
  }
  @keyframes fadeToRed {
    0% {
      background-color: rgba(0, 0, 0, 0.6);
    }
    100% {
      background-color: rgba(255, 0, 0, 0.8);
    }
  }
  @keyframes slowFade {
    0% {
      opacity: 1;
    }
    99.9% {
      opacity: 0;
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
`;

/* 
instracture: by default active must be null;

type: must be -> unfolding, unfolding_rotete, revealing,uncovering,blowUp,meepMeep,sketch,bond

*/

const ModalB = ({
  children,
  type = "unfolding",
  active = null,
  onClose = () => "",
  className = "",
  header,
  duration = {
    helf: 0.5,
    one: 1,
    two: 2,
  },
  ...props
}) => {
  const closeHandling = (e) => {
    let elementType = e.target.getAttribute("data-type");
    if (elementType === type) onClose();
  };

  return (
    <Style
      className={classNames(`modal`, {
        [className]: className,
        [type]: isBoolean(active),
        active: active,
        out: !active,
      })}
      onClick={closeHandling}
      data-type={type}
      {...{ ...props, ...duration, active, type }}
    >
      {header && <div className="modal__header">{header}</div>}
      <div className="modal__body">{children}</div>
    </Style>
  );
};

export default memo(ModalB);
