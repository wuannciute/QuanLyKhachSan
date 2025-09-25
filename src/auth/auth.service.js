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
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var users_service_1 = require("../users/users.service");
var bcrypt = require("bcrypt");
var User_dto_1 = require("../users/dtos/User.dto");
var AuthService = /** @class */ (function () {
    function AuthService(usersService, haService, jwtService) {
        this.usersService = usersService;
        this.haService = haService;
        this.jwtService = jwtService;
    }
    AuthService.prototype.validateCreds = function (email, password, role) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isPasswordMatch, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(role === User_dto_1.Role.User)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.usersService.findByEmail(email)];
                    case 1:
                        //searching in new users
                        user = _a.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(role === User_dto_1.Role.hotelManager)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.haService.findByEmail(email)];
                    case 3:
                        //searching in hotel admins users
                        user = _a.sent();
                        return [3 /*break*/, 5];
                    case 4: throw new common_1.ForbiddenException('Method not allowed');
                    case 5:
                        if (!user) {
                            throw new common_1.ForbiddenException('Incorrect email or password !');
                        }
                        return [4 /*yield*/, bcrypt.compare(password, user.passwordHash)];
                    case 6:
                        isPasswordMatch = _a.sent();
                        if (!isPasswordMatch) {
                            throw new common_1.ForbiddenException('Incorrect email or password !');
                        }
                        else {
                            payload = { username: user.email, sub: user.id, role: user.roleCode };
                            return [2 /*return*/, {
                                    accessToken: this.jwtService.sign(payload)
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(function () { return users_service_1.UsersService; })))
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
