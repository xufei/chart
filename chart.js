export default class Chart {
	constructor() {
		this.width = 500;
		this.height = 400;
		this.radius = 150;

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
		var max = Math.max.apply(null, this.series[0].data);
		var min = Math.min.apply(null, this.series[0].data);

		var step = Math.pow(10, Math.floor(Math.log(max - min) / Math.LN10));

		this.yAxis = Array.from(Array(Math.ceil(max / step) + 1), (e, i) => {
			return {number: step * i};
		});

		this.stepLength = this.height / this.yAxis[this.yAxis.length - 1].number;
	}

	logarithmicScale() {
		var max = Math.max.apply(null, this.series[0].data);
		var min = Math.min.apply(null, this.series[0].data);

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
		var range = max - min;
		this.oom = Math.floor(Math.log(range) / Math.LN10);

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

		var step = this.stepLength;

		// 横向的刻度线
		this.yAxis.forEach((e, i) => {
			let y = e.number * step;

			e.y = y;
			e.path = "M0," + y + " L500," + y;
		});
	}


	render() {
		this.scale();

		this.xAxisPath = "M0,0 L" + this.width + ",0";
	}
}


Chart.ScaleTypes = Object.freeze({
	Linear: 0,
	Logarithmic: 1
});
