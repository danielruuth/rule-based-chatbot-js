import {bot} from "./simple-nlp"
const {rules, markers} = require("./rules");

rules.forEach((rule)=>{
    bot.addRule(rule.rule, rule.marker);
})
markers.forEach((answere)=>{
    bot.addAnswer(answere.marker, answere.answer);
})

bot.train();

module.exports = bot;