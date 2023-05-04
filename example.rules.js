const __rules = [
    {rule: "hej", marker: "greeting.hi"},
    { rule: "hejsan", marker: "greeting.hi"},
    { rule: "god dag", marker: "greetings.hi"},
    { rule: "skift", marker: "add.shift"},
    { rule: "resurs", marker: "add.resource"},
    { rule: "ja", marker: "proceed.yes"},
    { rule: "nej", marker: "proceed.no"}
    
]

const __markers = [
    { marker: "greeting.hi", answer: "Tjenare hur är läget?"},
    { marker: "greeting.hi", answer: "Hej!"},
    { marker: "greeting.hi", answer: "Hej, hur kan jag hjälpa dig idag?"},
    
    { marker: "add.shift", answer: "Vill du lägga till ett skift?", event: true},
    { marker: "add.resource", answer: "Vill du lägga till en resurs?", event: true},

    { marker: "proceed.yes", answer: "Toppen, häng kvar", event: true},
    { marker: "proceed.yes", answer: "Ok då ska jag hjälpa dig", event: true},
    { marker: "proceed.yes", answer: "Bra, vänta", event: true},

    { marker: "proceed.no", answer: "Okej, då försöker vi igen", event: true},
    { marker: "proceed.no", answer: "Förstår... kanske inte", event: true},
    { marker: "proceed.no", answer: "Hoppsan då förstod jag kanske inte", event: true},
]

export const rules = __rules;
export const markers = __markers;