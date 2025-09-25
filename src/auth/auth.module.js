"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var auth_service_1 = require("./auth.service");
// import { LocalStrategy } from './local.strategy';
var jwt_strategy_1 = require("./jwt.strategy");
var passport_1 = require("@nestjs/passport");
var jwt_1 = require("@nestjs/jwt");
//user module 
var users_module_1 = require("../users/users.module");
var users_service_1 = require("../users/users.service");
//hotel admin module 
var hotels_service_1 = require("../hotels/hotels.service");
var hotels_module_1 = require("../hotels/hotels.module");
var typeorm_1 = require("@nestjs/typeorm");
var users_entity_1 = require("../users/users.entity");
var hotels_entity_1 = require("../hotels/hotels.entity");
var hotelRooms_entity_1 = require("../hotels/hotelRooms.entity");
var hotelAssets_entity_1 = require("../hotels/hotelAssets.entity");
var reservations_entity_1 = require("../hotels/reservations.entity");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        (0, common_1.Module)({
            imports: [
                passport_1.PassportModule,
                typeorm_1.TypeOrmModule.forFeature([users_entity_1.User, hotels_entity_1.Hotel, hotelRooms_entity_1.HotelRooms, hotelAssets_entity_1.HotelAssets, reservations_entity_1.Hotelreservations]),
                (0, common_1.forwardRef)(function () { return users_module_1.UsersModule; }),
                (0, common_1.forwardRef)(function () { return hotels_module_1.HAModule; }),
                jwt_1.JwtModule.register({
                    secret: '6276bb15-3c31-466e-bca2-eb8523d44037',
                    signOptions: { expiresIn: '2d' }
                }),
            ],
            providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, users_service_1.UsersService, hotels_service_1.HAService],
            exports: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
