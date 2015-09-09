import Chart from "./chart";

export default class RadarChart extends Chart {
	render() {
		super.scale();

		let that = this;
		// 坐标刻度线
		this.yAxis.forEach((it, i) => {
			let pathArr = [];

			let r = this.yAxis[i].number * this.stepLength / 2;
			this.yAxis[i].y = r;

			let total = that.series[0].data.length;
			that.series[0].data.forEach((v, j) => {
				let x = that.offsetLeft + Math.round(Math.cos((j / total) * (2 * Math.PI)) * r) + that.width / 2;
				let y = that.offsetTop + Math.round(Math.sin((j / total) * (2 * Math.PI)) * r) + that.height / 2;

				pathArr.push(x + " " + y + " ");
			});

			pathArr[pathArr.length] = pathArr[0];
			it.path = "M" + pathArr.join("L ");
		});
/*
		for (let i = 0; i < this.yAxis.length; i++) {
			let pathArr = [];
			let r;

			if (this.oom > 2) {
				r = Math.log(this.yAxis[i].number) * Math.LOG10E * this.stepLength / 2;
			}
			else {
				r = this.yAxis[i].number * this.stepLength / 2;
			}

			this.yAxis[i].y = r;

			let total = this.numbers.length;

			for (let j = 0; j < this.numbers.length; j++) {
				let x = this.offsetLeft + Math.round(Math.cos((j / total) * (2 * Math.PI)) * r) + this.width / 2;
				let y = this.offsetTop + Math.round(Math.sin((j / total) * (2 * Math.PI)) * r) + this.height / 2;

				pathArr.push(x + " " + y + " ");
			}

			pathArr[pathArr.length] = pathArr[0];
			this.yAxis[i].path = "M" + pathArr.join("L ");
		}
*/
		// 射线
		let center = (this.offsetLeft + this.width / 2) + " " + (this.offsetTop + this.height / 2);
		let numArr = [];
		let markerPathArr = [];

		let total = this.numbers.length;
		for (let i = 0; i < this.numbers.length; i++) {
			let outer = this.yAxis[this.yAxis.length - 1];
			this.xAxis[i] = {
				path:"M" + center + " L" + pathArr[i]
			};

			let r;

			if (this.oom > 2) {
				r = Math.log(this.numbers[i]) * Math.LOG10E * this.stepLength / 2;
			}
			else {
				r = this.numbers[i] * this.stepLength / 2;
			}

			console.log(Math.round(Math.cos((i / total) * (2 * Math.PI)) * r));
			console.log(Math.round(Math.sin((i / total) * (2 * Math.PI)) * r));

			let x = this.offsetLeft + Math.round(Math.cos((i / total) * (2 * Math.PI)) * r) + this.width / 2;
			let y = this.offsetTop + Math.round(Math.sin((i / total) * (2 * Math.PI)) * r) + this.height / 2;

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