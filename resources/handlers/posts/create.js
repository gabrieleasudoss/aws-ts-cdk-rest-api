"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const crypto_1 = require("crypto");
const dynamodb = new client_dynamodb_1.DynamoDB({});
async function create(body) {
    const uuid = (0, crypto_1.randomUUID)();
    // If no body, return an error
    if (!body) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing body' }),
        };
    }
    // Parse the body
    const bodyParsed = JSON.parse(body);
    // Creat the post
    await dynamodb.send(new lib_dynamodb_1.PutCommand({
        TableName: process.env.TABLE_NAME,
        Item: {
            pk: `POST#${uuid}`,
            ...bodyParsed,
        },
    }));
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Post created' }),
    };
}
exports.create = create;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3JlYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhEQUFvRDtBQUNwRCx3REFBbUQ7QUFDbkQsbUNBQW9DO0FBR3BDLE1BQU0sUUFBUSxHQUFHLElBQUksMEJBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUUzQixLQUFLLFVBQVUsTUFBTSxDQUFDLElBQW1CO0lBQzlDLE1BQU0sSUFBSSxHQUFHLElBQUEsbUJBQVUsR0FBRSxDQUFDO0lBRTFCLDhCQUE4QjtJQUM5QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDVixPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsQ0FBQztTQUNsRCxDQUFDO0lBQ0osQ0FBQztJQUVELGlCQUFpQjtJQUNqQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBVSxDQUFDO0lBRTdDLGlCQUFpQjtJQUNqQixNQUFNLFFBQVEsQ0FBQyxJQUFJLENBQ2pCLElBQUkseUJBQVUsQ0FBQztRQUNiLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVU7UUFDakMsSUFBSSxFQUFFO1lBQ0osRUFBRSxFQUFFLFFBQVEsSUFBSSxFQUFFO1lBQ2xCLEdBQUcsVUFBVTtTQUNkO0tBQ0YsQ0FBQyxDQUNILENBQUM7SUFFRixPQUFPO1FBQ0wsVUFBVSxFQUFFLEdBQUc7UUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsQ0FBQztLQUNsRCxDQUFDO0FBQ0osQ0FBQztBQTdCRCx3QkE2QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEeW5hbW9EQiB9IGZyb20gJ0Bhd3Mtc2RrL2NsaWVudC1keW5hbW9kYic7XHJcbmltcG9ydCB7IFB1dENvbW1hbmQgfSBmcm9tICdAYXdzLXNkay9saWItZHluYW1vZGInO1xyXG5pbXBvcnQgeyByYW5kb21VVUlEIH0gZnJvbSAnY3J5cHRvJztcclxuaW1wb3J0IHsgSVBvc3QgfSBmcm9tICcuLi8uLi8uLi90eXBlcyc7XHJcblxyXG5jb25zdCBkeW5hbW9kYiA9IG5ldyBEeW5hbW9EQih7fSk7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlKGJvZHk6IHN0cmluZyB8IG51bGwpIHtcclxuICBjb25zdCB1dWlkID0gcmFuZG9tVVVJRCgpO1xyXG5cclxuICAvLyBJZiBubyBib2R5LCByZXR1cm4gYW4gZXJyb3JcclxuICBpZiAoIWJvZHkpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN0YXR1c0NvZGU6IDQwMCxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBtZXNzYWdlOiAnTWlzc2luZyBib2R5JyB9KSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvLyBQYXJzZSB0aGUgYm9keVxyXG4gIGNvbnN0IGJvZHlQYXJzZWQgPSBKU09OLnBhcnNlKGJvZHkpIGFzIElQb3N0O1xyXG5cclxuICAvLyBDcmVhdCB0aGUgcG9zdFxyXG4gIGF3YWl0IGR5bmFtb2RiLnNlbmQoXHJcbiAgICBuZXcgUHV0Q29tbWFuZCh7XHJcbiAgICAgIFRhYmxlTmFtZTogcHJvY2Vzcy5lbnYuVEFCTEVfTkFNRSxcclxuICAgICAgSXRlbToge1xyXG4gICAgICAgIHBrOiBgUE9TVCMke3V1aWR9YCxcclxuICAgICAgICAuLi5ib2R5UGFyc2VkLFxyXG4gICAgICB9LFxyXG4gICAgfSlcclxuICApO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc3RhdHVzQ29kZTogMjAwLFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBtZXNzYWdlOiAnUG9zdCBjcmVhdGVkJyB9KSxcclxuICB9O1xyXG59Il19