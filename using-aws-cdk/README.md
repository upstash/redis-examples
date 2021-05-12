# using-aws-cdk

This project contains source code and supporting files for a serverless application that you can deploy with the AWS Cloud Develoment Kit. It includes the following files and folders.

- hello-world - Code for the application's Lambda function.
- events - Invocation events that you can use to invoke the function.
- hello-world/tests - Unit tests for the application code.
- bin - Infrastructure as Code for this application

The application uses several AWS resources, including Lambda functions and an API Gateway API. These resources are defined in the `template.yaml` file in this project. You can update the template to add AWS resources through the same deployment process that updates your application code.

## Deploy the sample application

The application is the same Hello World application created by SAM witth some adjustments to play a little more with the endpoint

You need the following tools.

* AWS CDK - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* Node.js - [Install Node.js +12](https://nodejs.org/en/), including the NPM package management tool.

First, you'll need to enter the `hello-world` folder and install all dependencies in your machine.

```bash
cd hello-world
npm install # you could just use npm i as well
```

After is done, we will move to the `bin` folder, where lives our TypeScript code and also install the dependencies:

```bash
cd ../bin
npm i
```

Once is done, you can build and deploy your application for the first time, run the following in your shell (remember it must be inside the `bin` folder):

```bash
cdk deploy
```

With this our application will start provisioning your infrastructure and deploy your code.

```
Do you wish to deploy these changes (y/n)? y
```

You will need to approve the chances, once is done, at the end you'll get the url for your API:

```
Outputs:
upstashApi.Endpoint = https://<some-random-id>.execute-api.us-east-1.amazonaws.com
```

Which you'll could access in your browser on the specific path defined `hello`:

```
https://<some-random-id>.execute-api.us-east-1.amazonaws.com/hello
```

```json
{
  "message": "Hello World!"
}
```

And you could play with a parameter on the URL to get new responses:

```
https://<some-random-id>.execute-api.us-east-1.amazonaws.com/hello?greet=Greg
```

## Cleanup

To delete the sample application that you created, use following:

```bash
cdk destroy
```
