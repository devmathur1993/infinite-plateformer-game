import * as PIXI from "pixi.js";
import { Globals } from "./Globals";
import { Diamond } from "./Diamond";
const TILE_SIZE = 64;
export class Plateform {
	constructor(rows, cols, x) {
		this.diamonds = [];
		this.diamondOffsetMin = 100;
		this.diamondOffsetMax = 200;

		this.dx = -5;
		this.rows = rows;
		this.cols = cols;

		this.width = cols * TILE_SIZE;
		this.height = rows * TILE_SIZE;

		this.createContainer(x);
		this.createTiles(x);
		this.createDiamonds();
	}

	createDiamonds() {
		/**
		 * calculate y position of diamond in given range randomly
		 */
		const y =
			this.diamondOffsetMin +
			Math.round(
				Math.random() * (this.diamondOffsetMax - this.diamondOffsetMin)
			);
		for (let i = 0; i < this.cols; i++) {
			if (Math.random() < 0.4) {
				const diamond = new Diamond(TILE_SIZE * i, -y);
				this.container.addChild(diamond.sprite);
				this.diamonds.push(diamond);
			}
		}
	}

	get left() {
		return this.container.x;
	}

	get nextLeft() {
		return this.left + this.dx;
	}

	get right() {
		return this.left + this.width;
	}

	get top() {
		return this.container.y;
	}

	get bottom() {
		return this.top + this.height;
	}

	createContainer(x) {
		this.container = new PIXI.Container();
		this.container.position.x = x;
		this.container.position.y = window.innerHeight - this.rows * TILE_SIZE;
	}

	createTiles(x) {
		for (let row = 0; row < this.rows; row++) {
			for (let col = 0; col < this.cols; col++) {
				this.createTile(row, col);
			}
		}
	}

	createTile(row, col) {
		const texture = row === 0 ? "platform" : "tile";
		const tile = new PIXI.Sprite(Globals.resources[texture]);

		this.container.addChild(tile);
		tile.x = col * tile.width;
		tile.y = row * tile.height;
	}

	move() {
		this.container.x += this.dx;

		/**
		 * if right side of tile block goes to left i.e. out of screen then emit a hidden event
		 */
		if (this.right < 0) {
			this.container.emit("hidden");
		}
	}

	checkCollision(hero) {
		this.diamonds.forEach((diamond) => diamond.checkCollision(hero));

		/**if hero is colliding with the top edge of plateform then it should remain on the platform */
		if (this.isCollideTop(hero)) {
			hero.heroStayOnPlatform(this);
		} else {
			/**else hero should not have the platform and it we fallen down, check ig hero has the current platform */
			if (hero.plateform === this) {
				hero.plateform = null;
			}

			if (this.isCollideLeft(hero)) {
				hero.moveByPlateform(this);
			}
		}
	}

	isCollideTop(hero) {
		return (
			hero.right >= this.left &&
			hero.left <= this.right &&
			hero.bottom <= this.top &&
			hero.nextBottom >= this.top
		);
	}

	isCollideLeft(hero) {
		return (
			hero.bottom >= this.top &&
			hero.top <= this.bottom &&
			hero.right <= this.left &&
			hero.right >= this.nextLeft
		);
	}
}
