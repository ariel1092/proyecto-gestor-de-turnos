"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_entity_1 = require("../entities/User.entity");
const data_source_1 = require("../config/data-source");
exports.UserRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
