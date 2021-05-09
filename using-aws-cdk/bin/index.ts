import * as cdk from "@aws-cdk/core";
import { HttpApiStack } from "./stack";

class ApiStack extends HttpApiStack {
  constructor(scope: cdk.App, id: string, props: cdk.StackProps) {
    super(scope, id, props);
  }
}

const app = new cdk.App();

new ApiStack(app, "upstashApi", {
  description: "Testing HTTP Api GET with Upstash",
});

app.synth();
