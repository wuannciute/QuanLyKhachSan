"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var users_entity_1 = require("./users.entity");
var users_controller_1 = require("./users.controller");
var users_service_1 = require("./users.service");
var auth_module_1 = require("../auth/auth.module");
var jwt_1 = require("@nestjs/jwt");
var hotels_entity_1 = require("../hotels/hotels.entity");
var hotelRooms_entity_1 = require("../hotels/hotelRooms.entity");
var hotelAssets_entity_1 = require("../hotels/hotelAssets.entity");
var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([users_entity_1.User, hotels_entity_1.Hotel, hotelRooms_entity_1.HotelRooms, hotelAssets_entity_1.HotelAssets]),
                (0, common_1.forwardRef)(function () { return auth_module_1.AuthModule; })
            ],
            providers: [users_service_1.UsersService, jwt_1.JwtService],
            controllers: [users_controller_1.UsersController, users_controller_1.FindHotelsController]
        })
    ], UsersModule);
    return UsersModule;
}());
exports.UsersModule = UsersModule;
