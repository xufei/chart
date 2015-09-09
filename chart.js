
export default class Chart {
	constructor() {
		this.offsetLeft = 50;
		this.offsetTop = 50;

		this.width = 500;
		this.height = 400;


		this.xAxis = [];
		this.yAxis = [];

		this.xAxisPath = "";
		this.yAxisPath = "";

		this.stepLength = 1;

		this.scaleType = Chart.ScaleTypes.Linear;
	}

	set data(arr) {
		this.series = arr;

		this.render();
	}

	linearScale() {
		let max = Math.max.apply(null, this.series[0].data);
		let min = Math.min.apply(null, this.series[0].data);

		let step = Math.pow(10, Math.floor(Math.log(max - min) / Math.LN10));

		this.yAxis = Array.from(Array(max - min), (v, k) => {
			number:step * k
		});

		this.stepLength = this.height / this.yAxis[this.yAxis.length - 1].number;
	}

	logarithmicScale() {
		let max = Math.max.apply(null, this.series[0].data);
		let min = Math.min.apply(null, this.series[0].data);

		if (max === min) {
			if (min === 0) {
				max = 1;
			} else if (min < 0) {
				max = 0;
			} else {
				min = 0;
			}
		}

		// 不管哪种坐标轴，都需要在最大最小值的基础上找等分点
		let range = max - min;
		this.oom = Math.floor(Math.log(range) / Math.LN10);
		let step = Math.pow(10, this.oom);

		min = Math.pow(10, Math.floor(Math.log(min) / Math.LN10));
		max = Math.pow(10, Math.ceil(Math.log(max) / Math.LN10));

		for (let i = min; i <= max; i *= 10) {
			this.yAxis.push({
				number: i
			});
		}

		this.stepLength = this.height / (Math.log(this.yAxis[this.yAxis.length - 1].number) * Math.LOG10E);
	}

	/**
	 * 坐标轴缩放
	 */
	scale() {
		this.linearScale();

		// 横向的刻度线
		for (let i = 0; i < this.yAxis.length; i++) {
			let y = this.yAxis[i].number * this.stepLength;

			this.yAxis[i].y = y;
			this.yAxis[i].path = "M0," + y + " L500," + y;
		}
	}


	render() {
		this.scale();

		var that = this;

		this.series[0].data.forEach((it, i) => {
			let height = it * this.stepLength;

			that.xAxis.push({
				number: it,
				x: i * 50,
				height: it * this.stepLength
			});
			this.xAxis[i].path = "M" + x + ",0 L" + x + ", 0";
		});

		this.xAxisPath = "M" + this.offsetLeft + ",0 L" + (this.offsetLeft + this.width) + ",0";
	}
}


Chart.ScaleTypes = Object.freeze({
	Linear: 0,
	Logarithmic: 1
});
