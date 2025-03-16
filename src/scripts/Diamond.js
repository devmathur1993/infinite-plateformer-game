import * as PIXI from "pixi.js";
import { Globals } from "./Globals";
export class Diamond {
	constructor(x, y) {
		this.sprite = new PIXI.Sprite(Globals.resources["diamond"]);
		this.sprite.position.x = x;
		this.sprite.position.y = y;
	}

	checkCollision(hero) {
		/**if diamond is already collected */
		if (!this.sprite) {
			return;
		}

		if (this.isOverlap(hero)) {
			hero.collectDiamond();
			this.sprite.destroy();
			this.sprite = null;
		}
	}

	isOverlap(hero) {
		return (
			hero.bottom >= this.top &&
			hero.top <= this.bottom &&
			hero.right >= this.left &&
			hero.left <= this.right
		);
	}

	get top() {
		return this.sprite.y + this.sprite.parent.y;
	}
	get bottom() {
		return this.top + this.sprite.height;
	}
	get left() {
		/**diamod is child of platfrom container and hero is a child of main scene container so we need to add to find the exact x */
		return this.sprite.x + this.sprite.parent.x;
	}
	get right() {
		return this.left + this.sprite.width;
	}
}
