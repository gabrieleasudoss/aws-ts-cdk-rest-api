"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const dynamodb = new client_dynamodb_1.DynamoDB({});
async function getAll() {
    const result = await dynamodb.send(new lib_dynamodb_1.ScanCommand({
        TableName: process.env.TABLE_NAME,
    }));
    return {
        statusCode: 200,
        body: JSON.stringify(result.Items),
    };
}
exports.getAll = getAll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldC1hbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsOERBQW9EO0FBQ3BELHdEQUFvRDtBQUVwRCxNQUFNLFFBQVEsR0FBRyxJQUFJLDBCQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFM0IsS0FBSyxVQUFVLE1BQU07SUFDMUIsTUFBTSxNQUFNLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxDQUNoQyxJQUFJLDBCQUFXLENBQUM7UUFDZCxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVO0tBQ2xDLENBQUMsQ0FDSCxDQUFDO0lBRUYsT0FBTztRQUNMLFVBQVUsRUFBRSxHQUFHO1FBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNuQyxDQUFDO0FBQ0osQ0FBQztBQVhELHdCQVdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRHluYW1vREIgfSBmcm9tICdAYXdzLXNkay9jbGllbnQtZHluYW1vZGInO1xyXG5pbXBvcnQgeyBTY2FuQ29tbWFuZCB9IGZyb20gJ0Bhd3Mtc2RrL2xpYi1keW5hbW9kYic7XHJcblxyXG5jb25zdCBkeW5hbW9kYiA9IG5ldyBEeW5hbW9EQih7fSk7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QWxsKCkge1xyXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGR5bmFtb2RiLnNlbmQoXHJcbiAgICBuZXcgU2NhbkNvbW1hbmQoe1xyXG4gICAgICBUYWJsZU5hbWU6IHByb2Nlc3MuZW52LlRBQkxFX05BTUUsXHJcbiAgICB9KVxyXG4gICk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzdGF0dXNDb2RlOiAyMDAsXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXN1bHQuSXRlbXMpLFxyXG4gIH07XHJcbn0iXX0=