import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
	console.log(chalk.bgRed(' Error ') + ' ' + error);
};

const printSuccess = (message) => {
	console.log(chalk.bgGreen(' Success ') + ' ' + message);
};

const printHelp = () => {
	console.log(
		dedent`${chalk.bgCyan(' Help ')}
		no params - output weather
		-s [CITY] to set the city
		-h to show help
		-t [API_KEY] to save the token
		`
	);
};

const printWeather = (res, icon) => {
	console.log(
		dedent`${chalk.bgYellow(' Weather ')} City weather ${res.name}
		${icon}  ${res.weather[0].description}
		Temperature: ${res.main.temp} (feels like ${res.main.feels_like})
		Humidity: ${res.main.humidity}%
		Wind speed: ${res.wind.speed}
		`
	);
};

export { printError, printSuccess, printHelp, printWeather };