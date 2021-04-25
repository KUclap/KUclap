import { blue, blue_90, blue_97, grey, grey_75, grey_88, grey_95 } from "../../components/common/Colors";

export default {
  name: "light",

  solid: "white",
  body: "white",
  mainText: grey,
  subText: grey_75,
  borderColor: grey_88,
  lightBackground: grey_95,
  lightBlueBackground: blue_97,
  tag: {
    fontColor: blue,
    background: blue_97,
    border: blue,
    hover: "white"
  },
  skeleton: ["#f3f3f3", "#ecebeb"],
  menuItem: {
    hover: "hsl(212, 71%, 95%)",
    active: blue_90,
  },
  subjectBrightness: 100,
  footerButtonText: "#121112",
}
