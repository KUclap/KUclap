import  { h } from "preact"
import render from "preact-render-to-string"

import bundle from "../../../build/ssr-build/ssr-bundle"

const App = bundle;
import { InjectTemplateFactory } from '../helpers/injection.helper'

const HomeService = async (req, res) => {
    const body = render(h(App, { url: req.url, currentReview: null, currentClass: null }));
    const temaplate = InjectTemplateFactory("HOME", body)
    res.setHeader("Content-Type", "text/html");
    res.end(temaplate);   
}

export default HomeService