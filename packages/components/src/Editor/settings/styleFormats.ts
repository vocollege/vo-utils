const styleFormats = () => [
  {
    title: "Layout",
    items: [
      {
        title: "Vänsterjustera",
        selector: "img,p,h2,h3,h4,table,ul,ol,li",
        classes: "left",
      },
      {
        title: "Högerjustera",
        selector: "img,p,h2,h3,h4,table,ul,ol,li",
        classes: "right",
      },
      {
        title: "Centrerad",
        selector: "img,p,h2,h3,h4,table,ul,ol,li",
        classes: "center",
      },
      {
        title: "Rutnät",
        selector: "p",
        classes: "grid",
      },
      // {
      //   title: "Rutnät",
      //   items: [
      //     {
      //       title: "2 kolumner",
      //       selector: "p",
      //       classes: "grid-2",
      //     },
      //     {
      //       title: "3 kolumner",
      //       selector: "p",
      //       classes: "grid-3",
      //     },
      //     {
      //       title: "4 kolumner",
      //       selector: "p",
      //       classes: "grid-4",
      //     },
      //     {
      //       title: "5 kolumner",
      //       selector: "p",
      //       classes: "grid-5",
      //     },
      //     {
      //       title: "6 kolumner",
      //       selector: "p",
      //       classes: "grid-6",
      //     },
      //   ],
      // },
    ],
  },
  {
    title: "Rubriker",
    items: [
      {
        title: "Rubrik 1",
        block: "h2",
        // classes: ["MuiTypography-h2"],
      },
      {
        title: "Rubrik 2",
        block: "h3",
        // classes: ["MuiTypography-h3"],
      },
      {
        title: "Rubrik 3",
        block: "h4",
        // classes: ["MuiTypography-h4"],
      },
    ],
  },
  {
    title: "Paragraf",
    items: [
      {
        title: "Paragraf",
        block: "p",
      },
      {
        title: "Ingress",
        block: "p",
        classes: "preamble",
        selector: "p",
      },
    ],
  },
  {
    title: "Tabell",
    items: [
      {
        title: "Hover",
        selector: "table",
        classes: "table-hover",
      },
      {
        title: "Zebra",
        selector: "table",
        classes: "table-zebra",
      },
    ],
  },
  {
    title: "Bild",
    items: [
      {
        title: "Fullbredd",
        selector: "img",
        attributes: { class: "fullwidth" },
      },
      {
        title: "Halv (392px)",
        selector: "img",
        attributes: { class: "half" },
      },
      {
        title: "Liten (196px)",
        selector: "img",
        attributes: { class: "small" },
      },
      {
        title: "Landskap halv (392px)",
        selector: "img",
        attributes: { class: "landscape-half" },
      },
      {
        title: "Landskap liten (196px)",
        selector: "img",
        attributes: { class: "landscape-small" },
      },
      {
        title: "Porträtt halv (392px)",
        selector: "img",
        attributes: { class: "portrait-half" },
      },
      {
        title: "Porträtt liten (196px)",
        selector: "img",
        attributes: { class: "portrait-small" },
      },
      {
        title: "Kvadrat halv (392px)",
        selector: "img",
        attributes: { class: "square-half" },
      },
      {
        title: "Kvadrat liten (196px)",
        selector: "img",
        attributes: { class: "square-small" },
      },

      { title: "Bildegenskaper" },

      {
        title: "Cirkel",
        selector: "img",
        classes: "circle",
      },
      {
        title: "Placering",
        items: [
          {
            title: "Centrerad",
            selector: "img",
            classes: "position-center",
          },
          {
            title: "Botten",
            selector: "img",
            classes: "position-bottom",
          },
          {
            title: "Höger",
            selector: "img",
            classes: "position-right",
          },
          {
            title: "Topp",
            selector: "img",
            classes: "position-top",
          },
          {
            title: "Vänster",
            selector: "img",
            classes: "position-left",
          },
        ],
      },
    ],
  },
];

export default styleFormats;
