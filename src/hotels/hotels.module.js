"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HAModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var users_entity_1 = require("../users/users.entity");
var hotels_entity_1 = require("./hotels.entity");
var hotelRooms_entity_1 = require("./hotelRooms.entity");
var hotelAssets_entity_1 = require("./hotelAssets.entity");
var reservations_entity_1 = require("./reservations.entity");
var index_controller_1 = require("./index.controller");
var auth_module_1 = require("../auth/auth.module");
var jwt_1 = require("@nestjs/jwt");
var hotels_service_1 = require("./hotels.service");
var HAModule = /** @class */ (function () {
    function HAModule() {
    }
    HAModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([users_entity_1.User, hotels_entity_1.Hotel, hotelRooms_entity_1.HotelRooms, hotelAssets_entity_1.HotelAssets, reservations_entity_1.Hotelreservations,]),
                (0, common_1.forwardRef)(function () { return auth_module_1.AuthModule; })
            ],
            providers: [jwt_1.JwtService, hotels_service_1.HAService],
            controllers: [index_controller_1.HotelsController, index_controller_1.HAController, index_controller_1.HotelAssetsController, index_controller_1.HotelRoomsController, index_controller_1.HotelsReservationsController]
        })
    ], HAModule);
    return HAModule;
}());
exports.HAModule = HAModule;
