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
exports.UsersService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var users_entity_1 = require("./users.entity");
var User_dto_1 = require("./dtos/User.dto");
var hotels_entity_1 = require("../hotels/hotels.entity");
var hotelRooms_entity_1 = require("../hotels/hotelRooms.entity");
var hotelAssets_entity_1 = require("../hotels/hotelAssets.entity");
var UsersService = /** @class */ (function () {
    function UsersService(usersRepository, hotelRepository, hotelRoomRepository, hotelAssetRepository) {
        this.usersRepository = usersRepository;
        this.hotelRepository = hotelRepository;
        this.hotelRoomRepository = hotelRoomRepository;
        this.hotelAssetRepository = hotelAssetRepository;
    }
    UsersService.prototype.create = function (email, passwordHash, firstName, lastName, prefix, profilePic, zip_code, cityId, stateId, dob) {
        var roleCode = User_dto_1.Role.User;
        var user = this.usersRepository.create({ email: email, passwordHash: passwordHash, firstName: firstName, lastName: lastName, prefix: prefix, profilePic: profilePic, zip_code: zip_code, roleCode: roleCode, cityId: cityId, stateId: stateId, dob: dob });
        return this.usersRepository.save(user);
    };
    UsersService.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.usersRepository.find()];
            });
        });
    };
    UsersService.prototype.findByEmail = function (email) {
        return this.usersRepository.findOne({ where: { email: email, roleCode: User_dto_1.Role.User } });
    };
    UsersService.prototype.findById = function (id) {
        return this.usersRepository.findOne({ where: { id: id, roleCode: User_dto_1.Role.User } });
    };
    UsersService.prototype.signup = function (email, password, firstName, lastName, prefix, profilePic, zip_code, cityId, stateId, dob) {
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
    UsersService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
        __param(1, (0, typeorm_1.InjectRepository)(hotels_entity_1.Hotel)),
        __param(2, (0, typeorm_1.InjectRepository)(hotelRooms_entity_1.HotelRooms)),
        __param(3, (0, typeorm_1.InjectRepository)(hotelAssets_entity_1.HotelAssets))
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
