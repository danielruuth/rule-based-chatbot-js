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
 *  @description An example of using regex to make a rule based chat bot
 *
 */
class Chatbot {
    constructor() {
        this.__Markers = {};
        this.__Rules = {};
        this.__Answers = {};
        this.__Manuscript = []
        this.__onScriptedThread = false;
        this.__scriptDoneCallback = null;
        this.__Options = []
    }

    set manuscript(questions){
        this.__Manuscript = questions
        this.__onScriptedThread = true
    }

    set manuscriptCallback(callback){
        this.__scriptDoneCallback = callback
    }

    set rules(rules){
        rules.forEach((rule)=>{
            this.addRule(rule.rule, rule.marker);
        })
        
    }
    set markers(markers){
        markers.forEach((answer)=>{
            this.addAnswer(answer.marker, answer.answer, answer.options || false);
        })
    }

    addRule(rule, marker) {
        this.__Markers[marker] ? this.__Markers[marker] += `|${rule}` : this.__Markers[marker] = rule;
        if(!this.__Answers[marker]) this.__Answers[marker] = Array();
    }

    addAnswer(marker, answer, options = false) {
        if(!this.__Answers[marker]) throw new Error(`Sorry '${marker} does not exist`);
        this.__Answers[marker].push(answer);
        
        if(options){
            if(!this.__Options[marker]) this.__Options[marker] = []
            this.__Options[marker].push(options)
        }
    }

    train() {
        for(let marker in this.__Markers) {
            this.__Rules[marker] = new RegExp(this.__Markers[marker], "gim");
        }

    }

    process(str) {
        if(this.__onScriptedThread && this.__Manuscript.length > 0){
            const result = this.__Manuscript.shift()

            if(this.__Manuscript.length == 0){
                this.__onScriptedThread = false;
                if(this.__scriptDoneCallback){
                    this.__scriptDoneCallback()
                }
            }
        }else{
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
                    result.options = this.__Options[marker] || false
                }
            }
            result.possibleAnswers = flattenArray(result.possibleAnswers);
            result.answer = result.possibleAnswers[randomBetween(0, result.possibleAnswers.length - 1)];
            return result;
        }
    }
}

const cbot = new Chatbot();
export const bot = cbot;
export const r = String.raw;