import { h } from "preact";

import useClasses from "../hooks/useClasses";

const withClasses = (Component) => {
  return (props) => {
    const [classes] = useClasses([]);

    return <Component classes={classes} {...props} />;
  };
};

export default withClasses;
