// Copyright (c) 2022 Northern Star
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import express, { request } from 'express'
import { prisma, PrismaClient } from '@prisma/client';
const client = new PrismaClient()
const app = express().use(express.json())

function toJson(data: object) {
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

app.get('/bans/uuid/:uuid', async (req, res) => {
    const { uuid } = req.params;
    if (!uuid) {
        return res.status(418).send({
            error: 'No UUID Defined'
        });
    };

    const datas = await client.litebans_bans.findMany({ where: { uuid: uuid } })
    const data: any = toJson(datas);

    if (!data[0].id) {
        res.status(205).send({
            error: 'Couldnt find any bans with the uuid of ' + uuid
        });
    } else {
        res.status(200).send(data)
    }

})
app.get('/kicks/uuid/:uuid', async (req, res) => {
    const { uuid } = req.params;
    if (!uuid) {
        return res.status(418).send({
            error: 'No UUID Defined'
        });
    };
    const datas = await client.litebans_kicks.findMany({ where: { uuid: uuid } });
    const data: any = toJson(datas);

    if (!data[0].id) {
        res.status(205).send({
            error: 'Couldnt find any kicks with the uuid of ' + uuid
        });
    } else {
        res.status(200).send(data)
    }
})

app.get('/warns/uuid/:uuid', async (req, res) => {
    const { uuid } = req.params;
    if (!uuid) {
        return res.status(418).send({
            error: 'No UUID Defined'
        });
    };
    const datas = await client.litebans_warnings.findMany({ where: { uuid: uuid } });
    const data:any = toJson(datas);

    if (!data[0].id) {
        res.status(205).send({
            error: 'Coudnt find any warnings with the uuid of ' + uuid
        });
    } else {
        res.status(200).send(data)
    };
});

app.get('/mutes/uuid/:uuid', async (req, res) => {
    const { uuid } = req.params;
    if (!uuid) {
        return res.status(418).send({
            error: 'No UUID Defined'
        });
    };
    const datas = await client.litebans_mutes.findMany({ where: { uuid: uuid } });
    const data:any = toJson(datas);

    if (!data[0].id) {
        res.status(205).send({
            error: 'Couldnt find any mutes with the uuid of ' + uuid
        });
    } else {
        res.status(200).send(data);
    };
});