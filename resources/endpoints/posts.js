"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const get_all_1 = require("../handlers/posts/get-all");
const create_1 = require("../handlers/posts/create");
const handler = async (event) => {
    try {
        // Handle different HTTP methods
        switch (event.httpMethod) {
            case 'GET':
                return await (0, get_all_1.getAll)();
            case 'POST':
                return await (0, create_1.create)(event.body);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwb3N0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1REFBbUQ7QUFDbkQscURBQWtEO0FBRTNDLE1BQU0sT0FBTyxHQUFHLEtBQUssRUFBRSxLQUEyQixFQUFFLEVBQUU7SUFDM0QsSUFBSSxDQUFDO1FBQ0gsZ0NBQWdDO1FBQ2hDLFFBQVEsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3pCLEtBQUssS0FBSztnQkFDUixPQUFPLE1BQU0sSUFBQSxnQkFBTSxHQUFFLENBQUM7WUFDeEIsS0FBSyxNQUFNO2dCQUNULE9BQU8sTUFBTSxJQUFBLGVBQU0sRUFBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEM7Z0JBQ0UsT0FBTztvQkFDTCxVQUFVLEVBQUUsR0FBRztvQkFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxDQUFDO2lCQUN6RCxDQUFDO1FBQ04sQ0FBQztJQUNILENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2Ysc0NBQXNDO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbkIsT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDekMsQ0FBQztJQUNKLENBQUM7QUFDSCxDQUFDLENBQUM7QUF2QlcsUUFBQSxPQUFPLFdBdUJsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFQSUdhdGV3YXlQcm94eUV2ZW50IH0gZnJvbSAnYXdzLWxhbWJkYSc7XHJcbmltcG9ydCB7IGdldEFsbCB9IGZyb20gJy4uL2hhbmRsZXJzL3Bvc3RzL2dldC1hbGwnO1xyXG5pbXBvcnQgeyBjcmVhdGUgfSBmcm9tICcuLi9oYW5kbGVycy9wb3N0cy9jcmVhdGUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IEFQSUdhdGV3YXlQcm94eUV2ZW50KSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIC8vIEhhbmRsZSBkaWZmZXJlbnQgSFRUUCBtZXRob2RzXHJcbiAgICBzd2l0Y2ggKGV2ZW50Lmh0dHBNZXRob2QpIHtcclxuICAgICAgY2FzZSAnR0VUJzpcclxuICAgICAgICByZXR1cm4gYXdhaXQgZ2V0QWxsKCk7XHJcbiAgICAgIGNhc2UgJ1BPU1QnOlxyXG4gICAgICAgIHJldHVybiBhd2FpdCBjcmVhdGUoZXZlbnQuYm9keSk7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcclxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZTogJ0ludmFsaWQgSFRUUCBtZXRob2QnIH0pLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXHJcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3RhdHVzQ29kZTogNTAwLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2U6IGVycm9yIH0pLFxyXG4gICAgfTtcclxuICB9XHJcbn07Il19