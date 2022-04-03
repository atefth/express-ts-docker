"use strict";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import awsServerlessExpress from "aws-serverless-express";
import { app } from "../src";

const server = awsServerlessExpress.createServer(app);

export const handle = (event: APIGatewayProxyEvent, context: Context) => {
  return awsServerlessExpress.proxy(server, event, context);
};