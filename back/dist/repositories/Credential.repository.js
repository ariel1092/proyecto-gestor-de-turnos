"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialRepository = void 0;
const data_source_1 = require("../config/data-source");
const Credentials_1 = require("../entities/Credentials");
exports.CredentialRepository = data_source_1.AppDataSource.getRepository(Credentials_1.Credential);
