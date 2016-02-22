import Chart from "./chart";

export default class BarChart extends Chart {
	render() {
		super.render();

		this.series[0].data.forEach((e, i) => {
			let x = i * 50;

			this.xAxis.push({
				number: e,
				x: i * 50,
				height: e * this.stepLength
			});
			this.xAxis[i].path = "M" + x + ",0 L" + x + ", 10";
		});
    }
}