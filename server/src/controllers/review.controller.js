import  { h } from "preact"
import render from "preact-render-to-string"

import APIs from '../adapters/fetcher.adapter'
import bundle from "../../../build/ssr-build/ssr-bundle"

import { InjectTemplateFactory } from '../helpers/injection.helper'

const App = bundle;

const handleReviewNotFound = async (req, res) => {
    const body = render(
        h(App, {
            url: req.url,
            currentReview: null,
            currentClass: null,
        })
    );
    const template = InjectTemplateFactory("REVIEW", body, null, null)
    res.setHeader("Content-Type", "text/html");
    res.end(template);
}

const ReviewService = async (req, res) => {
    let { reviewID } = req.params;
    
    if (reviewID) {
            APIs.getReviewByReviewID(reviewID, async (resReview) => {
                if(resReview){
                    APIs.getClassDetailByClassId(resReview.data.classId, async (resClass) => {
                        if(resClass){
                            const review = resReview.data;
                            const subject = resClass.data;

                            const body = render(
                                h(App, {
                                    url: req.url,
                                    currentReview: review,
                                    currentClass: subject,
                                })
                            );
                            const template = InjectTemplateFactory("REVIEW", body, subject, review)
                            res.setHeader("Content-Type", "text/html");
                            res.end(template);
                        } else {
                            handleReviewNotFound(req, res)
                        }
                    })
                } else {
                    handleReviewNotFound(req, res)
                }
            })
    } else {
        res.setHeader("Content-Type", "text/html");
        res.end(`ERROR: ${reviewID} is invalid reviewId.`);
    }
  }

  export default ReviewService