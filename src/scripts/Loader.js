import * as PIXI from "pixi.js";
import { Globals } from "./Globals";
import { LoaderConfig } from "./LoaderConfig";

export class Loader {
	constructor() {
		this.resources = LoaderConfig;
	}

	preload() {
		return new Promise(async (resolve, reject) => {
			try {
				// Initialize an object to store loaded resources
				// Globals.resources = {};

				const assetPromises = [];

				// Iterate through the resources and load each one
				for (let key in this.resources) {
					const assetPromise = PIXI.Assets.load(this.resources[key]).then(
						(texture) => {
							// Store each texture in Globals.resources by its key
							Globals.resources[key] = texture;
						}
					);
					assetPromises.push(assetPromise);
				}

				// Wait for all assets to be loaded
				await Promise.all(assetPromises);

				console.log("Resources loaded:", Globals.resources);

				resolve();
			} catch (error) {
				console.error("Error in loading assets", error);
				reject(error);
			}
		});
	}
}
