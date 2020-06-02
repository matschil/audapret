import { ValidationPipe, ArgumentMetadata } from "@nestjs/common";

export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super();
  }
  public async transform(value: any, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (error) {
      console.log(error.message.message);
      throw error;
    }
  }
}
