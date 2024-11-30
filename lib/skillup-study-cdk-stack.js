"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillupCdkStack = void 0;
const cdk = require("aws-cdk-lib");
// Import the Lambda module
const lambda = require("aws-cdk-lib/aws-lambda");
const aws_lambda_python_alpha_1 = require("@aws-cdk/aws-lambda-python-alpha");
// Inport DynamoDB module
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
class skillupCdkStack extends cdk.Stack {
    constructor(scope, id, props) {
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
        const hellopythonfunction = new aws_lambda_python_alpha_1.PythonFunction(this, "hello-python-function", {
            functionName: 'hello-python-function',
            runtime: cdk.aws_lambda.Runtime.PYTHON_3_11,
            entry: "src/lambda/hello",
            handler: "handler", //Specify index.py and handler function
        });
        // 追記 Python-runtime-lambda GetDynamoDBItemsの定義
        const GetDynamoDBItems = new aws_lambda_python_alpha_1.PythonFunction(this, "GetDynamoDBItems", {
            functionName: "GetDynamoDBItems",
            runtime: cdk.aws_lambda.Runtime.PYTHON_3_11,
            entry: "src/lambda/GetDynamoDBItems",
            handler: "handler", //Specify index.py and handler function
        });
        //　追記 DynamoDBの定義
        const targetTable = new aws_dynamodb_1.Table(this, 'Sample-table', {
            tableName: "sample-table", // テーブル名の定義
            partitionKey: {
                name: 'id',
                type: aws_dynamodb_1.AttributeType.STRING,
            },
            sortKey: {
                name: 'name',
                type: aws_dynamodb_1.AttributeType.STRING,
            },
            billingMode: aws_dynamodb_1.BillingMode.PAY_PER_REQUEST,
            pointInTimeRecovery: true,
            timeToLiveAttribute: 'expired',
            removalPolicy: cdk.RemovalPolicy.DESTROY
        });
        // dynamodb読み取り権限をLambdaに付与
        targetTable.grantReadData(GetDynamoDBItems);
    }
}
exports.skillupCdkStack = skillupCdkStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpbGx1cC1zdHVkeS1jZGstc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJza2lsbHVwLXN0dWR5LWNkay1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFFbkMsMkJBQTJCO0FBQzNCLGlEQUFpRDtBQUNqRCw4RUFBa0U7QUFDbEUseUJBQXlCO0FBQ3pCLDJEQUE2RTtBQUU3RSxNQUFhLGVBQWdCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDNUMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2QixzQ0FBc0M7UUFDdEMsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFO1lBQzFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0I7WUFDeEQsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLHdDQUF3QztZQUM3RSxPQUFPLEVBQUUsU0FBUyxFQUFFLHVDQUF1QztZQUMzRCxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsRUFBRSxvQ0FBb0M7U0FDNUYsQ0FBQyxDQUFDO1FBRUgsMENBQTBDO1FBQzFDLE1BQU0scUJBQXFCLEdBQUcsa0JBQWtCLENBQUMsY0FBYyxDQUFDO1lBQzlELFFBQVEsRUFBRSxNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSTtTQUMxQyxDQUFDLENBQUM7UUFFSCw4Q0FBOEM7UUFDOUMsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSw2QkFBNkIsRUFBRTtZQUNyRCxLQUFLLEVBQUUscUJBQXFCLENBQUMsR0FBRztTQUNqQyxDQUFDLENBQUM7UUFDSCxtREFBbUQ7UUFDbkQsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLHdDQUFjLENBQUMsSUFBSSxFQUFFLHVCQUF1QixFQUFDO1lBQzNFLFlBQVksRUFBRSx1QkFBdUI7WUFDckMsT0FBTyxFQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDMUMsS0FBSyxFQUFDLGtCQUFrQjtZQUN4QixPQUFPLEVBQUMsU0FBUyxFQUFDLHVDQUF1QztTQUMxRCxDQUFDLENBQUM7UUFFSCwrQ0FBK0M7UUFDL0MsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLHdDQUFjLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFDO1lBQ25FLFlBQVksRUFBQyxrQkFBa0I7WUFDL0IsT0FBTyxFQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDMUMsS0FBSyxFQUFDLDZCQUE2QjtZQUNuQyxPQUFPLEVBQUMsU0FBUyxFQUFDLHVDQUF1QztTQUMxRCxDQUFDLENBQUM7UUFDSCxpQkFBaUI7UUFDakIsTUFBTSxXQUFXLEdBQUcsSUFBSSxvQkFBSyxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDbEQsU0FBUyxFQUFFLGNBQWMsRUFBRSxXQUFXO1lBQ3RDLFlBQVksRUFBRTtnQkFDWixJQUFJLEVBQUUsSUFBSTtnQkFDVixJQUFJLEVBQUUsNEJBQWEsQ0FBQyxNQUFNO2FBQzNCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxNQUFNO2dCQUNaLElBQUksRUFBRSw0QkFBYSxDQUFDLE1BQU07YUFDM0I7WUFDRCxXQUFXLEVBQUUsMEJBQVcsQ0FBQyxlQUFlO1lBQ3hDLG1CQUFtQixFQUFFLElBQUk7WUFDekIsbUJBQW1CLEVBQUUsU0FBUztZQUM5QixhQUFhLEVBQUUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPO1NBQ3pDLENBQUMsQ0FBQztRQUVILDJCQUEyQjtRQUMzQixXQUFXLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFJOUMsQ0FBQztDQUNGO0FBMURELDBDQTBEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbi8vIEltcG9ydCB0aGUgTGFtYmRhIG1vZHVsZVxuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnO1xuaW1wb3J0IHsgUHl0aG9uRnVuY3Rpb24gfSBmcm9tICdAYXdzLWNkay9hd3MtbGFtYmRhLXB5dGhvbi1hbHBoYSc7XG4vLyBJbnBvcnQgRHluYW1vREIgbW9kdWxlXG5pbXBvcnQgeyBBdHRyaWJ1dGVUeXBlLCBCaWxsaW5nTW9kZSwgVGFibGUgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWR5bmFtb2RiXCI7XG5cbmV4cG9ydCBjbGFzcyBza2lsbHVwQ2RrU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG4gICAgIC8vIERlZmluZSB0aGUgTGFtYmRhIGZ1bmN0aW9uIHJlc291cmNlXG4gICAgIGNvbnN0IGhlbGxvV29ybGRGdW5jdGlvbiA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgXCJIZWxsb1dvcmxkRnVuY3Rpb25cIiwge1xuICAgICAgZnVuY3Rpb25OYW1lOiBcIkhlbGxvV29ybGRGdW5jdGlvblwiLCAvLyBTZXQgZnVuY3Rpb24gbmFtZVxuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzIwX1gsIC8vIFByb3ZpZGUgYW55IHN1cHBvcnRlZCBOb2RlLmpzIHJ1bnRpbWVcbiAgICAgIGhhbmRsZXI6IFwiaGFuZGxlclwiLCAvL1NwZWNpZnkgaW5kZXgucHkgYW5kIGhhbmRsZXIgZnVuY3Rpb25cbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldChcInNyYy9sYW1iZGEvaGVsbG8td29ybGRcIiksIC8vIFNwZWNpZnkgdGhlIHNvdXJjZSBjb2RlIGRpcmVjdG9yeVxuICAgIH0pO1xuXG4gICAgLy8gQWRkIEZ1bmN0aW9uIFVSTCB0byB0aGUgTGFtYmRhIGZ1bmN0aW9uXG4gICAgY29uc3QgaGVsbG9Xb3JsZEZ1bmN0aW9uVXJsID0gaGVsbG9Xb3JsZEZ1bmN0aW9uLmFkZEZ1bmN0aW9uVXJsKHtcbiAgICAgIGF1dGhUeXBlOiBsYW1iZGEuRnVuY3Rpb25VcmxBdXRoVHlwZS5OT05FLFxuICAgIH0pO1xuXG4gICAgLy8gRGVmaW5lIGEgQ2xvdWRGb3JtYXRpb24gb3V0cHV0IGZvciB5b3VyIFVSTFxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsIFwiSGVsbG9Xb3JsZEZ1bmN0aW9uVXJsT3V0cHV0XCIsIHtcbiAgICAgIHZhbHVlOiBoZWxsb1dvcmxkRnVuY3Rpb25VcmwudXJsLFxuICAgIH0pO1xuICAgIC8vIOi/veiomCBQeXRob24tcnVudGltZS1sYW1iZGEgaGVsbG8tcHl0aG9uLWZ1bnRpb27jga7lrprnvqlcbiAgICBjb25zdCBoZWxsb3B5dGhvbmZ1bmN0aW9uID0gbmV3IFB5dGhvbkZ1bmN0aW9uKHRoaXMsIFwiaGVsbG8tcHl0aG9uLWZ1bmN0aW9uXCIse1xuICAgICAgZnVuY3Rpb25OYW1lOiAnaGVsbG8tcHl0aG9uLWZ1bmN0aW9uJyxcbiAgICAgIHJ1bnRpbWU6Y2RrLmF3c19sYW1iZGEuUnVudGltZS5QWVRIT05fM18xMSxcbiAgICAgIGVudHJ5Olwic3JjL2xhbWJkYS9oZWxsb1wiLFxuICAgICAgaGFuZGxlcjpcImhhbmRsZXJcIiwvL1NwZWNpZnkgaW5kZXgucHkgYW5kIGhhbmRsZXIgZnVuY3Rpb25cbiAgICB9KTtcblxuICAgIC8vIOi/veiomCBQeXRob24tcnVudGltZS1sYW1iZGEgR2V0RHluYW1vREJJdGVtc+OBruWumue+qVxuICAgIGNvbnN0IEdldER5bmFtb0RCSXRlbXMgPSBuZXcgUHl0aG9uRnVuY3Rpb24odGhpcywgXCJHZXREeW5hbW9EQkl0ZW1zXCIse1xuICAgICAgZnVuY3Rpb25OYW1lOlwiR2V0RHluYW1vREJJdGVtc1wiLFxuICAgICAgcnVudGltZTpjZGsuYXdzX2xhbWJkYS5SdW50aW1lLlBZVEhPTl8zXzExLFxuICAgICAgZW50cnk6XCJzcmMvbGFtYmRhL0dldER5bmFtb0RCSXRlbXNcIixcbiAgICAgIGhhbmRsZXI6XCJoYW5kbGVyXCIsLy9TcGVjaWZ5IGluZGV4LnB5IGFuZCBoYW5kbGVyIGZ1bmN0aW9uXG4gICAgfSk7XG4gICAgLy/jgIDov73oqJggRHluYW1vRELjga7lrprnvqlcbiAgICBjb25zdCB0YXJnZXRUYWJsZSA9IG5ldyBUYWJsZSh0aGlzLCAnU2FtcGxlLXRhYmxlJywgeyAvLyAnU2FtcGxlLXRhYmxlJ+OBr1N0YWNr5YaF44Gn5LiA5oSPXG4gICAgICB0YWJsZU5hbWU6IFwic2FtcGxlLXRhYmxlXCIsIC8vIOODhuODvOODluODq+WQjeOBruWumue+qVxuICAgICAgcGFydGl0aW9uS2V5OiB7XG4gICAgICAgIG5hbWU6ICdpZCcsXG4gICAgICAgIHR5cGU6IEF0dHJpYnV0ZVR5cGUuU1RSSU5HLFxuICAgICAgfSxcbiAgICAgIHNvcnRLZXk6IHtcbiAgICAgICAgbmFtZTogJ25hbWUnLFxuICAgICAgICB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklORyxcbiAgICAgIH0sXG4gICAgICBiaWxsaW5nTW9kZTogQmlsbGluZ01vZGUuUEFZX1BFUl9SRVFVRVNULFxuICAgICAgcG9pbnRJblRpbWVSZWNvdmVyeTogdHJ1ZSxcbiAgICAgIHRpbWVUb0xpdmVBdHRyaWJ1dGU6ICdleHBpcmVkJyxcbiAgICAgIHJlbW92YWxQb2xpY3k6IGNkay5SZW1vdmFsUG9saWN5LkRFU1RST1lcbiAgICB9KTtcblxuICAgIC8vIGR5bmFtb2Ri6Kqt44G/5Y+W44KK5qip6ZmQ44KSTGFtYmRh44Gr5LuY5LiOXG4gICAgdGFyZ2V0VGFibGUuZ3JhbnRSZWFkRGF0YShHZXREeW5hbW9EQkl0ZW1zKTtcblxuXG5cbiAgfVxufVxuIl19