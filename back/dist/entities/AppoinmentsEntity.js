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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appoinment = void 0;
const typeorm_1 = require("typeorm");
const AppoinmentInterface_1 = require("../interfaces/AppoinmentInterface");
const User_entity_1 = require("./User.entity");
let Appoinment = class Appoinment {
};
exports.Appoinment = Appoinment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Appoinment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: false }),
    __metadata("design:type", Date)
], Appoinment.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 5, nullable: false }),
    __metadata("design:type", String)
], Appoinment.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 10,
        nullable: false,
        default: AppoinmentInterface_1.Status.active,
    }),
    __metadata("design:type", String)
], Appoinment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User, user => user.appoinments, { nullable: false }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_entity_1.User)
], Appoinment.prototype, "user", void 0);
exports.Appoinment = Appoinment = __decorate([
    (0, typeorm_1.Entity)("appoinments")
], Appoinment);
