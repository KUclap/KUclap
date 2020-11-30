import { h } from "preact"
import render from "preact-render-to-string"

import bundle from "../../../build/ssr-build/ssr-bundle"

import { InjectTemplateFactory } from '../helpers/injection.helper'
import { validatorClassId } from '../helpers/validate.helper'
import APIs from '../adapters/fetcher.adapter'

const App = bundle.default;


const ClassService = async (req, res) => {
    let { classID } = req.params;
    
    if (validatorClassId(classID)) {
        try {
            APIs.getClassDetailByClassId(classID, (resClass) => {
                const subject = resClass.data; 
                const body = render(h(App, { url: req.url, currentReview: null, currentClass: null }));
                const template = InjectTemplateFactory("CLASS",body, subject)
                res.setHeader("Content-Type", "text/html");
                res.end(template);    
            })
        } catch (error) {
            res.setHeader("Content-Type", "text/html");
            res.end(`ERROR: ${classID} is invalid classId.`);
        }
    } else {
        res.setHeader("Content-Type", "text/html");
        res.end(`ERROR: ${classID} is invalid classId.`);
    }
}

export default ClassService