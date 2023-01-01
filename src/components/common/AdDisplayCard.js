import { h } from "preact";
import { withTheme } from "styled-components";
import { useEffect } from "preact/hooks";


const AdDisplayCard = () => {
  useEffect(() => {
		(window.adsbygoogle = window.adsbygoogle || []).push({});
	}, []);

	return (
    <ins class="adsbygoogle"
      style="display:block; margin-top: -18px;"
      data-ad-client="ca-pub-5117800582657554"
      data-ad-slot="9259275909"
      data-ad-format="auto"
      data-full-width-responsive="true" />
	);
};

export default withTheme(AdDisplayCard);
