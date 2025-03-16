import * as PIXI from "pixi.js";
import { Plateform } from "./Platform";

export class Plateforms {
	constructor() {
		this.plateforms = [];
		this.container = new PIXI.Container();
		this.ranges = {
			rows: { min: 2, max: 3 },
			cols: { min: 3, max: 9 },
			offset: { min: 60, max: 150 },
		};
		this.createPlateform({ rows: 4, cols: 6, x: 200 });
	}

	createPlateform(data) {
		const platform = new Plateform(data.rows, data.cols, data.x);
		this.container.addChild(platform.container);
		this.plateforms.push(platform);

		this.currentPlateform = platform;

		/**
		 * listen the event and remove the platfrom from and plateforms array and destory it
		 */
		platform.container.once("hidden", () => {
			this.plateforms = this.plateforms.filter((item) => item !== platform);
			platform.container.destroy();
		});
	}

	update(dt) {
		if (this.currentPlateform.right < window.innerWidth) {
			this.createPlateform(this.randomData);
		}

		this.plateforms.forEach((platform) => {
			platform.move();
		});
	}

	generateRandoms(max, min) {
		return min + Math.round(Math.random() * (max - min));
	}

	/**
	 * here we check if hero is colliding with any platform
	 * @param {*} hero
	 */
	checkCollision(hero) {
		this.plateforms.forEach((platform) => {
			platform.checkCollision(hero);
		});
	}

	get randomData() {
		const rows = this.generateRandoms(
			this.ranges.rows.max,
			this.ranges.rows.min
		);
		const cols = this.generateRandoms(
			this.ranges.cols.max,
			this.ranges.cols.min
		);
		const offset = this.generateRandoms(
			this.ranges.offset.max,
			this.ranges.offset.min
		);

		return {
			x: this.currentPlateform.right + offset,
			rows: rows,
			cols: cols,
		};

		// let data = { rows: 0, cols: 0, x: 0 };

		// const offset =
		// 	this.ranges.offset.min +
		// 	Math.round(
		// 		Math.random() * (this.ranges.offset.max - this.ranges.offset.min)
		// 	);

		// data.x = this.currentPlateform.right + offset;
		// data.cols =
		// 	this.ranges.cols.min +
		// 	Math.round(Math.random() * (this.ranges.cols.max - this.ranges.cols.min));
		// data.rows =
		// 	this.ranges.rows.min +
		// 	Math.round(Math.random() * (this.ranges.rows.max - this.ranges.rows.min));

		// return data;
	}
}
