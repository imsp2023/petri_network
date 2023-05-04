export default {
	input: "src/petri.js",
	plugins: [],
	output: [
		{
			format: "umd",
			name: "petri",
			file: "build/petri.js",
			indent: "\t"
		},
		{
			format: "es",
			file: "build/petri.module.js",
			indent: "\t"
		}
	]
};
