import {createAsyncThunk} from "@reduxjs/toolkit";

const URL = 'https://www.cbr-xml-daily.ru/daily_jsonp.js';
const URLtail = '/daily_jsonp.js'
const URLarchiveHead = 'https://www.cbr-xml-daily.ru/archive/'

function cashFunction(fn) {
    const cash = {}
    return async function (n) {
        if (cash[n]) {
            return await cash[n]
        }
        let result = await fn(n)
        cash[n] = await result
        return await result;
    };
}

const cashRequest = cashFunction(request)

async function request (arg) {
    const response = await fetch(arg)
    const reader = response.body.getReader();
    let receivedLength = 0;
    const chunks = [];
    while (true) {
        const {done, value} = await reader.read();
        if (done) break
        chunks.push(value);
        receivedLength += value.length;
    }
    const chunksAll = new Uint8Array(receivedLength);
    let position = 0;
    for (let chunk of chunks) {
        chunksAll.set(chunk, position);
        position += chunk.length;
    }
    let decoded = new TextDecoder("utf-8").decode(chunksAll);
    return JSON.parse(decoded.slice(60).slice(0, -2))
}

export const daily = createAsyncThunk(
    'daily/fetch',
    async function () {
        let result = await request(URL)
        let {Valute} = result
        return {
            ...Object.keys(Valute).map((el) =>
                Object.assign(Object.assign(Valute[el], {date: result.Date}), {PreviousDate: result.PreviousDate})
            )
        }
    })

export const tenDays = createAsyncThunk(
    'tenDays/fetch',
    async function ({CharCode, date}) {
        let arrData = []
        while (arrData.length < 10) {
            let simpleDate = date.split('T').slice(0, 1)[0]
            let requestDate = simpleDate.split('-').join('/')
            let primaryRequestUrl = `${URLarchiveHead}${requestDate}${URLtail}`
            let singleRequest = await cashRequest(primaryRequestUrl)
            arrData.push(singleRequest)
            date = singleRequest.PreviousDate
        }
        return (
            arrData.map((el) => {
                return {
                    ...(Object.assign(el.Valute[CharCode],
                        {date: (el.Date).split('T').slice(0, 1)[0]}))
                }
            })
        )
    })




