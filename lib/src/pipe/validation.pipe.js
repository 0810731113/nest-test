"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationPipe = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const log4js_1 = require("../utils/log4js");
let ValidationPipe = class ValidationPipe {
    async transform(value, { metatype }) {
        console.log(`---value--metatype---`);
        console.log(value);
        console.log(metatype);
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = class_transformer_1.plainToClass(metatype, value);
        const errors = await class_validator_1.validate(object);
        console.log(`------errors-------`);
        console.log(errors);
        if (errors.length > 0) {
            const msg = Object.values(errors[0].constraints)[0];
            log4js_1.Logger.error(`Validation failed: ${msg}`);
            throw new common_1.BadRequestException(`Validation failed: ${msg}`);
        }
        return value;
    }
    toValidate(metatype) {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
};
ValidationPipe = tslib_1.__decorate([
    common_1.Injectable()
], ValidationPipe);
exports.ValidationPipe = ValidationPipe;
//# sourceMappingURL=validation.pipe.js.map