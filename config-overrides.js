module.exports = function override(config, env) {
   // console.log("React app rewired works!");
   // config.resolve.fallback = {
   //    fs: false,
   // };

   addDevServerEntrypoints({
      entryPoints: ["face-api.js"],
   }),
      watchAll(),
      (config) => {
         config.devtool = "eval-source-map";
         return config;
      };
   // return config;
};
const path = require("path");

module.exports = {
   entry: "./src/index.js",
   output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
   },
   devtool: "eval-source-map", // Add this line
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: "babel-loader",
            },
         },
         {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
         },
         {
            test: /\.(jpg|jpeg|png|gif)$/,
            use: ["file-loader"],
         },
      ],
   },
};
