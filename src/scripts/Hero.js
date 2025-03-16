import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

export class Hero {
	constructor() {
		this.score = 0;
		this.dy = 0;
		this.jumpIndex = 0;
		this.plateform = null;

		this.sprite = new PIXI.AnimatedSprite([
			Globals.resources["walk1"],
			Globals.resources["walk2"],
		]);
		// this.sprite.x = window.innerWidth * 0.5;
		this.sprite.x = 100;
		this.sprite.y = 100;
		this.sprite.loop = true;
		this.sprite.animationSpeed = 0.1;
		this.sprite.play();
	}
	update(dt) {
		if (!this.plateform) {
			++this.dy;
			this.sprite.y += this.dy;
		}

		/**check if hero is died */
		if (this.sprite.y > window.innerHeight) {
			/**i.e. hero is below the bottom of the screen */
			this.sprite.emit("die");
		}
	}

	heroStayOnPlatform(plateform) {
		this.plateform = plateform;
		this.dy = 0;
		this.sprite.y = plateform.top - this.sprite.height;
	}

	moveByPlateform(plateform) {
		this.sprite.x = plateform.nextLeft - this.sprite.width;
	}

	stayOnPlatform(platform) {
		this.platform = platform;
		this.dy = 0;
		this.jumpIndex = 0;
		this.sprite.y = platform.top - this.sprite.height;
	}

	startJump() {
		/** jump oinly is hero is on plateform */
		if (this.plateform || this.jumpIndex === 1) {
			++this.jumpIndex;
			this.plateform = null;
			this.dy = -18;
		}
	}

	collectDiamond() {
		++this.score;
		this.sprite.emit("score");
	}

	get left() {
		return this.sprite.x;
	}
	get right() {
		return this.left + this.sprite.width;
	}
	get top() {
		return this.sprite.y;
	}
	get bottom() {
		return this.top + this.sprite.height;
	}

	get nextBottom() {
		/**next bottom that the hero will get in next frame
		 * dy is the fall down speed
		 */
		return this.bottom + this.dy;
	}
}
