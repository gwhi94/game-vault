// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { registerElement } from 'nativescript-angular';

import { AppModule } from "./app/app.module";

registerElement('StarRating', () => require('nativescript-star-ratings').StarRating);

platformNativeScriptDynamic().bootstrapModule(AppModule);
