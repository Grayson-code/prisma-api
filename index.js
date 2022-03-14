"use strict";
// Copyright (c) 2022 Northern Star
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient();
const app = (0, express_1.default)().use(express_1.default.json());
function toJson(data) {
    if (data !== undefined) {
        let intCount = 0, repCount = 0;
        const json = JSON.stringify(data, (_, v) => {
            if (typeof v === 'bigint') {
                intCount++;
                return `${v}#bigint`;
            }
            return v;
        });
        const res = json.replace(/"(-?\d+)#bigint"/g, (_, a) => {
            repCount++;
            return a;
        });
        if (repCount > intCount) {
            // You have a string somewhere that looks like "123#bigint";
            throw new Error(`BigInt serialization conflict with a string value.`);
        }
        return res;
    }
}
app.listen(8080, () => {
    console.log('Listening on port 8080 \n App Initialized');
});
app.get('/', (req, res) => {
    res.send({
        message: 'Your Viewing Default Api gateway refer to useful gateways such as /bans/uuid/{uuid}'
    }).status(100);
});
app.get('/bans/uuid/:uuid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uuid } = req.params;
    if (!uuid) {
        return res.status(418).send({
            error: 'No UUID Defined'
        });
    }
    ;
    const datas = yield client.litebans_bans.findMany({ where: { uuid: uuid } });
    const data = toJson(datas);
    if (!data[0].id) {
        res.status(205).send({
            error: 'Couldnt find any bans with the uuid of ' + uuid
        });
    }
    else {
        res.status(200).send(data);
    }
}));
app.get('/kicks/uuid/:uuid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uuid } = req.params;
    if (!uuid) {
        return res.status(418).send({
            error: 'No UUID Defined'
        });
    }
    ;
    const datas = yield client.litebans_kicks.findMany({ where: { uuid: uuid } });
    const data = toJson(datas);
    if (!data[0].id) {
        res.status(205).send({
            error: 'Couldnt find any kicks with the uuid of ' + uuid
        });
    }
    else {
        res.status(200).send(data);
    }
}));
app.get('/warns/uuid/:uuid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uuid } = req.params;
    if (!uuid) {
        return res.status(418).send({
            error: 'No UUID Defined'
        });
    }
    ;
    const datas = yield client.litebans_warnings.findMany({ where: { uuid: uuid } });
    const data = toJson(datas);
    if (!data[0].id) {
        res.status(205).send({
            error: 'Coudnt find any warnings with the uuid of ' + uuid
        });
    }
    else {
        res.status(200).send(data);
    }
    ;
}));
app.get('/mutes/uuid/:uuid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uuid } = req.params;
    if (!uuid) {
        return res.status(418).send({
            error: 'No UUID Defined'
        });
    }
    ;
    const datas = yield client.litebans_mutes.findMany({ where: { uuid: uuid } });
    const data = toJson(datas);
    if (!data[0].id) {
        res.status(205).send({
            error: 'Couldnt find any mutes with the uuid of ' + uuid
        });
    }
    else {
        res.status(200).send(data);
    }
    ;
}));
