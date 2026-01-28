import { pdfjs } from "react-pdf";

// eslint-disable-next-line import/no-webpack-loader-syntax
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
