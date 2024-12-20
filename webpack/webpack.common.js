const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/index.ts",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},

	// next 2 are for auto builds on save
	devtool: "eval-source-map",
	// reloads html file as npm plugin 'webpack-dev-server' auto reloads js files
	devServer: {
		watchFiles: ["./src/template.html"],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/template.html",
		})
	],

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				// load css files
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				// images loaded in a html file e.g.
				// <img src="./imgPath">
				test: /\.html$/i,
				loader: "html-loader",
			},
			{
				// images sourced in js
				// need to import them into a variable e.g.
				// import img from "./imgPath"
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
};
