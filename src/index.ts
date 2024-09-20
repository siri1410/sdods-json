import { onRequest } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2";
import * as logger from "firebase-functions/logger";
import {VertexAI} from "@google-cloud/vertexai";
import {defineSecret} from "firebase-functions/params";

setGlobalOptions({ maxInstances: 10 });

const PROJECT_ID = defineSecret("PROJECT_ID");
const LOCATION = defineSecret("LOCATION");
// Remove or comment out the duplicate import

const vertexai = new VertexAI({
    project: PROJECT_ID.value(),
    location: LOCATION.value(),
});

