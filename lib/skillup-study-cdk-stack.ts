import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// Import the Lambda module
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { PythonFunction } from '@aws-cdk/aws-lambda-python-alpha';

export class skillupCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
     // Define the Lambda function resource
     const helloWorldFunction = new lambda.Function(this, "HelloWorldFunction", {
      functionName: "HelloWorldFunction", // Set function name
      runtime: lambda.Runtime.NODEJS_20_X, // Provide any supported Node.js runtime
      handler: "handler", //Specify index.py and handler function
      code: lambda.Code.fromAsset("src/lambda/hello-world"), // Specify the source code directory
    });

    // Add Function URL to the Lambda function
    const helloWorldFunctionUrl = helloWorldFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    // Define a CloudFormation output for your URL
    new cdk.CfnOutput(this, "HelloWorldFunctionUrlOutput", {
      value: helloWorldFunctionUrl.url,
    });
    // 追記 Python-runtime-lambda hello-python-funtionの定義
    new PythonFunction(this, "hello-python-function",{
      functionName: 'hello-python-function',
      runtime:cdk.aws_lambda.Runtime.PYTHON_3_11,
      entry:"src/lambda/hello",
      handler:"handler",//Specify index.py and handler function
    });

    // 追記 Python-runtime-lambda GetDynamoDBItemsの定義
    new PythonFunction(this, "GetDynamoDBItems",{
      functionName:"GetDynamoDBItems",
      runtime:cdk.aws_lambda.Runtime.PYTHON_3_11,
      entry:"src/lambda/GetDynamoDBItems",
      handler:"handler",//Specify index.py and handler function
    });

  }
}
