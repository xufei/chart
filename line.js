import Chart from "./chart";

export default class LineChart extends Chart {
	render() {
		super.render();
        
        var numArr = [];
        var markerPathArr = [];
        
		this.dataPath = "M" + numArr.join("L ");
		this.markerPathArr = markerPathArr;

		this.series[0].data.forEach((e, i) => {
			let x = i * 50;
			let y = e * this.stepLength;

			numArr.push(x + " " + y + " ");

			let markerArr = [];
			let markerCorner = 20;
			for (let j=0; j<markerCorner; j++) {
				let m = x + 5 * Math.cos((j / markerCorner) * (2 * Math.PI));
				let n = y + 5 * Math.sin((j / markerCorner) * (2 * Math.PI));

				markerArr.push(m + " " + n + " ");
			}

			markerPathArr.push("M" + markerArr.join("L "));
		});
        
		this.dataPath = "M" + numArr.join("L ");
		this.markerPathArr = markerPathArr;
    }
}