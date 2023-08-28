import React, { forwardRef, useRef } from "react";
import PropTypes from "prop-types";
import { Input, useMergeRefs } from "@chakra-ui/react";

// eslint-disable-next-line react/display-name
const FilePicker = forwardRef(({ children, ...properties }, reference_) => {
  const reference = useRef();
  const references = useMergeRefs(reference, reference_);
  const children_ = React.cloneElement(React.Children.only(children), {
    onClick: () => reference.current.click(),
  });

  return (
    <>
      <Input ref={references} {...properties} display="none" type="file" />
      {children_}
    </>
  );
});

FilePicker.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilePicker;
