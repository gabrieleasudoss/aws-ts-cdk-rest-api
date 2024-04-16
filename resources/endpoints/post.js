"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const get_one_1 = require("../handlers/posts/get-one");
const delete_1 = require("../handlers/posts/delete");
const handler = async (event) => {
    const id = event.pathParameters?.id;
    if (!id) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing path parameter: id' }),
        };
    }
    try {
        // Handle different HTTP methods
        switch (event.httpMethod) {
            case 'GET':
                return await (0, get_one_1.getOne)({ id });
            case 'DELETE':
                return await (0, delete_1.deletePost)({ id });
            default:
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: 'Invalid HTTP method' }),
                };
        }
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error }),
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdURBQW1EO0FBQ25ELHFEQUFzRDtBQUUvQyxNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQUUsS0FBMkIsRUFBRSxFQUFFO0lBQzNELE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDO0lBRXBDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNSLE9BQU87WUFDTCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLENBQUM7U0FDaEUsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUFJLENBQUM7UUFDSCxnQ0FBZ0M7UUFDaEMsUUFBUSxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDekIsS0FBSyxLQUFLO2dCQUNSLE9BQU8sTUFBTSxJQUFBLGdCQUFNLEVBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzlCLEtBQUssUUFBUTtnQkFDWCxPQUFPLE1BQU0sSUFBQSxtQkFBVSxFQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNsQztnQkFDRSxPQUFPO29CQUNMLFVBQVUsRUFBRSxHQUFHO29CQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLENBQUM7aUJBQ3pELENBQUM7UUFDTixDQUFDO0lBQ0gsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixzQ0FBc0M7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVuQixPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztTQUN6QyxDQUFDO0lBQ0osQ0FBQztBQUNILENBQUMsQ0FBQztBQWhDVyxRQUFBLE9BQU8sV0FnQ2xCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVBJR2F0ZXdheVByb3h5RXZlbnQgfSBmcm9tICdhd3MtbGFtYmRhJztcclxuaW1wb3J0IHsgZ2V0T25lIH0gZnJvbSAnLi4vaGFuZGxlcnMvcG9zdHMvZ2V0LW9uZSc7XHJcbmltcG9ydCB7IGRlbGV0ZVBvc3QgfSBmcm9tICcuLi9oYW5kbGVycy9wb3N0cy9kZWxldGUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IEFQSUdhdGV3YXlQcm94eUV2ZW50KSA9PiB7XHJcbiAgY29uc3QgaWQgPSBldmVudC5wYXRoUGFyYW1ldGVycz8uaWQ7XHJcblxyXG4gIGlmICghaWQpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN0YXR1c0NvZGU6IDQwMCxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBtZXNzYWdlOiAnTWlzc2luZyBwYXRoIHBhcmFtZXRlcjogaWQnIH0pLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICAvLyBIYW5kbGUgZGlmZmVyZW50IEhUVFAgbWV0aG9kc1xyXG4gICAgc3dpdGNoIChldmVudC5odHRwTWV0aG9kKSB7XHJcbiAgICAgIGNhc2UgJ0dFVCc6XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IGdldE9uZSh7IGlkIH0pO1xyXG4gICAgICBjYXNlICdERUxFVEUnOlxyXG4gICAgICAgIHJldHVybiBhd2FpdCBkZWxldGVQb3N0KHsgaWQgfSk7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcclxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZTogJ0ludmFsaWQgSFRUUCBtZXRob2QnIH0pLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXHJcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3RhdHVzQ29kZTogNTAwLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2U6IGVycm9yIH0pLFxyXG4gICAgfTtcclxuICB9XHJcbn07Il19