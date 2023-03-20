#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printHelp, printSuccess, printError, printWeather } from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from "./services/storage.service.js";
import { getWeather, getIcon } from "./services/api.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError('no token passed');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('token saved');
    } catch (e) {
        printError(e.message);
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError('no city passed');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('City saved');
    } catch (e) {
        printError(e.message);
    }
}

const getForcast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
        const weather = await getWeather(city);
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch (e) {
        if (e?.response?.status === 404) {
            printError('Invalid city');
        } else if (e?.response?.status === 401) {
            printError('Invalid token');
        } else {
            printError(e.message);
        }
    }
}

const cliInit = () => {
    const args = getArgs(process.argv);
    console.log('args', args);
    if(args.h) {
        printHelp();
    }
    if(args.s) {
        return saveCity(args.s);
    }
    if(args.t) {
        return saveToken(args.t);
    }
    return getForcast();
};

cliInit();