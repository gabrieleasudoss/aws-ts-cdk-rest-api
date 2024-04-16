"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsTsCdkRestApiStack = void 0;
const cdk = require("aws-cdk-lib");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
const aws_lambda_nodejs_1 = require("aws-cdk-lib/aws-lambda-nodejs");
// import * as sqs from 'aws-cdk-lib/aws-sqs';
class AwsTsCdkRestApiStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // 1. Create our DynamoDB table
        const dbTable = new aws_dynamodb_1.Table(this, 'DbTable', {
            partitionKey: { name: 'pk', type: aws_dynamodb_1.AttributeType.STRING },
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            billingMode: aws_dynamodb_1.BillingMode.PAY_PER_REQUEST,
        });
        // 2. Create our API Gateway
        const api = new aws_apigateway_1.RestApi(this, 'RestAPI', {
            restApiName: 'RestAPI',
            defaultCorsPreflightOptions: {
                allowOrigins: aws_apigateway_1.Cors.ALL_ORIGINS,
                allowMethods: aws_apigateway_1.Cors.ALL_METHODS,
            },
            apiKeySourceType: aws_apigateway_1.ApiKeySourceType.HEADER,
        });
        // 3. Create our API Key
        const apiKey = new aws_apigateway_1.ApiKey(this, 'ApiKey');
        // 4. Create a usage plan and add the API key to it
        const usagePlan = new aws_apigateway_1.UsagePlan(this, 'UsagePlan', {
            name: 'Usage Plan',
            apiStages: [
                {
                    api,
                    stage: api.deploymentStage,
                },
            ],
        });
        usagePlan.addApiKey(apiKey);
        // 5. Create our Lambda functions to handle requests
        const postsLambda = new aws_lambda_nodejs_1.NodejsFunction(this, 'PostsLambda', {
            entry: 'resources/endpoints/posts.ts',
            handler: 'handler',
            environment: {
                TABLE_NAME: dbTable.tableName,
            },
        });
        const postLambda = new aws_lambda_nodejs_1.NodejsFunction(this, 'PostLambda', {
            entry: 'resources/endpoints/post.ts',
            handler: 'handler',
            environment: {
                TABLE_NAME: dbTable.tableName,
            },
        });
        // 6. Grant our Lambda functions access to our DynamoDB table
        dbTable.grantReadWriteData(postsLambda);
        dbTable.grantReadWriteData(postLambda);
        // 7. Define our API Gateway endpoints
        const posts = api.root.addResource('posts');
        const post = posts.addResource('{id}');
        // 8. Connect our Lambda functions to our API Gateway endpoints
        const postsIntegration = new aws_apigateway_1.LambdaIntegration(postsLambda);
        const postIntegration = new aws_apigateway_1.LambdaIntegration(postLambda);
        // 9. Define our API Gateway methods
        posts.addMethod('GET', postsIntegration, {
            apiKeyRequired: true,
        });
        posts.addMethod('POST', postsIntegration, {
            apiKeyRequired: true,
        });
        post.addMethod('GET', postIntegration, {
            apiKeyRequired: true,
        });
        post.addMethod('DELETE', postIntegration, {
            apiKeyRequired: true,
        });
        // Misc: Outputs
        new cdk.CfnOutput(this, 'API Key ID', {
            value: apiKey.keyId,
        });
    }
}
exports.AwsTsCdkRestApiStack = AwsTsCdkRestApiStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLXRzLWNkay1yZXN0LWFwaS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF3cy10cy1jZGstcmVzdC1hcGktc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW1DO0FBQ25DLCtEQUFtSDtBQUNuSCwyREFBNkU7QUFDN0UscUVBQStEO0FBRS9ELDhDQUE4QztBQUU5QyxNQUFhLG9CQUFxQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ2pELFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDOUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsK0JBQStCO1FBQy9CLE1BQU0sT0FBTyxHQUFHLElBQUksb0JBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQ3pDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLDRCQUFhLENBQUMsTUFBTSxFQUFFO1lBQ3hELGFBQWEsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU87WUFDeEMsV0FBVyxFQUFFLDBCQUFXLENBQUMsZUFBZTtTQUN6QyxDQUFDLENBQUM7UUFFRiw0QkFBNEI7UUFDNUIsTUFBTSxHQUFHLEdBQUcsSUFBSSx3QkFBTyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDeEMsV0FBVyxFQUFFLFNBQVM7WUFDdEIsMkJBQTJCLEVBQUU7Z0JBQzNCLFlBQVksRUFBRSxxQkFBSSxDQUFDLFdBQVc7Z0JBQzlCLFlBQVksRUFBRSxxQkFBSSxDQUFDLFdBQVc7YUFDL0I7WUFDRCxnQkFBZ0IsRUFBRSxpQ0FBZ0IsQ0FBQyxNQUFNO1NBQzFDLENBQUMsQ0FBQztRQUVILHdCQUF3QjtRQUN4QixNQUFNLE1BQU0sR0FBRyxJQUFJLHVCQUFNLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTFDLG1EQUFtRDtRQUNuRCxNQUFNLFNBQVMsR0FBRyxJQUFJLDBCQUFTLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRTtZQUNqRCxJQUFJLEVBQUUsWUFBWTtZQUNsQixTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsR0FBRztvQkFDSCxLQUFLLEVBQUUsR0FBRyxDQUFDLGVBQWU7aUJBQzNCO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTVCLG9EQUFvRDtRQUNwRCxNQUFNLFdBQVcsR0FBRyxJQUFJLGtDQUFjLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRTtZQUMxRCxLQUFLLEVBQUUsOEJBQThCO1lBQ3JDLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLFdBQVcsRUFBRTtnQkFDWCxVQUFVLEVBQUUsT0FBTyxDQUFDLFNBQVM7YUFDOUI7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLFVBQVUsR0FBRyxJQUFJLGtDQUFjLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUN4RCxLQUFLLEVBQUUsNkJBQTZCO1lBQ3BDLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLFdBQVcsRUFBRTtnQkFDWCxVQUFVLEVBQUUsT0FBTyxDQUFDLFNBQVM7YUFDOUI7U0FDRixDQUFDLENBQUM7UUFFSCw2REFBNkQ7UUFDN0QsT0FBTyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV2QyxzQ0FBc0M7UUFDdEMsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV2QywrREFBK0Q7UUFDL0QsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLGtDQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVELE1BQU0sZUFBZSxHQUFHLElBQUksa0NBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFMUQsb0NBQW9DO1FBQ3BDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLGdCQUFnQixFQUFFO1lBQ3ZDLGNBQWMsRUFBRSxJQUFJO1NBQ3JCLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLGdCQUFnQixFQUFFO1lBQ3hDLGNBQWMsRUFBRSxJQUFJO1NBQ3JCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLGVBQWUsRUFBRTtZQUNyQyxjQUFjLEVBQUUsSUFBSTtTQUNyQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxlQUFlLEVBQUU7WUFDeEMsY0FBYyxFQUFFLElBQUk7U0FDckIsQ0FBQyxDQUFDO1FBRUgsZ0JBQWdCO1FBQ2hCLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQ3BDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztTQUNwQixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUF0RkQsb0RBc0ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IEFwaUtleSwgQXBpS2V5U291cmNlVHlwZSwgQ29ycywgTGFtYmRhSW50ZWdyYXRpb24sIFJlc3RBcGksIFVzYWdlUGxhbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5JztcbmltcG9ydCB7IEF0dHJpYnV0ZVR5cGUsIEJpbGxpbmdNb2RlLCBUYWJsZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1keW5hbW9kYic7XG5pbXBvcnQgeyBOb2RlanNGdW5jdGlvbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEtbm9kZWpzJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuLy8gaW1wb3J0ICogYXMgc3FzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zcXMnO1xuXG5leHBvcnQgY2xhc3MgQXdzVHNDZGtSZXN0QXBpU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAvLyAxLiBDcmVhdGUgb3VyIER5bmFtb0RCIHRhYmxlXG4gICAgY29uc3QgZGJUYWJsZSA9IG5ldyBUYWJsZSh0aGlzLCAnRGJUYWJsZScsIHtcbiAgICAgIHBhcnRpdGlvbktleTogeyBuYW1lOiAncGsnLCB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklORyB9LFxuICAgICAgcmVtb3ZhbFBvbGljeTogY2RrLlJlbW92YWxQb2xpY3kuREVTVFJPWSxcbiAgICAgIGJpbGxpbmdNb2RlOiBCaWxsaW5nTW9kZS5QQVlfUEVSX1JFUVVFU1QsXG4gICAgfSk7XG5cbiAgICAgLy8gMi4gQ3JlYXRlIG91ciBBUEkgR2F0ZXdheVxuICAgICBjb25zdCBhcGkgPSBuZXcgUmVzdEFwaSh0aGlzLCAnUmVzdEFQSScsIHtcbiAgICAgIHJlc3RBcGlOYW1lOiAnUmVzdEFQSScsXG4gICAgICBkZWZhdWx0Q29yc1ByZWZsaWdodE9wdGlvbnM6IHtcbiAgICAgICAgYWxsb3dPcmlnaW5zOiBDb3JzLkFMTF9PUklHSU5TLFxuICAgICAgICBhbGxvd01ldGhvZHM6IENvcnMuQUxMX01FVEhPRFMsXG4gICAgICB9LFxuICAgICAgYXBpS2V5U291cmNlVHlwZTogQXBpS2V5U291cmNlVHlwZS5IRUFERVIsXG4gICAgfSk7XG5cbiAgICAvLyAzLiBDcmVhdGUgb3VyIEFQSSBLZXlcbiAgICBjb25zdCBhcGlLZXkgPSBuZXcgQXBpS2V5KHRoaXMsICdBcGlLZXknKTtcblxuICAgIC8vIDQuIENyZWF0ZSBhIHVzYWdlIHBsYW4gYW5kIGFkZCB0aGUgQVBJIGtleSB0byBpdFxuICAgIGNvbnN0IHVzYWdlUGxhbiA9IG5ldyBVc2FnZVBsYW4odGhpcywgJ1VzYWdlUGxhbicsIHtcbiAgICAgIG5hbWU6ICdVc2FnZSBQbGFuJyxcbiAgICAgIGFwaVN0YWdlczogW1xuICAgICAgICB7XG4gICAgICAgICAgYXBpLFxuICAgICAgICAgIHN0YWdlOiBhcGkuZGVwbG95bWVudFN0YWdlLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIHVzYWdlUGxhbi5hZGRBcGlLZXkoYXBpS2V5KTtcblxuICAgIC8vIDUuIENyZWF0ZSBvdXIgTGFtYmRhIGZ1bmN0aW9ucyB0byBoYW5kbGUgcmVxdWVzdHNcbiAgICBjb25zdCBwb3N0c0xhbWJkYSA9IG5ldyBOb2RlanNGdW5jdGlvbih0aGlzLCAnUG9zdHNMYW1iZGEnLCB7XG4gICAgICBlbnRyeTogJ3Jlc291cmNlcy9lbmRwb2ludHMvcG9zdHMudHMnLFxuICAgICAgaGFuZGxlcjogJ2hhbmRsZXInLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgVEFCTEVfTkFNRTogZGJUYWJsZS50YWJsZU5hbWUsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgY29uc3QgcG9zdExhbWJkYSA9IG5ldyBOb2RlanNGdW5jdGlvbih0aGlzLCAnUG9zdExhbWJkYScsIHtcbiAgICAgIGVudHJ5OiAncmVzb3VyY2VzL2VuZHBvaW50cy9wb3N0LnRzJyxcbiAgICAgIGhhbmRsZXI6ICdoYW5kbGVyJyxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIFRBQkxFX05BTUU6IGRiVGFibGUudGFibGVOYW1lLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIC8vIDYuIEdyYW50IG91ciBMYW1iZGEgZnVuY3Rpb25zIGFjY2VzcyB0byBvdXIgRHluYW1vREIgdGFibGVcbiAgICBkYlRhYmxlLmdyYW50UmVhZFdyaXRlRGF0YShwb3N0c0xhbWJkYSk7XG4gICAgZGJUYWJsZS5ncmFudFJlYWRXcml0ZURhdGEocG9zdExhbWJkYSk7XG5cbiAgICAvLyA3LiBEZWZpbmUgb3VyIEFQSSBHYXRld2F5IGVuZHBvaW50c1xuICAgIGNvbnN0IHBvc3RzID0gYXBpLnJvb3QuYWRkUmVzb3VyY2UoJ3Bvc3RzJyk7XG4gICAgY29uc3QgcG9zdCA9IHBvc3RzLmFkZFJlc291cmNlKCd7aWR9Jyk7XG5cbiAgICAvLyA4LiBDb25uZWN0IG91ciBMYW1iZGEgZnVuY3Rpb25zIHRvIG91ciBBUEkgR2F0ZXdheSBlbmRwb2ludHNcbiAgICBjb25zdCBwb3N0c0ludGVncmF0aW9uID0gbmV3IExhbWJkYUludGVncmF0aW9uKHBvc3RzTGFtYmRhKTtcbiAgICBjb25zdCBwb3N0SW50ZWdyYXRpb24gPSBuZXcgTGFtYmRhSW50ZWdyYXRpb24ocG9zdExhbWJkYSk7XG5cbiAgICAvLyA5LiBEZWZpbmUgb3VyIEFQSSBHYXRld2F5IG1ldGhvZHNcbiAgICBwb3N0cy5hZGRNZXRob2QoJ0dFVCcsIHBvc3RzSW50ZWdyYXRpb24sIHtcbiAgICAgIGFwaUtleVJlcXVpcmVkOiB0cnVlLFxuICAgIH0pO1xuICAgIHBvc3RzLmFkZE1ldGhvZCgnUE9TVCcsIHBvc3RzSW50ZWdyYXRpb24sIHtcbiAgICAgIGFwaUtleVJlcXVpcmVkOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgcG9zdC5hZGRNZXRob2QoJ0dFVCcsIHBvc3RJbnRlZ3JhdGlvbiwge1xuICAgICAgYXBpS2V5UmVxdWlyZWQ6IHRydWUsXG4gICAgfSk7XG4gICAgcG9zdC5hZGRNZXRob2QoJ0RFTEVURScsIHBvc3RJbnRlZ3JhdGlvbiwge1xuICAgICAgYXBpS2V5UmVxdWlyZWQ6IHRydWUsXG4gICAgfSk7XG5cbiAgICAvLyBNaXNjOiBPdXRwdXRzXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ0FQSSBLZXkgSUQnLCB7XG4gICAgICB2YWx1ZTogYXBpS2V5LmtleUlkLFxuICAgIH0pO1xuICB9XG59XG4iXX0=