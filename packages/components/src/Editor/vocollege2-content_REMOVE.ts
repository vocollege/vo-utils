const styles = `body {
  color: #646464;
  font-family: Lato, sans-serif;
  font-size: 16px;
  margin: 0 auto;
  max-width: 784px;
  position: relative;
}
body p *:last-child {
  margin-bottom: 0;
}
body .left {
  float: left;
  margin: 0 16px 16px 0;
}
body .right {
  float: right;
  margin: 0 0 16px 16px;
}
body img {
  border-radius: 16px;
  height: auto;
  max-width: 100%;
}
body img.fullwidth {
  width: 100%;
}
body img.half {
  max-width: 392px;
}
body img.small {
  max-width: 196px;
}
body img.square-half {
  height: 392px;
  object-fit: cover;
  width: 392px;
}
body img.square-small {
  height: 196px;
  object-fit: cover;
  width: 196px;
}
body p {
  font-size: 1rem;
}
body p.preamble {
  font-size: 1.25rem;
  lineHeight: 1.6;
}
body a,
body a:visited {
  color: #1E9141;
  font-weight: 600;
  text-decoration: none;
}
body a:hover,
body a:active {
  text-decoration: underline;
}
body h2,
body h3,
body h4 {
  color: #0078be;
  margin-bottom: 24px;
  margin-top: 0;
}
body h2 + p,
body h3 + p,
body h4 + p {
  marginTop: theme.spacing(3),
}
body * + h2,
body * + h3,
body * + h4 {
  margin-top: 40px;
}
body h2 {
  font-size: 3.75rem;
  font-weight: 600;
  letter-spacing: -0.00833em;
  line-height: 1.2;
}
body h3 {
  font-size: 3rem;
  font-weight: 600;
  letter-spacing: 0em;
  line-height: 1.167;
}
body h4 {
  font-size: 2.125rem;
  font-weight: 600;
  letter-spacing: 0.00735em;
  line-height: 1.235;
}
`;

export default styles;
