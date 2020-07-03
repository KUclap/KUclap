import { route } from "preact-router";
import baseroute from "./baseroute";

const getDetailFromLabel = (label) => {
  const list = label.split(" ");
  const detailClass = list.slice(0, 2).concat(list.slice(2).join(" "));
  return {
    classID: detailClass[0],
    nameTH: detailClass[1],
    nameEN: detailClass[2]
      ? detailClass[2].replace("(", "").replace(")", "")
      : "",
  };
};

const getClassName = (label) => {
  const labelSplit = label.split(" ");
  let labelName = label;
  if (labelSplit.length > 1) labelSplit.shift();
  labelName = labelSplit.join(" ");
  return labelName;
};

const getColorHash = (inputString) => {
  let sum = 0;
  for (let i in inputString) {
    sum += inputString.charCodeAt(i);
  }
  let hex = "#";
  hex += `00${(~~(
    `0.${Math.sin(sum + 1)
      .toString()
      .substr(6)}` * 256
  )).toString(16)}`
    .substr(-2, 2)
    .toUpperCase();
  hex += `00${(~~(
    `0.${Math.sin(sum + 2)
      .toString()
      .substr(6)}` * 256
  )).toString(16)}`
    .substr(-2, 2)
    .toUpperCase();
  hex += `00${(~~(
    `0.${Math.sin(sum + 3)
      .toString()
      .substr(6)}` * 256
  )).toString(16)}`
    .substr(-2, 2)
    .toUpperCase();
  return hex;
};

const navigateToHome = () => {
  route(`${baseroute}/`, true);
};

export { getClassName, getColorHash, navigateToHome, getDetailFromLabel };
