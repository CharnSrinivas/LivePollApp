"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("ignore-styles");
require('@babel/register')({
    ignore: [/(node_module)/],
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/typescript']
});
require("./server");
