"use strict";

const readline = require("readline");
const chalk = require("chalk");

const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Utilities
function input(self, str = "> ") {
    prompt.question(str, (value) => {
        const result = self.process(value);
        if(result.answer) {
            process.stdout.write(chalk.yellow(result.answer) + "\n");
            if(value.includes("hejdå")) {
                prompt.close();
                process.exit();
            }
            input(self, str);
        } else {
            process.stdout.write("Förlåt men jag förstår dig inte, kan du omformulera dig?" + "\n");
            input(self, str);
        }
    });
    // prompt.close();
}

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function flattenArray(arr) {
    let result = [];
    arr.forEach(i => {
        if(!Array.isArray(i)) {
            result.push(i);
        } else {
            result.push(...flattenArray(i));
        }
    });
    return result;
};
function processData(match, templates) {
    const newTemp = templates.map(template => {
        for(let i = 1; i < match.length; i++) {
            template = template.replace(`%${i}`, match[i]);
        }
        return template;
    });
    return newTemp;
}

/**
 *  @description A simple example of nlp functions for building chatbots
 *
 */


class Simple_Nlp {
    constructor() {
        this.__Markers = Object.create(null);
        this.__Rules = Object.create(null);
        this.__Answers = Object.create(null);
        this.__Events = Object.create(null);

        // Bind methods
        this.addRule = this.addRule.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.train = this.train.bind(this);
        this.process = this.process.bind(this);
        this.converse = this.converse.bind(this);
    }

    // Use String.raw to create string using
    addRule(rule, marker) {
        this.__Markers[marker] ? this.__Markers[marker] += `|${rule}` : this.__Markers[marker] = rule;
        if(!this.__Answers[marker]) this.__Answers[marker] = Array();
    }

    addAnswer(marker, answer, event = false) {
        if(!this.__Answers[marker]) throw new Error(`Sorry '${marker} does not exist`);
        this.__Answers[marker].push(answer);
        if(event){
            this.__Events[marker].push(marker)
        }
    }

    train() {
        for(let marker in this.__Markers) {
            this.__Rules[marker] = new RegExp(this.__Markers[marker], "gim");
        }

    }

    process(str) {
        const result = Object.create(null);
        result.utterance = str;
        result.possibleAnswers = Array();
        result.classifications = Object.create(null);
        for(let marker in this.__Rules) {
            // let match = str.match(this.__Rules[marker]);
            let match = this.__Rules[marker].exec(str);
            if(match) {
                result.classifications[marker] = match;
                result.possibleAnswers.push(processData(match, this.__Answers[marker]))
                //Cast an event
                if(this.__Events[marker]){
                    console.log('Dispatching event')
                    dispatchEvent(`on${this.__Events[marker]}`)
                }
            }
        }
        result.possibleAnswers = flattenArray(result.possibleAnswers);
        result.answer = result.possibleAnswers[randomBetween(0, result.possibleAnswers.length - 1)];
        return result;
    }

    converse() {
        input(this);
    }
}

const nlp = new Simple_Nlp();
module.exports = {
    bot: nlp,
    r: String.raw
};