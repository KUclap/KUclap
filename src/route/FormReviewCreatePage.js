import { h } from "preact";
import { useContext, useEffect } from "preact/hooks";
import { withTheme } from "styled-components";

import { getClassName, getColorHash } from "../components/utility/helper";
import { SelectContext } from "../context/SelectContext";
import { SubjectTitle } from "../components/common/FetcherComponents";
import APIs from "../components/utility/apis";
import PageTemplate from "../components/common/PageTemplate";
import ReviewForm from "../components/common/ReviewForm";
import { FetcherProvider } from "../context/FetcherContext";

const FormReviewCreate = (props) => {
  const { classID } = props;
  const { state: selected, dispatch: dispatchSelected } = useContext(
    SelectContext
  );

  useEffect(() => {
    if (classID)
      APIs.getClassDetailByClassId(classID, (res) => {
        dispatchSelected({
          type: "selected",
          value: { label: res.data.label, classID: res.data.classId },
        });
      });
  }, []);

  return (
    <FetcherProvider>
      <PageTemplate
        content={{
          title: `เขียนรีวิววิชา : ${selected.label}`,
          description: `เขียนรีวิววิชา : ${selected.label}`,
          image: "https://www.kuclap.com/assets/img/meta-og-image.png",
        }}
        isFormPage={true}
        {...props}
      >
        <SubjectTitle color={getColorHash(classID)}>
          <span>{classID}</span>
          {getClassName(selected.label)}
        </SubjectTitle>
        <ReviewForm classID={selected.classID || classID} />
      </PageTemplate>
    </FetcherProvider>
  );
};

export default withTheme(FormReviewCreate);
