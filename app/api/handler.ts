"use strict";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import awsServerlessExpress from "aws-serverless-express";
import { apiVersion, endPoints, app } from "../src";

const server = awsServerlessExpress.createServer(app);

export const handler = (event: APIGatewayProxyEvent, context: Context) => {
  return awsServerlessExpress.proxy(server, event, context);
};