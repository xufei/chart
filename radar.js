import Chart from "./chart";

export default class RadarChart extends Chart {
	render() {
		super.scale();

		var pathArr = [];

		// 坐标刻度线
		this.yAxis.forEach((it, i) => {
			pathArr = [];

			let r = this.yAxis[i].number * this.stepLength / 2;
			this.yAxis[i].y = r;

			let total = this.series[0].data.length;
			this.series[0].data.forEach((v, j) => {
				let x = Math.round(Math.cos((j / total) * (2 * Math.PI)) * r) + this.radius;
				let y = Math.round(Math.sin((j / total) * (2 * Math.PI)) * r) + this.radius;

				pathArr.push(x + " " + y + " ");
			});

			pathArr[pathArr.length] = pathArr[0];
			it.path = "M" + pathArr.join("L ");
		});

		// 射线
		var center = (this.radius) + " " + (this.radius);
		var numArr = [];
		var markerPathArr = [];

		var total = this.series[0].data.length;
		for (let i = 0; i < total; i++) {
			this.xAxis[i] = {
				path:"M" + center + " L" + pathArr[i]
			};

			let r = this.series[0].data[i] * this.stepLength / 2;

			let x = Math.round(Math.cos((i / total) * (2 * Math.PI)) * r) + this.radius;
			let y = Math.round(Math.sin((i / total) * (2 * Math.PI)) * r) + this.radius;

			numArr.push(x + " " + y + " ");

			let markerArr = [];
			let markerCorner = 20;
			for (let j=0; j<markerCorner; j++) {
				let m = x + 5 * Math.cos((j / markerCorner) * (2 * Math.PI));
				let n = y + 5 * Math.sin((j / markerCorner) * (2 * Math.PI));

				markerArr.push(m + " " + n + " ");
			}

			markerPathArr.push("M" + markerArr.join("L "));
		}
		numArr[numArr.length] = numArr[0];

		this.dataPath = "M" + numArr.join("L ");
		this.markerPathArr = markerPathArr;
	}
}