const buttonBase =
  "MuiButtonBase-root MuiButton-root MuiButton-sizeLarge VoButton";
const buttonBaseContained =
  "MuiButton-contained MuiButton-containedSecondary MuiButton-containedSizeLarge";

const buttonBaseOutlined =
  "MuiButton-outlined MuiButton-outlinedSecondary MuiButton-outlinedSizeLarge";

const linkClassList = () => [
  { title: "None", value: "" },
  {
    title: "Grön knapp",
    value: `${buttonBase} ${buttonBaseContained} VoButton-green`,
  },
  {
    title: "Blå knapp",
    value: `${buttonBase} ${buttonBaseContained} VoButton-blue`,
  },
  {
    title: "Grön knapp, kontur",
    value: `${buttonBase} ${buttonBaseOutlined} VoButton-green VoButton-outlined`,
  },
  {
    title: "Blå knapp, kontur",
    value: `${buttonBase} ${buttonBaseOutlined} VoButton-blue VoButton-outlined`,
  },
];

export default linkClassList;
