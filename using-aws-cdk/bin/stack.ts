import * as apigtw from "@aws-cdk/aws-apigatewayv2";
import * as cdk from "@aws-cdk/core";
import * as httpIntegrations from "@aws-cdk/aws-apigatewayv2-integrations";
import * as lambda from "@aws-cdk/aws-lambda";
import path from "path";

export interface HttpApiStackProps extends cdk.StackProps {
  id: string;
  handler: string;
}

export class HttpApiStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const apiFn = new lambda.Function(this, `apiFn`, {
      handler: `app.lambdaHandler`,
      runtime: lambda.Runtime.NODEJS_14_X,
      code: new lambda.AssetCode(path.resolve(__dirname, `../hello-world`)),
    });

    const api = new apigtw.HttpApi(this, "HttpApi");

    api.addRoutes({
      path: "/hello",
      integration: new httpIntegrations.LambdaProxyIntegration({
        handler: apiFn,
      }),
      methods: [apigtw.HttpMethod.GET],
    });

    new cdk.CfnOutput(this, "Endpoint: ", { value: api.apiEndpoint });
  }
}
