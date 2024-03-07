import { generate } from "critical";

generate(
  {
    inline: true,
    base: "frontend/dist",
    src: "index.html",
    css: ["assets/index-9bcaea5f.css"], // Adjust the CSS file name as necessary
    target: {
      css: "critical.css", // This will be the output file for the extracted critical CSS
      html: "index-critical.html", // This will be the output file for the HTML with inlined critical CSS
      uncritical: "uncritical.css", // This will be the output file for the remaining CSS
    },
    dimensions: [
      { width: 320, height: 480 },
      { width: 768, height: 1024 },
      { width: 1280, height: 720 },
    ],
    extract: true, // Set to true to extract critical CSS
  },
  (err, output) => {
    if (err) {
      console.error("Critical failed:", err);
    } else {
      console.log("Critical succeeded");
    }
  }
);
