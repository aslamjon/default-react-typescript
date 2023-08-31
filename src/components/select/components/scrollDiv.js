import React, { useEffect, useRef } from "react";

const ScrollDiv = ({ children, ...rest }) => {
  const body = useRef(null);
  const [isScroll, setIsScroll] = React.useState(false);
  useEffect(() => {
    setIsScroll(body?.current?.scrollHeight > body?.current?.clientHeight);
  }, [body?.current?.scrollHeigh]);

  return (
    <div ref={body} {...rest} style={{ paddingRight: isScroll ? "4px" : "10px" }}>
      {children}
    </div>
  );
};

export default ScrollDiv;
