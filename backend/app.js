import express from "express";
export const app = express();
import bodyParser from "body-parser";
import cors from "cors";

// Enable cross-origin resource sharing
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());
