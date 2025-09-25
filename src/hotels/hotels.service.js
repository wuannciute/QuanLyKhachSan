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
exports.HAService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var users_entity_1 = require("../users/users.entity");
var hotels_entity_1 = require("./hotels.entity");
var hotelRooms_entity_1 = require("./hotelRooms.entity");
var User_dto_1 = require("../users/dtos/User.dto");
var hotelAssets_entity_1 = require("./hotelAssets.entity");
var reservations_entity_1 = require("./reservations.entity");
var typeorm_2 = require("typeorm");
var HAService = /** @class */ (function () {
    function HAService(usersRepository, hotelRepository, hotelRoomRepository, hotelAssets, hotelReservations) {
        this.usersRepository = usersRepository;
        this.hotelRepository = hotelRepository;
        this.hotelRoomRepository = hotelRoomRepository;
        this.hotelAssets = hotelAssets;
        this.hotelReservations = hotelReservations;
    }
    HAService.prototype.create = function (email, passwordHash, firstName, lastName, prefix, profilePic, zip_code, cityId, stateId, dob) {
        var roleCode = User_dto_1.Role.hotelManager;
        var user = this.usersRepository.create({ email: email, passwordHash: passwordHash, firstName: firstName, lastName: lastName, prefix: prefix, profilePic: profilePic, zip_code: zip_code, roleCode: roleCode, cityId: cityId, stateId: stateId, dob: dob });
        return this.usersRepository.save(user);
    };
    HAService.prototype.listMyHotel = function (adminId, name, email, cityId, stateId, addrLine1, addrLine2, zip_code, brandPic, lat, long) {
        //checking if the admin id is valid or not
        var admin = this.findById(adminId);
        if (!admin) {
            throw new common_1.BadRequestException('Invalid admin id passed');
        }
        //checking if hotel with same email exist 
        var hotel = this.findHotelByEmail(email);
        if (hotel) {
            throw new common_1.BadRequestException('Hotel listing with same email already exist !');
        }
        var newHotel = this.hotelRepository.create({ adminId: adminId, name: name, email: email, cityId: cityId, stateId: stateId, addrLine1: addrLine1, addrLine2: addrLine2, zip_code: zip_code, brandPic: brandPic, lat: lat, long: long });
        return this.hotelRepository.save(newHotel);
    };
    HAService.prototype.cancelRoomReservationByAdmin = function (booking_id, admin_id) {
        return __awaiter(this, void 0, void 0, function () {
            var getReservation, roomId, getHotelId, getHotelAdminId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.hotelReservations.findOne({
                            where: { id: booking_id, is_canceled: false, checkedin: false }
                        })];
                    case 1:
                        getReservation = _a.sent();
                        if (!getReservation) {
                            throw new common_1.BadRequestException('Room already canceled !');
                        }
                        roomId = getReservation.room_id;
                        return [4 /*yield*/, this.hotelRoomRepository.findOne({ where: { id: roomId }, select: ["hotel_id"] })];
                    case 2: return [4 /*yield*/, (_a.sent()).hotel_id];
                    case 3:
                        getHotelId = _a.sent();
                        return [4 /*yield*/, this.hotelRepository.findOne({ where: { id: getHotelId } })];
                    case 4: return [4 /*yield*/, (_a.sent()).adminId];
                    case 5:
                        getHotelAdminId = _a.sent();
                        if (admin_id !== getHotelAdminId) {
                            throw new common_1.BadRequestException('You dont have the required access !');
                        }
                        getReservation.is_canceled = true;
                        return [2 /*return*/, this.hotelReservations.save(getReservation)];
                }
            });
        });
    };
    HAService.prototype.getReservationsByHotelId = function (hotel_id) {
        return __awaiter(this, void 0, void 0, function () {
            var hotelRooms, HotelRoomReservation, _i, hotelRooms_1, room, reservations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.hotelRoomRepository.find({ where: { hotel_id: hotel_id }, select: ["id"] })];
                    case 1:
                        hotelRooms = _a.sent();
                        HotelRoomReservation = [];
                        if (!hotelRooms.length) return [3 /*break*/, 5];
                        _i = 0, hotelRooms_1 = hotelRooms;
                        _a.label = 2;
                    case 2:
                        if (!(_i < hotelRooms_1.length)) return [3 /*break*/, 5];
                        room = hotelRooms_1[_i];
                        return [4 /*yield*/, this.hotelReservations.find({ where: { room_id: room.id } })];
                    case 3:
                        reservations = _a.sent();
                        HotelRoomReservation.push(reservations);
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, HotelRoomReservation];
                }
            });
        });
    };
    HAService.prototype.reserveMyRoom = function (room_id, check_in, check_out, no_of_guest, no_of_rooms, reserved_by) {
        return __awaiter(this, void 0, void 0, function () {
            var freeRooms, newReservation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getEmptyRooms(room_id, check_in, check_out)];
                    case 1:
                        freeRooms = _a.sent();
                        //if hotel is out of rooms then throwing error
                        if (freeRooms < no_of_rooms) {
                            throw new common_1.BadRequestException('We are sorry , we dont have enough rooms now , please come back later !');
                        }
                        //if no of guest excedds then throwing error , assuming max person per room to be 3
                        if (no_of_guest > 3) {
                            throw new common_1.BadRequestException('Max 3 pax available per room !');
                        }
                        newReservation = this.hotelReservations.create({ check_in: check_in, check_out: check_out, room_id: room_id, no_of_guest: no_of_guest, no_of_rooms: no_of_rooms, reserved_by: reserved_by });
                        return [2 /*return*/, this.hotelReservations.save(newReservation)];
                }
            });
        });
    };
    HAService.prototype.cancelUserRoom = function (id, reserved_by) {
        return __awaiter(this, void 0, void 0, function () {
            var getReservation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.hotelReservations.findOne({
                            where: { reserved_by: reserved_by, id: id, is_canceled: false, checkedin: false }
                        })];
                    case 1:
                        getReservation = _a.sent();
                        if (!getReservation) {
                            throw new common_1.BadRequestException('Room already canceled !');
                        }
                        getReservation.is_canceled = true;
                        return [2 /*return*/, this.hotelReservations.save(getReservation)];
                }
            });
        });
    };
    HAService.prototype.checkInUserRoom = function (id, reserved_by) {
        return __awaiter(this, void 0, void 0, function () {
            var getReservation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.hotelReservations.findOne({
                            where: { reserved_by: reserved_by, id: id, is_canceled: false, checkedin: false }
                        })];
                    case 1:
                        getReservation = _a.sent();
                        if (!getReservation) {
                            throw new common_1.BadRequestException('Room already checkedIn !');
                        }
                        getReservation.checkedin = true;
                        return [2 /*return*/, this.hotelReservations.save(getReservation)];
                }
            });
        });
    };
    HAService.prototype.getAllReservations = function (reserved_by) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.hotelReservations.find({
                            where: { reserved_by: reserved_by }
                        })];
                    case 1: 
                    // get all user reservations
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HAService.prototype.addHotelRooms = function (adminId, hotel_id, room_type_id, rooms_available, facilities, price) {
        return __awaiter(this, void 0, void 0, function () {
            var hotel, addHotelRooms;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findHotelById(hotel_id)];
                    case 1:
                        hotel = _a.sent();
                        if (!hotel) {
                            throw new common_1.BadRequestException('Invalid hotel id passed');
                        }
                        //checking hotel ownwer 
                        if (hotel.adminId !== adminId) {
                            throw new common_1.ForbiddenException('Method not allowed !');
                        }
                        return [4 /*yield*/, this.findSimilarRoomType(hotel_id, room_type_id)];
                    case 2:
                        if (_a.sent()) {
                            throw new common_1.BadRequestException('Similar room choise cannot be added twice!');
                        }
                        addHotelRooms = this.hotelRoomRepository.create({ hotel_id: hotel_id, room_type_id: room_type_id, rooms_available: rooms_available, facilities: facilities, price: price });
                        return [2 /*return*/, this.hotelRoomRepository.save(addHotelRooms)];
                }
            });
        });
    };
    HAService.prototype.addHotelAssets = function (adminId, hotel_id, url) {
        return __awaiter(this, void 0, void 0, function () {
            var hotel, newAsset;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findHotelById(hotel_id)];
                    case 1:
                        hotel = _a.sent();
                        if (!hotel) {
                            throw new common_1.BadRequestException('Invalid hotel id passed');
                        }
                        //checking hotel ownwer 
                        if (hotel.adminId !== adminId) {
                            throw new common_1.ForbiddenException('Method not allowed !');
                        }
                        newAsset = this.hotelAssets.create({ uploadedBy: adminId, hotelId: hotel_id, url: url });
                        return [2 /*return*/, this.hotelAssets.save(newAsset)];
                }
            });
        });
    };
    HAService.prototype.getHotelListings = function (adminId) {
        return __awaiter(this, void 0, void 0, function () {
            var hotels, hotelArr, _i, hotels_1, hotel, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.findAllHotelsByAdminId(adminId)];
                    case 1:
                        hotels = _e.sent();
                        hotelArr = [];
                        if (!hotels.length) return [3 /*break*/, 7];
                        _i = 0, hotels_1 = hotels;
                        _e.label = 2;
                    case 2:
                        if (!(_i < hotels_1.length)) return [3 /*break*/, 6];
                        hotel = hotels_1[_i];
                        _a = hotel;
                        _b = 'rooms';
                        return [4 /*yield*/, this.findAllRoomsByHotelId(hotel.id)];
                    case 3:
                        _a[_b] = _e.sent();
                        _c = hotel;
                        _d = 'assets';
                        return [4 /*yield*/, this.findAllAssetsByHotelId(hotel.id)];
                    case 4:
                        _c[_d] = _e.sent();
                        hotelArr.push(hotel);
                        _e.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 2];
                    case 6:
                        if (hotelArr.length === hotels.length) {
                            return [2 /*return*/, hotelArr];
                        }
                        return [3 /*break*/, 8];
                    case 7: return [2 /*return*/, hotelArr];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    HAService.prototype.getEmptyRooms = function (room_id, check_in, check_out) {
        return __awaiter(this, void 0, void 0, function () {
            var totalBookedRooms, bookedRooms, _i, bookedRooms_1, room, getTotalRoomsAvailable, TotalRooms;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        totalBookedRooms = 0;
                        return [4 /*yield*/, this.hotelReservations.find({
                                where: {
                                    room_id: room_id,
                                    is_canceled: false,
                                    check_out: (0, typeorm_2.MoreThan)(new Date(check_in)),
                                    check_in: (0, typeorm_2.LessThan)(new Date(check_out))
                                },
                                select: ["no_of_rooms", "checkedin"]
                            })];
                    case 1:
                        bookedRooms = _a.sent();
                        if (bookedRooms.length) {
                            for (_i = 0, bookedRooms_1 = bookedRooms; _i < bookedRooms_1.length; _i++) {
                                room = bookedRooms_1[_i];
                                totalBookedRooms += room.no_of_rooms;
                            }
                        }
                        return [4 /*yield*/, this.hotelRoomRepository.findOne({
                                where: { id: room_id },
                                select: ["rooms_available"]
                            })];
                    case 2:
                        getTotalRoomsAvailable = _a.sent();
                        TotalRooms = getTotalRoomsAvailable.rooms_available;
                        //result = total - bookedRooms
                        return [2 /*return*/, TotalRooms - totalBookedRooms];
                }
            });
        });
    };
    HAService.prototype.getHotelsByCity = function (cityId, check_in, check_out) {
        return __awaiter(this, void 0, void 0, function () {
            var hotels, hotelArr, _i, hotels_2, hotel, totalRooms, _a, totalRooms_1, room, emptyRoomsAvailable, roomData, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        //not allowing history data , restricting checkin date to be more than today
                        if (new Date(check_in) <= new Date()) {
                            throw new common_1.BadRequestException('CheckIn cannot be in a past date !');
                        }
                        if (new Date(check_in) > new Date(check_out)) {
                            throw new common_1.BadRequestException('You cannot check out before you checked in !');
                        }
                        return [4 /*yield*/, this.findAllHotelsByCityId(cityId)];
                    case 1:
                        hotels = _d.sent();
                        hotelArr = [];
                        if (!hotels.length) return [3 /*break*/, 11];
                        _i = 0, hotels_2 = hotels;
                        _d.label = 2;
                    case 2:
                        if (!(_i < hotels_2.length)) return [3 /*break*/, 10];
                        hotel = hotels_2[_i];
                        return [4 /*yield*/, this.findAllRoomsByHotelId(hotel.id)];
                    case 3:
                        totalRooms = _d.sent();
                        hotel['rooms'] = [];
                        if (!totalRooms.length) return [3 /*break*/, 7];
                        _a = 0, totalRooms_1 = totalRooms;
                        _d.label = 4;
                    case 4:
                        if (!(_a < totalRooms_1.length)) return [3 /*break*/, 7];
                        room = totalRooms_1[_a];
                        return [4 /*yield*/, this.getEmptyRooms(room.id, check_in, check_out)];
                    case 5:
                        emptyRoomsAvailable = _d.sent();
                        roomData = {
                            room_type_id: room.id,
                            totalRooms: room.rooms_available,
                            availableRooms: emptyRoomsAvailable
                        };
                        hotel['rooms'].push(roomData);
                        _d.label = 6;
                    case 6:
                        _a++;
                        return [3 /*break*/, 4];
                    case 7:
                        _b = hotel;
                        _c = 'assets';
                        return [4 /*yield*/, this.findAllAssetsByHotelId(hotel.id)];
                    case 8:
                        _b[_c] = _d.sent();
                        hotelArr.push(hotel);
                        _d.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 2];
                    case 10:
                        if (hotelArr.length === hotels.length) {
                            return [2 /*return*/, hotelArr];
                        }
                        return [3 /*break*/, 12];
                    case 11: return [2 /*return*/, hotelArr];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    HAService.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.usersRepository.find()];
            });
        });
    };
    HAService.prototype.findByEmail = function (email) {
        return this.usersRepository.findOne({ where: { email: email, roleCode: User_dto_1.Role.hotelManager } });
    };
    HAService.prototype.findAllHotelsByAdminId = function (adminId) {
        return this.hotelRepository.find({ where: { adminId: adminId } });
    };
    HAService.prototype.findAllHotelsByCityId = function (cityId) {
        //only showing hotels which are approved and activated by admin 
        return this.hotelRepository.find({ where: { cityId: cityId, isActive: true, isApproved: true } });
    };
    HAService.prototype.findAllRoomsByHotelId = function (hotel_id) {
        return this.hotelRoomRepository.find({ where: { hotel_id: hotel_id } });
    };
    HAService.prototype.findRoomsByHotelId = function (hotel_id) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.hotelRoomRepository.findOne({ where: { hotel_id: hotel_id }, select: ["rooms_available"] })];
                    case 1:
                        data = _a.sent();
                        console.log(data);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    HAService.prototype.findAllAssetsByHotelId = function (hotel_id) {
        return this.hotelAssets.find({ where: { hotelId: hotel_id } });
    };
    HAService.prototype.findHotelByEmail = function (email) {
        return this.hotelRepository.findOne({ where: { email: email } });
    };
    HAService.prototype.findById = function (id) {
        return this.usersRepository.findOne({ where: { id: id, roleCode: User_dto_1.Role.hotelManager } });
    };
    HAService.prototype.findSimilarRoomType = function (hotel_id, room_type_id) {
        return this.hotelRoomRepository.findOne({ where: { hotel_id: hotel_id, room_type_id: room_type_id } });
    };
    HAService.prototype.findHotelById = function (id) {
        return this.hotelRepository.findOne({ where: { id: id } });
    };
    HAService.prototype.signup = function (email, password, firstName, lastName, prefix, profilePic, zip_code, cityId, stateId, dob) {
        return __awaiter(this, void 0, void 0, function () {
            var users, passwordHash, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findByEmail(email)];
                    case 1:
                        users = _a.sent();
                        if (users) {
                            throw new common_1.BadRequestException('This email already in use !');
                        }
                        passwordHash = password;
                        return [4 /*yield*/, this.create(email, passwordHash, firstName, lastName, prefix, profilePic, zip_code, cityId, stateId, dob)];
                    case 2:
                        user = _a.sent();
                        // return the user
                        return [2 /*return*/, user];
                }
            });
        });
    };
    HAService.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersRepository["delete"](id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HAService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
        __param(1, (0, typeorm_1.InjectRepository)(hotels_entity_1.Hotel)),
        __param(2, (0, typeorm_1.InjectRepository)(hotelRooms_entity_1.HotelRooms)),
        __param(3, (0, typeorm_1.InjectRepository)(hotelAssets_entity_1.HotelAssets)),
        __param(4, (0, typeorm_1.InjectRepository)(reservations_entity_1.Hotelreservations))
    ], HAService);
    return HAService;
}());
exports.HAService = HAService;
