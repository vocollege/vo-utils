const formats = () => ({
  alignleft: {
    selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img",
    classes: "alignleft",
  },
  aligncenter: {
    selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img",
    classes: "aligncenter",
  },
  alignright: {
    selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img",
    classes: "alignright",
  },
  alignfull: {
    selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img",
    classes: "alignfull",
  },
  bold: { inline: "strong", classes: "bold" },
  italic: { inline: "i", classes: "italic" },
  underline: { inline: "u", classes: "underline", exact: true },
  strikethrough: { inline: "del", classes: "del" },
  // customformat: {
  //   inline: "span",
  //   styles: { color: "#00ff00", fontSize: "20px" },
  //   attributes: { title: "My custom format" },
  //   classes: "example1",
  // },
});

export default formats;
