import { h } from "preact";
import { useContext, useEffect } from "preact/hooks";
import { withTheme } from "styled-components";

import ReviewForm from "../components/async/ReviewForm";
import { SubjectTitle } from "../components/common/FetcherComponents";
import PageTemplate from "../components/common/PageTemplate";
import APIs from "../components/utility/apis";
import { getClassName, getColorHash } from "../components/utility/helper";
import { FetcherProvider } from "../context/FetcherContext";
import { SelectContext } from "../context/SelectContext";

const FormReviewCreate = (props) => {
	const { classID } = props;
	const { state: selected, dispatch: dispatchSelected } = useContext(SelectContext);

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
