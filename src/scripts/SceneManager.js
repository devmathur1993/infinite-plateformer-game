import * as PIXI from "pixi.js";

export class SceneManager {
	constructor() {
		/** we will place scenes here */
		this.container = new PIXI.Container();
		this.scene = null;
	}

	start(scene) {
		/**clear scene if exist */
		if (this.scene) {
			this.scene.container.destroy();
		}
		this.scene = scene;

		/** we will assign the scene to scene manager container but not to app stage */
		this.container.addChild(this.scene.container);

		// this.app.ticker.add((dt) => {
		// 	this.scene.update(dt);
		// });
	}

	update(dt) {
		if (this.scene && this.scene.update) {
			this.scene.update(dt);
		}
	}
}
