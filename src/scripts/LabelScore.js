import * as PIXI from "pixi.js";
export class LabelScore {
	constructor(x = 0, y = 0, anchor = 0) {
		this.view = new PIXI.Text();
		this.view.position.x = x;
		this.view.position.y = y;
		this.view.anchor.set(anchor);
		this.view.style = {
			fontFamily: "verdana",
			fontWeight: "bold",
			fontSize: 44,
			fill: "#FF7F50",
		};
		this.render();
	}
	render(score = 0) {
		this.view.text = `Score : ${score}`;
	}
}
