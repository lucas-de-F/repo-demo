import { MiddlewareConsumer } from '@nestjs/common';

export function MiddlewareResolver(consumer: MiddlewareConsumer) {
  // consumer
  //   .apply(ValidatePaymentMiddleware, ValidatePaymentParamMiddleware)
  //   .forRoutes(EmployeePaymentController);
}
