"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HotelDto = void 0;
var class_transformer_1 = require("class-transformer");
var HotelDto = /** @class */ (function () {
    function HotelDto() {
    }
    __decorate([
        (0, class_transformer_1.Expose)()
    ], HotelDto.prototype, "name");
    __decorate([
        (0, class_transformer_1.Expose)()
    ], HotelDto.prototype, "email");
    __decorate([
        (0, class_transformer_1.Expose)()
    ], HotelDto.prototype, "cityId");
    __decorate([
        (0, class_transformer_1.Expose)()
    ], HotelDto.prototype, "stateId");
    __decorate([
        (0, class_transformer_1.Expose)()
    ], HotelDto.prototype, "addrLine1");
    __decorate([
        (0, class_transformer_1.Expose)()
    ], HotelDto.prototype, "addrLine2");
    __decorate([
        (0, class_transformer_1.Expose)()
    ], HotelDto.prototype, "zip_code");
    __decorate([
        (0, class_transformer_1.Expose)()
    ], HotelDto.prototype, "brandPic");
    __decorate([
        (0, class_transformer_1.Expose)()
    ], HotelDto.prototype, "lat");
    __decorate([
        (0, class_transformer_1.Expose)()
    ], HotelDto.prototype, "long");
    return HotelDto;
}());
exports.HotelDto = HotelDto;
