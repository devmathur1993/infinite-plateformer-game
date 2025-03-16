import * as PIXI from "pixi.js";
import { Globals } from "./Globals";
import { Background } from "./Background";
import { Plateforms } from "./Plateforms";
import { Hero } from "./Hero";
import { LabelScore } from "./LabelScore";
import { FinalScene } from "./FinalScene";

export class MainScene {
	constructor() {
		this.container = new PIXI.Container();
		this.container.label = "mainScene";
		this.createBackground();
		this.createPlateforms();
		this.createHero();
		this.createUI();
	}

	createUI() {
		this.labelScore = new LabelScore();
		this.container.addChild(this.labelScore.view);
		this.hero.sprite.on("score", () => {
			this.labelScore.render(this.hero.score);
		});
	}

	createBackground() {
		this.bg = new Background();

		this.container.addChild(this.bg.container);

		// this.background = new PIXI.Sprite(Globals.resources["background"]);
		// console.log(this.background);
		// // const backgroundTexture = Globals.resources["background"];
		// this.background.label = "background";
		// this.background.width = window.innerWidth;
		// this.background.height = window.innerHeight;
		// this.container.addChild(this.background);
	}

	update(dt) {
		this.bg.update(dt);
		this.plateforms.checkCollision(this.hero);
		this.plateforms.update(dt);
		this.hero.update(dt);
	}

	createPlateforms() {
		this.plateforms = new Plateforms();
		this.container.addChild(this.plateforms.container);
	}

	createHero() {
		this.hero = new Hero();
		this.container.addChild(this.hero.sprite);
		this.container.interactive = true;
		this.container.on("pointerdown", () => {
			this.hero.startJump();
		});

		this.hero.sprite.once("die", () => {
			Globals.scene.start(new FinalScene(this.hero.score));
		});
	}
}
