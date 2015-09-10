import Chart from "./chart";

export default class PieChart extends Chart {
	render() {
		super.render();

		this.piePath = [];

		let total = this.series[0].data.reduce((e, i) => { return e + i });

		let rx = this.radius;
		let ry = this.radius;

		let start = 0;
		let stop = 0;

		let that = this;

		this.series[0].data.forEach((e, i) => {
			stop = 2 * Math.PI * e / total;

			let e1x = rx * Math.cos(start);
			let e1y = rx * Math.sin(start);
			let e2x;
			let e2y;
			let e3x;
			let e3y;

			if (stop - start < Math.PI) {
				e2x = ry * Math.cos(stop);
				e2y = ry * Math.sin(stop);
				e3x = e2x;
				e3y = e2y;
			} else {
				e2x = ry * Math.cos(Math.PI);
				e2y = ry * Math.sin(Math.PI);
				e3x = ry * Math.cos(stop);
				e3y = ry * Math.sin(stop);
			}

			let path = "M 0, 0 " + e1x + "," + e1y +
				"A" + rx + "," + ry + " 1 0,1 " + e2x + "," + e2y +
				"A" + rx + "," + ry + " 1 0,1 " + e3x + "," + e3y + "z";

			that.piePath[i] = path;

			start = stop;
		});
	}
}