import route from "preact-router";
import baseroute from "./baseroute";

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

export { getClassName, getColorHash, navigateToHome };
