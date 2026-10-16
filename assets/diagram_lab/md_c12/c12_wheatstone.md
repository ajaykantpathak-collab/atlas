# The Wheatstone bridge — precision resistance by balance

> source: Wheatstone bridge with strain gauges (Wikimedia Commons, CC BY-SA 4.0)
> subject: physics

## parts
- id: r1 | label: R1 (compression) | x: 0.400 | y: 0.200 | r: 0.055 | fn: top-left arm — one of the ratio pair
- id: r4 | label: R4 (tension) | x: 0.650 | y: 0.200 | r: 0.055 | fn: top-right arm — the unknown being measured
- id: r2 | label: R2 (tension) | x: 0.400 | y: 0.650 | r: 0.055 | fn: bottom-left arm — balances R1
- id: r3 | label: R3 (compression) | x: 0.650 | y: 0.650 | r: 0.055 | fn: bottom-right arm — balances R4
- id: vex | label: Excitation V_EX | x: 0.150 | y: 0.400 | r: 0.060 | fn: the battery driving the bridge
- id: vout | label: Output V_0 | x: 0.520 | y: 0.400 | r: 0.050 | fn: the middle gap — zero when balanced
- id: gauges | label: Strain gauges | x: 0.850 | y: 0.300 | r: 0.060 | fn: the sensors — resistance shifts with stretch
- id: balance | label: Balance condition | x: 0.520 | y: 0.850 | r: 0.055 | fn: R1/R2 = R4/R3 — the null point

## explain
Four resistors in a diamond, a battery across one diagonal, a meter across the other. When R1/R2 equals R4/R3, the meter reads zero — the bridge is balanced, and you can solve for the unknown arm precisely. Strain gauges exploit it: stretch changes resistance, unbalances the bridge, and the output voltage reads the strain directly.

## exam
- Tap the meter reading zero when balanced
- Tap the battery driving the diamond
- Tap the sensors converting stretch to resistance
- Tap the ratio the balance solves for
