"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_USERS_COLL_NAME = exports.ENV_PATH = void 0;
var path_1 = __importDefault(require("path"));
exports.ENV_PATH = path_1.default.join(__dirname, '.env');
exports.DB_USERS_COLL_NAME = 'Users';
