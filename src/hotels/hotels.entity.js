"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Hotel = void 0;
var typeorm_1 = require("typeorm");
var Hotel = /** @class */ (function () {
    function Hotel() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ unsigned: true })
    ], Hotel.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ type: "integer" })
    ], Hotel.prototype, "adminId");
    __decorate([
        (0, typeorm_1.Column)()
    ], Hotel.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)()
    ], Hotel.prototype, "brandPic");
    __decorate([
        (0, typeorm_1.Column)()
    ], Hotel.prototype, "email");
    __decorate([
        (0, typeorm_1.Column)({ type: 'datetime' })
    ], Hotel.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.Column)({ type: 'datetime' })
    ], Hotel.prototype, "updatedAt");
    __decorate([
        (0, typeorm_1.Column)()
    ], Hotel.prototype, "addrLine1");
    __decorate([
        (0, typeorm_1.Column)()
    ], Hotel.prototype, "addrLine2");
    __decorate([
        (0, typeorm_1.Column)()
    ], Hotel.prototype, "lat");
    __decorate([
        (0, typeorm_1.Column)()
    ], Hotel.prototype, "long");
    __decorate([
        (0, typeorm_1.Column)()
    ], Hotel.prototype, "cityId");
    __decorate([
        (0, typeorm_1.Column)()
    ], Hotel.prototype, "stateId");
    __decorate([
        (0, typeorm_1.Column)()
    ], Hotel.prototype, "zip_code");
    __decorate([
        (0, typeorm_1.Column)({ "default": false })
    ], Hotel.prototype, "isActive");
    __decorate([
        (0, typeorm_1.Column)({ "default": false })
    ], Hotel.prototype, "isApproved");
    Hotel = __decorate([
        (0, typeorm_1.Entity)("hotels")
    ], Hotel);
    return Hotel;
}());
exports.Hotel = Hotel;
