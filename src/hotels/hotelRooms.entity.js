"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HotelRooms = void 0;
var typeorm_1 = require("typeorm");
var HotelRooms = /** @class */ (function () {
    function HotelRooms() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ unsigned: true })
    ], HotelRooms.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ type: "integer" })
    ], HotelRooms.prototype, "hotel_id");
    __decorate([
        (0, typeorm_1.Column)({ type: "integer" })
    ], HotelRooms.prototype, "room_type_id");
    __decorate([
        (0, typeorm_1.Column)({ type: "integer" })
    ], HotelRooms.prototype, "rooms_available");
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            "enum": ['ACKO', 'NOACKO']
        })
    ], HotelRooms.prototype, "facilities");
    __decorate([
        (0, typeorm_1.Column)({ type: 'datetime' })
    ], HotelRooms.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.Column)({ type: 'datetime' })
    ], HotelRooms.prototype, "updatedAt");
    __decorate([
        (0, typeorm_1.Column)()
    ], HotelRooms.prototype, "price");
    HotelRooms = __decorate([
        (0, typeorm_1.Entity)("hotel_rooms")
    ], HotelRooms);
    return HotelRooms;
}());
exports.HotelRooms = HotelRooms;
