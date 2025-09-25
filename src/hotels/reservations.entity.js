"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Hotelreservations = void 0;
var typeorm_1 = require("typeorm");
var Hotelreservations = /** @class */ (function () {
    function Hotelreservations() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ unsigned: true })
    ], Hotelreservations.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ type: 'datetime' })
    ], Hotelreservations.prototype, "check_in");
    __decorate([
        (0, typeorm_1.Column)({ type: 'datetime' })
    ], Hotelreservations.prototype, "check_out");
    __decorate([
        (0, typeorm_1.Column)()
    ], Hotelreservations.prototype, "no_of_guest");
    __decorate([
        (0, typeorm_1.Column)()
    ], Hotelreservations.prototype, "room_id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Hotelreservations.prototype, "no_of_rooms");
    __decorate([
        (0, typeorm_1.Column)()
    ], Hotelreservations.prototype, "reserved_by");
    __decorate([
        (0, typeorm_1.Column)({ type: 'datetime' })
    ], Hotelreservations.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.Column)({ type: 'datetime' })
    ], Hotelreservations.prototype, "updatedAt");
    __decorate([
        (0, typeorm_1.Column)({ "default": false })
    ], Hotelreservations.prototype, "is_canceled");
    __decorate([
        (0, typeorm_1.Column)({ "default": false })
    ], Hotelreservations.prototype, "checkedin");
    Hotelreservations = __decorate([
        (0, typeorm_1.Entity)("reservations")
    ], Hotelreservations);
    return Hotelreservations;
}());
exports.Hotelreservations = Hotelreservations;
