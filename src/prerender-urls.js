const { 
  defaultTitle,
  defaultMeta,
  defaultPreRenderingData
  } = require('./components/utility/helmet')

module.exports = async function () {
  const index = [
    {
      url: "/",
      title: defaultTitle,
      meta: defaultMeta,
      data: defaultPreRenderingData,
    },
    {
      url: "/class",
      isClassPage: true,
      title: defaultTitle,
      meta: defaultMeta,
      data: defaultPreRenderingData,
    },
    {
      url: "/review",
      isReviewPage: true,
      title: defaultTitle,
      meta: defaultMeta,
      data: defaultPreRenderingData,
    },
  ];

  return index;
};
