/** Career lens — every subject answers "who actually uses this?"
 *  NEP vocational exposure: purpose is the strongest motivator. */
export const CAREER_LENS: [RegExp, { who: string; does: string }[]][] = [
    [/phys|electric|optic|mechanic/i, [
        { who: 'EV battery engineer', does: 'designs the cells your future car runs on' },
        { who: 'Sound engineer', does: 'shapes the acoustics of every concert you will ever attend' },
        { who: 'ISRO mission designer', does: 'puts satellites in orbit with the math you just did' },
        { who: 'MRI physicist', does: 'uses fields and resonance to see inside bodies' },
    ]],
    [/chem|react|compound|acid/i, [
        { who: 'Pharmacologist', does: 'designs the medicine that saved someone you know' },
        { who: 'Battery chemist', does: 'invents the next decade of energy storage' },
        { who: 'Food scientist', does: 'makes your favourite snacks shelf-stable and safe' },
        { who: 'Forensic analyst', does: 'solves crimes with a test tube' },
    ]],
    [/bio|life|cell|plant|animal|genet/i, [
        { who: 'Epidemiologist', does: 'tracks the next outbreak before it starts' },
        { who: 'Genetic counsellor', does: 'helps families read their own DNA' },
        { who: 'Marine biologist', does: 'dives to study the 80% of ocean life we have not named' },
        { who: 'Sports physiologist', does: 'engineers the bodies of Olympic athletes' },
    ]],
    [/math|algebra|geometr|stat|prob|calc/i, [
        { who: 'Game developer', does: 'every jump, every light, every world runs on this math' },
        { who: 'Quant trader', does: 'prices risk in milliseconds' },
        { who: 'AI researcher', does: 'trains the models that answer your questions' },
        { who: 'Data journalist', does: 'finds the story hiding inside the numbers' },
    ]],
    [/hist|ancient|empire|war|civiliz/i, [
        { who: 'Archaeologist', does: 'digs up the past and rewrites the textbook' },
        { who: 'Policy analyst', does: 'stops governments from repeating old mistakes' },
        { who: 'Museum curator', does: 'decides what the next generation gets to see' },
    ]],
    [/geo|earth|climate|soil|map/i, [
        { who: 'Climate scientist', does: 'models the planet your children will inherit' },
        { who: 'Urban planner', does: 'designs the city you will live in' },
        { who: 'GIS specialist', does: 'maps everything from floods to food delivery' },
    ]],
    [/eco|business|account|market|money/i, [
        { who: 'Economist', does: 'advises the country on what to fix next' },
        { who: 'Startup founder', does: 'turns an idea into jobs for a thousand people' },
        { who: 'Behavioural economist', does: 'explains why you bought that thing you did not need' },
    ]],
    [/civ|pol|gov|democra|law/i, [
        { who: 'Civil servant (IAS/IPS)', does: 'runs the district you live in' },
        { who: 'Constitutional lawyer', does: 'defends the rights you learned about today' },
        { who: 'Political strategist', does: 'reads the country better than anyone' },
    ]],
    [/comp|cs|ip|inform|code|program/i, [
        { who: 'Software engineer', does: 'built the app you are using right now' },
        { who: 'Security researcher', does: 'keeps your data out of the wrong hands' },
        { who: 'Game engine programmer', does: 'writes the physics your favourite world runs on' },
    ]],
    [/eng|hindi|urdu|sanskr|lang|liter/i, [
        { who: 'Screenwriter', does: 'writes the shows you binge' },
        { who: 'Translator', does: 'carries ideas between 22 official languages' },
        { who: 'UX writer', does: 'chooses the exact words in every app you open' },
    ]],
    [/soc|psy|hs|home/i, [
        { who: 'Counselling psychologist', does: 'helps people survive their hardest week' },
        { who: 'Social researcher', does: 'measures what society actually does, not what it says' },
        { who: 'Nutritionist', does: 'designs what a champion eats' },
    ]],
];

export function careersFor(subject: string) {
    return CAREER_LENS.find(([re]) => re.test(subject))?.[1] ?? [
        { who: 'Problem solver', does: 'uses exactly this kind of thinking every day' },
    ];
}
