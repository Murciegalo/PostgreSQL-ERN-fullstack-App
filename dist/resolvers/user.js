"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entities/User");
const argon2_1 = __importDefault(require("argon2"));
let UserSignUp = class UserSignUp {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserSignUp.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserSignUp.prototype, "password", void 0);
UserSignUp = __decorate([
    type_graphql_1.InputType()
], UserSignUp);
let FieldError = class FieldError {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FieldError.prototype, "msg", void 0);
FieldError = __decorate([
    type_graphql_1.ObjectType()
], FieldError);
let LoginResponse = class LoginResponse {
};
__decorate([
    type_graphql_1.Field(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], LoginResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], LoginResponse.prototype, "user", void 0);
LoginResponse = __decorate([
    type_graphql_1.ObjectType()
], LoginResponse);
let UserResolver = class UserResolver {
    register({ em }, userInputs) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userInputs.username.length <= 2) {
                return {
                    errors: [{
                            field: `username`,
                            msg: `Please set a longer username`
                        }]
                };
            }
            if (userInputs.password.length <= 5) {
                return {
                    errors: [{
                            field: `password`,
                            msg: `Please set at least a 6 chars password`
                        }]
                };
            }
            const hashedP = yield argon2_1.default.hash(userInputs.password);
            const user = em.create(User_1.User, {
                username: userInputs.username,
                password: hashedP
            });
            try {
                yield em.persistAndFlush(user);
            }
            catch (err) {
                if (err.code === '23505') {
                    return {
                        errors: [{
                                field: 'username',
                                msg: 'Username already taken'
                            }]
                    };
                }
            }
            return {
                user
            };
        });
    }
    login({ em, req }, userInputs) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield em.findOne(User_1.User, {
                username: userInputs.username
            });
            if (!user) {
                return {
                    errors: [{
                            field: 'username',
                            msg: `Username doesn't exist`
                        }]
                };
            }
            const valid = yield argon2_1.default.verify(user.password, userInputs.password);
            if (!valid) {
                return {
                    errors: [{
                            field: 'password',
                            msg: `Incorrect password`
                        }]
                };
            }
            req.session.userId = user.id;
            return {
                user
            };
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => LoginResponse),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg('userInputs')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UserSignUp]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => LoginResponse),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg('userInputs')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UserSignUp]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map