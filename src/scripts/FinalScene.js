import * as PIXI from "pixi.js";
import { Background } from "./Background";
import { LabelScore } from "./LabelScore";
import { Globals } from "./Globals";
import { MainScene } from "./MainScene";

export class FinalScene {
	constructor(finalScore) {
		this.container = new PIXI.Container();
		this.createBackground();
		this.createPopup();
		this.createLabelScore(finalScore);
		this.createResumeText();
	}

	createBackground() {
		this.bg = new Background();

		this.container.addChild(this.bg.container);
	}

	createPopup() {
		this.popup = new PIXI.Graphics();
		const width = 600;
		const height = 400;
		this.popup.rect(
			window.innerWidth * 0.5 - width * 0.5,
			window.innerHeight * 0.5 - height * 0.5,
			width,
			height
		);
		this.popup.fill(0x000000, 0.5);

		this.container.addChild(this.popup);
	}

	createLabelScore(finalScore) {
		this.labelScore = new LabelScore(
			window.innerWidth * 0.5,
			window.innerHeight * 0.5,
			0.5
		);
		this.container.addChild(this.labelScore.view);
		this.labelScore.render(finalScore);
	}

	createResumeText() {
		const text = new PIXI.Text();
		text.position.set(window.innerWidth * 0.5, window.innerHeight * 0.5 + 100);
		text.anchor.set(0.5);
		text.style = {
			fontFamily: "verdana",
			fontWeight: "bold",
			fontSize: 44,
			fill: "#FFFFFF",
		};
		text.text = "Tap To Continue";
		text.interactive = true;
		text.cursor = "pointer";
		text.once("pointerdown", () => {
			Globals.scene.start(new MainScene());
		});
		this.popup.addChild(text);
	}
}
