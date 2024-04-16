"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOne = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const dynamodb = new client_dynamodb_1.DynamoDB({});
async function getOne({ id }) {
    // Get the post from DynamoDB
    const result = await dynamodb.send(new lib_dynamodb_1.GetCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
            pk: `POST#${id}`,
        },
    }));
    // If the post is not found, return a 404
    if (!result.Item) {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'Post not found' }),
        };
    }
    // Otherwise, return the post
    return {
        statusCode: 200,
        body: JSON.stringify(result.Item),
    };
}
exports.getOne = getOne;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LW9uZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldC1vbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsOERBQW9EO0FBQ3BELHdEQUFtRDtBQUVuRCxNQUFNLFFBQVEsR0FBRyxJQUFJLDBCQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFM0IsS0FBSyxVQUFVLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBa0I7SUFDakQsNkJBQTZCO0lBQzdCLE1BQU0sTUFBTSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FDaEMsSUFBSSx5QkFBVSxDQUFDO1FBQ2IsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVTtRQUNqQyxHQUFHLEVBQUU7WUFDSCxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUU7U0FDakI7S0FDRixDQUFDLENBQ0gsQ0FBQztJQUVGLHlDQUF5QztJQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pCLE9BQU87WUFDTCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLENBQUM7U0FDcEQsQ0FBQztJQUNKLENBQUM7SUFFRCw2QkFBNkI7SUFDN0IsT0FBTztRQUNMLFVBQVUsRUFBRSxHQUFHO1FBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNsQyxDQUFDO0FBQ0osQ0FBQztBQXhCRCx3QkF3QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEeW5hbW9EQiB9IGZyb20gJ0Bhd3Mtc2RrL2NsaWVudC1keW5hbW9kYic7XHJcbmltcG9ydCB7IEdldENvbW1hbmQgfSBmcm9tICdAYXdzLXNkay9saWItZHluYW1vZGInO1xyXG5cclxuY29uc3QgZHluYW1vZGIgPSBuZXcgRHluYW1vREIoe30pO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldE9uZSh7IGlkIH06IHsgaWQ6IHN0cmluZyB9KSB7XHJcbiAgLy8gR2V0IHRoZSBwb3N0IGZyb20gRHluYW1vREJcclxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBkeW5hbW9kYi5zZW5kKFxyXG4gICAgbmV3IEdldENvbW1hbmQoe1xyXG4gICAgICBUYWJsZU5hbWU6IHByb2Nlc3MuZW52LlRBQkxFX05BTUUsXHJcbiAgICAgIEtleToge1xyXG4gICAgICAgIHBrOiBgUE9TVCMke2lkfWAsXHJcbiAgICAgIH0sXHJcbiAgICB9KVxyXG4gICk7XHJcblxyXG4gIC8vIElmIHRoZSBwb3N0IGlzIG5vdCBmb3VuZCwgcmV0dXJuIGEgNDA0XHJcbiAgaWYgKCFyZXN1bHQuSXRlbSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3RhdHVzQ29kZTogNDA0LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2U6ICdQb3N0IG5vdCBmb3VuZCcgfSksXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLy8gT3RoZXJ3aXNlLCByZXR1cm4gdGhlIHBvc3RcclxuICByZXR1cm4ge1xyXG4gICAgc3RhdHVzQ29kZTogMjAwLFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVzdWx0Lkl0ZW0pLFxyXG4gIH07XHJcbn0iXX0=