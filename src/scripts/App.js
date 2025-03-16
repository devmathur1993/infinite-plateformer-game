import * as PIXI from "pixi.js";
import { Loader } from "./Loader";
import { MainScene } from "./MainScene";
import { Globals } from "./Globals";
import { SceneManager } from "./SceneManager";
export class App {
	async run() {
		// this.app = new PIXI.Application({ resizeTo: window });
		// document.body.appendChild(this.app.view);

		this.app = new PIXI.Application();
		await this.app.init({
			// width: window.innerWidth,
			// height: window.innerHeight,
			resizeTo: window,
		});

		document.body.appendChild(this.app.canvas);

		Globals.scene = new SceneManager();
		this.app.stage.addChild(Globals.scene.container);

		this.app.ticker.add((dt) => Globals.scene.update(dt));

		this.loader = new Loader(this.app.loader);
		this.loader
			.preload()
			.then(() =>
				Globals.scene.start(new MainScene())
			); /**as we passes the scene on update of main scene class */
	}
}
