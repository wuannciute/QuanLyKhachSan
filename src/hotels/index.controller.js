"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.HotelAssetsController = exports.HotelRoomsController = exports.HAController = exports.HotelsReservationsController = exports.HotelsController = void 0;
var common_1 = require("@nestjs/common");
//importing serializers
var serialize_interceptor_1 = require("../interceptor/serialize.interceptor");
var User_dto_1 = require("../users/dtos/User.dto");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var User_dto_2 = require("../users/dtos/User.dto");
var role_guard_1 = require("../guards/role.guard");
var HotelsController = /** @class */ (function () {
    function HotelsController(haService, jwtService) {
        this.haService = haService;
        this.jwtService = jwtService;
    }
    HotelsController.prototype.getHotelsBasedOnCity = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var cityId, check_in, check_out;
            return __generator(this, function (_a) {
                cityId = query.cityId, check_in = query.check_in, check_out = query.check_out;
                return [2 /*return*/, this.haService.getHotelsByCity(cityId, check_in, check_out)];
            });
        });
    };
    __decorate([
        (0, common_1.Get)(),
        __param(0, (0, common_1.Query)())
    ], HotelsController.prototype, "getHotelsBasedOnCity");
    HotelsController = __decorate([
        (0, common_1.Controller)('hotels')
    ], HotelsController);
    return HotelsController;
}());
exports.HotelsController = HotelsController;
var HotelsReservationsController = /** @class */ (function () {
    function HotelsReservationsController(haService, jwtService) {
        this.haService = haService;
        this.jwtService = jwtService;
    }
    HotelsReservationsController.prototype.getAllReservations = function (headers) {
        return __awaiter(this, void 0, void 0, function () {
            var token, reserved_by;
            return __generator(this, function (_a) {
                token = headers.authorization.slice(7);
                reserved_by = this.jwtService.decode(token).sub;
                return [2 /*return*/, this.haService.getAllReservations(reserved_by)];
            });
        });
    };
    HotelsReservationsController.prototype.bookHotelRoom = function (headers, body) {
        return __awaiter(this, void 0, void 0, function () {
            var token, reserved_by, room_id, check_in, check_out, no_of_guest, no_of_rooms;
            return __generator(this, function (_a) {
                token = headers.authorization.slice(7);
                reserved_by = this.jwtService.decode(token).sub;
                room_id = body.room_id, check_in = body.check_in, check_out = body.check_out, no_of_guest = body.no_of_guest, no_of_rooms = body.no_of_rooms;
                return [2 /*return*/, this.haService.reserveMyRoom(room_id, check_in, check_out, no_of_guest, no_of_rooms, reserved_by)];
            });
        });
    };
    HotelsReservationsController.prototype.cancelHotelBooking = function (headers, body) {
        return __awaiter(this, void 0, void 0, function () {
            var token, reserved_by, id;
            return __generator(this, function (_a) {
                token = headers.authorization.slice(7);
                reserved_by = this.jwtService.decode(token).sub;
                id = body.id;
                return [2 /*return*/, this.haService.cancelUserRoom(id, reserved_by)];
            });
        });
    };
    HotelsReservationsController.prototype.checkInToHotel = function (headers, body) {
        return __awaiter(this, void 0, void 0, function () {
            var token, reserved_by, id;
            return __generator(this, function (_a) {
                token = headers.authorization.slice(7);
                reserved_by = this.jwtService.decode(token).sub;
                id = body.id;
                return [2 /*return*/, this.haService.checkInUserRoom(id, reserved_by)];
            });
        });
    };
    __decorate([
        (0, common_1.Get)(),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(User_dto_2.Role.User)),
        __param(0, (0, common_1.Headers)())
    ], HotelsReservationsController.prototype, "getAllReservations");
    __decorate([
        (0, common_1.Post)('book'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(User_dto_2.Role.User)),
        __param(0, (0, common_1.Headers)()),
        __param(1, (0, common_1.Body)())
    ], HotelsReservationsController.prototype, "bookHotelRoom");
    __decorate([
        (0, common_1.Post)('cancel'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(User_dto_2.Role.User)),
        __param(0, (0, common_1.Headers)()),
        __param(1, (0, common_1.Body)())
    ], HotelsReservationsController.prototype, "cancelHotelBooking");
    __decorate([
        (0, common_1.Post)('checkIn'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(User_dto_2.Role.User)),
        __param(0, (0, common_1.Headers)()),
        __param(1, (0, common_1.Body)())
    ], HotelsReservationsController.prototype, "checkInToHotel");
    HotelsReservationsController = __decorate([
        (0, common_1.Controller)('hotels/reservations')
    ], HotelsReservationsController);
    return HotelsReservationsController;
}());
exports.HotelsReservationsController = HotelsReservationsController;
var HAController = /** @class */ (function () {
    function HAController(haService, authService, jwtService) {
        this.haService = haService;
        this.authService = authService;
        this.jwtService = jwtService;
    }
    HAController.prototype.login = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = body.email, password = body.password;
                        return [4 /*yield*/, this.authService.validateCreds(email, password, User_dto_2.Role.hotelManager)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    HAController.prototype.createUser = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, firstName, lastName, prefix, profilePic, zip_code, dob, stateId, cityId, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = body.email, password = body.password, firstName = body.firstName, lastName = body.lastName, prefix = body.prefix, profilePic = body.profilePic, zip_code = body.zip_code, dob = body.dob, stateId = body.stateId, cityId = body.cityId;
                        return [4 /*yield*/, this.haService.signup(email, password, firstName, lastName, prefix, profilePic, zip_code, cityId, stateId, dob)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    //authenticated routes
    HAController.prototype.getProfile = function (headers) {
        return __awaiter(this, void 0, void 0, function () {
            var token, userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = headers.authorization.slice(7);
                        userId = this.jwtService.decode(token).sub;
                        return [4 /*yield*/, this.haService.findById(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HAController.prototype.getAllHotelListings = function (headers) {
        return __awaiter(this, void 0, void 0, function () {
            var token, userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = headers.authorization.slice(7);
                        userId = this.jwtService.decode(token).sub;
                        return [4 /*yield*/, this.haService.getHotelListings(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HAController.prototype.listMyHotel = function (headers, body) {
        return __awaiter(this, void 0, void 0, function () {
            var token, adminId, name, email, cityId, stateId, addrLine1, addrLine2, zip_code, brandPic, lat, long;
            return __generator(this, function (_a) {
                token = headers.authorization.slice(7);
                adminId = this.jwtService.decode(token).sub;
                name = body.name, email = body.email, cityId = body.cityId, stateId = body.stateId, addrLine1 = body.addrLine1, addrLine2 = body.addrLine2, zip_code = body.zip_code, brandPic = body.brandPic, lat = body.lat, long = body.long;
                return [2 /*return*/, this.haService.listMyHotel(adminId, name, email, cityId, stateId, addrLine1, addrLine2, zip_code, brandPic, lat, long)];
            });
        });
    };
    __decorate([
        (0, serialize_interceptor_1.Serialize)(User_dto_1.UserDto),
        (0, common_1.Post)("login"),
        __param(0, (0, common_1.Body)())
    ], HAController.prototype, "login");
    __decorate([
        (0, serialize_interceptor_1.Serialize)(User_dto_1.UserDto),
        (0, common_1.Post)('/signup'),
        __param(0, (0, common_1.Body)())
    ], HAController.prototype, "createUser");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(User_dto_2.Role.hotelManager)),
        (0, common_1.Get)('profile'),
        __param(0, (0, common_1.Headers)())
    ], HAController.prototype, "getProfile");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(User_dto_2.Role.hotelManager)),
        (0, common_1.Get)(),
        __param(0, (0, common_1.Headers)())
    ], HAController.prototype, "getAllHotelListings");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(User_dto_2.Role.hotelManager)),
        (0, common_1.Post)('listmyhotel'),
        __param(0, (0, common_1.Headers)()),
        __param(1, (0, common_1.Body)())
    ], HAController.prototype, "listMyHotel");
    HAController = __decorate([
        (0, common_1.Controller)('hotel/admin')
    ], HAController);
    return HAController;
}());
exports.HAController = HAController;
var HotelRoomsController = /** @class */ (function () {
    function HotelRoomsController(haService, jwtService) {
        this.haService = haService;
        this.jwtService = jwtService;
    }
    HotelRoomsController.prototype.addRooms = function (headers, body) {
        return __awaiter(this, void 0, void 0, function () {
            var token, adminId, hotel_id, room_type_id, rooms_available, facilities, price;
            return __generator(this, function (_a) {
                token = headers.authorization.slice(7);
                adminId = this.jwtService.decode(token).sub;
                hotel_id = body.hotel_id, room_type_id = body.room_type_id, rooms_available = body.rooms_available, facilities = body.facilities, price = body.price;
                return [2 /*return*/, this.haService.addHotelRooms(adminId, hotel_id, room_type_id, rooms_available, facilities, price)];
            });
        });
    };
    HotelRoomsController.prototype.getHotelReservations = function (hotelId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.haService.getReservationsByHotelId(hotelId)];
            });
        });
    };
    HotelRoomsController.prototype.cancelHotelBooking = function (headers, body) {
        return __awaiter(this, void 0, void 0, function () {
            var token, adminId, id;
            return __generator(this, function (_a) {
                token = headers.authorization.slice(7);
                adminId = this.jwtService.decode(token).sub;
                id = body.id;
                return [2 /*return*/, this.haService.cancelRoomReservationByAdmin(id, adminId)];
            });
        });
    };
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(User_dto_2.Role.hotelManager)),
        (0, common_1.Post)(),
        __param(0, (0, common_1.Headers)()),
        __param(1, (0, common_1.Body)())
    ], HotelRoomsController.prototype, "addRooms");
    __decorate([
        (0, common_1.Get)('reservations/:hotelId'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(User_dto_2.Role.hotelManager)),
        __param(0, (0, common_1.Param)('hotelId'))
    ], HotelRoomsController.prototype, "getHotelReservations");
    __decorate([
        (0, common_1.Post)('reservations/cancel'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(User_dto_2.Role.hotelManager)),
        __param(0, (0, common_1.Headers)()),
        __param(1, (0, common_1.Body)())
    ], HotelRoomsController.prototype, "cancelHotelBooking");
    HotelRoomsController = __decorate([
        (0, common_1.Controller)('hotel/admin/rooms')
    ], HotelRoomsController);
    return HotelRoomsController;
}());
exports.HotelRoomsController = HotelRoomsController;
var HotelAssetsController = /** @class */ (function () {
    function HotelAssetsController(haService, jwtService) {
        this.haService = haService;
        this.jwtService = jwtService;
    }
    HotelAssetsController.prototype.addAsset = function (headers, body) {
        return __awaiter(this, void 0, void 0, function () {
            var token, adminId, url, hotel_id;
            return __generator(this, function (_a) {
                token = headers.authorization.slice(7);
                adminId = this.jwtService.decode(token).sub;
                url = body.url, hotel_id = body.hotel_id;
                return [2 /*return*/, this.haService.addHotelAssets(adminId, hotel_id, url)];
            });
        });
    };
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(User_dto_2.Role.hotelManager)),
        (0, common_1.Post)(),
        __param(0, (0, common_1.Headers)()),
        __param(1, (0, common_1.Body)())
    ], HotelAssetsController.prototype, "addAsset");
    HotelAssetsController = __decorate([
        (0, common_1.Controller)('hotel/admin/hotelAssets')
    ], HotelAssetsController);
    return HotelAssetsController;
}());
exports.HotelAssetsController = HotelAssetsController;
