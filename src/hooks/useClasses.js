import { useState, useEffect } from "preact/hooks";
import APIs from "../components/utility/apis";

const useClasses = (initialState) => {
  const [classes, setClasses] = useState(initialState);

  useEffect(() => {
    APIs.getAllClasses((res) => {
      setClasses(res.data);
    });
  }, []);

  return [classes, setClasses];
};

export default useClasses;
