import re, glob, collections

PRED = {
 'market':   ("If demand shifts right while supply stays put - what happens to the equilibrium price?",
              ["It rises","It falls","Nothing changes","The curves uncross"], "It rises"),
 'ledger':   ("A firm pays Rs.3,000 rent in cash - which journal entry is correct?",
              ["Debit Rent, Credit Cash","Debit Cash, Credit Rent","Debit Capital, Credit Rent","Only debit Cash"], "Debit Rent, Credit Cash"),
 'maplab':   ("Scrubbing Maurya to British Raj - what happens to empire extent overall?",
              ["It grows over time","It shrinks steadily","It stays identical","It drops to zero"], "It grows over time"),
 'election': ("A party wins 60% of votes - what happens to its seats?",
              ["It forms government alone","It needs a coalition","It gets no seats","Seats split equally"], "It forms government alone"),
 'demograph':("A pyramid that is narrow at the bottom signals...",
              ["an aging population","a young population","equal age groups","zero workers"], "an aging population"),
 'sampler':  ("After 500 coin flips, the heads proportion settles closest to...",
              ["50%","25%","90%","it stays random"], "50%"),
 'codeflow': ("Trace the loop mentally - after it ends, sum equals...",
              ["15","10","5","25"], "15"),
 'writer':   ("In a formal letter, what costs the most marks if missing?",
              ["format elements - date, subject, salutation","fancy vocabulary","very long paragraphs","coloured ink"], "format elements - date, subject, salutation"),
 'projectile':("At the same speed, which launch angle throws furthest?",
              ["about 45 deg","about 20 deg","about 70 deg","90 deg straight up"], "about 45 deg"),
 'lens':     ("Move the object closer than the focal length - the image...",
              ["flips and magnifies","stays the same","disappears fully","inverts and shrinks"], "flips and magnifies"),
 'wave':     ("Double the frequency, keep amplitude - what happens to the wave?",
              ["more waves per second","taller waves","slower waves","no change"], "more waves per second"),
 'titrate':  ("Near the equivalence point, one drop of titrant causes...",
              ["a huge pH jump","no change","a tiny pH nudge","the curve to flatten"], "a huge pH jump"),
 'unitcircle':("At 90 deg, sin theta reaches...",
              ["its maximum 1","zero","negative 1","0.5"], "its maximum 1"),
 'gas':      ("Compress the piston with temperature fixed - particle behaviour...",
              ["collisions get more frequent","particles shrink","motion stops","volume grows"], "collisions get more frequent"),
 'equilibrium':("Add more reactant - the system responds by...",
              ["making more product","stopping the reaction","absorbing all of it","nothing"], "making more product"),
 'graph':    ("Increase slope m - the line...",
              ["tilts steeper","shifts up parallel","flattens","stays put"], "tilts steeper"),
 'circuit':  ("Raise the voltage with resistance fixed - the bulb...",
              ["glows brighter","dims","stays the same","flickers"], "glows brighter"),
 'supply':   ("Supply shifts right at fixed demand - the equilibrium price...",
              ["falls","rises","doubles","stays"], "falls"),
 'pendulum': ("A longer pendulum swings...",
              ["slower - longer period","faster","the same","randomly"], "slower - longer period"),
 'heart':    ("Raising the heart rate above 120 bpm - the ECG trace...",
              ["compresses in time","disappears","flattens","slows"], "compresses in time"),
 'orbit':    ("More orbital speed - the planet...",
              ["reaches a higher orbit","falls inward","stops","spins faster"], "reaches a higher orbit"),
 'atom':     ("Adding electrons fills shells...",
              ["in order, inner first","outer shell first","randomly","all at once"], "in order, inner first"),
 'dna':      ("Unzip the helix - the bases pair as...",
              ["A-T and G-C","A-G and T-C","A-A and T-T","random pairs"], "A-T and G-C"),
 'ph':       ("Slide the probe left of 7 - the solution is...",
              ["acidic","basic","neutral","metallic"], "acidic"),
 'cell':     ("Zoom in - which organelle makes the cell a PLANT cell?",
              ["chloroplasts","the nucleus","ribosomes","the membrane"], "chloroplasts"),
 'nephron':  ("More filtration flow - what crosses into the tubule?",
              ["water and small solutes","blood cells","proteins","nothing"], "water and small solutes"),
 'digest':   ("As food travels the tract, most nutrients are absorbed...",
              ["in the small intestine","in the stomach","in the mouth","in the large intestine"], "in the small intestine"),
 'mitosis':  ("Before a cell divides, it first...",
              ["copies its chromosomes","splits in half","loses its nucleus","grows a wall"], "copies its chromosomes"),
 'efield':   ("Two same-sign charges brought closer - they...",
              ["repel harder","attract","cancel out","orbit"], "repel harder"),
 'emag':     ("Move the magnet faster through the coil - induced EMF...",
              ["increases","decreases","stays","reverses sign only"], "increases"),
 'vector':   ("Adding two vectors tip-to-tail gives...",
              ["the resultant","the difference","a scalar","the unit vector"], "the resultant"),
 'conic':    ("Tilt the slicing plane - the cross-section changes...",
              ["circle to ellipse to parabola to hyperbola","stays a circle","becomes a square","vanishes"], "circle to ellipse to parabola to hyperbola"),
 'molecule': ("Adding atoms to the chain - the molecule...",
              ["grows while keeping bonds","breaks apart","loses atoms","stays flat"], "grows while keeping bonds"),
 'solid':    ("Double the radius - the cylinder volume...",
              ["grows 4x","grows 2x","stays","grows 8x"], "grows 4x"),
 'moon':     ("The lit fraction we see depends on...",
              ["the moon position vs sun and earth","the season","the tides","latitude only"], "the moon position vs sun and earth"),
 'spectrum': ("Moving toward gamma - wavelength...",
              ["shrinks, energy rises","grows","stays","becomes visible"], "shrinks, energy rises"),
 'globe':    ("The seasons exist mainly because of...",
              ["the tilted axis","distance to sun","ocean currents","moon phases"], "the tilted axis"),
 'reflex':   ("A reflex arc is fast because it...",
              ["skips the brain via the spinal cord","uses blood","thinks first","is learned"], "skips the brain via the spinal cord"),
 'timeline': ("Scrubbing forward - the events appear...",
              ["in chronological order","randomly","alphabetically","by size"], "in chronological order"),
 'flow':     ("Each stage feeds the next - skipping one...",
              ["breaks the process","is fine","speeds it up","does nothing"], "breaks the process"),
 'pour':     ("Fill past the mark - the liquid...",
              ["overflows","evaporates","freezes","compresses"], "overflows"),
 'grow':     ("Sun + water together - the plant grows...",
              ["faster than either alone","slower","not at all","backwards"], "faster than either alone"),
 'balance':  ("The heavier side goes...",
              ["down","up","nowhere","sideways"], "down"),
 'fraction': ("Shade 3 of 4 parts - that is...",
              ["three quarters","one half","one third","a whole"], "three quarters"),
 'jump':     ("Hops of equal size land on...",
              ["multiples of the hop size","random numbers","only evens","fractions"], "multiples of the hop size"),
 'weigh':    ("Slide more grams - the scale reads...",
              ["the total mass","half the mass","zero","density"], "the total mass"),
 'electric': ("Enough power - the bulb...",
              ["lights up","explodes","cools down","buzzes"], "lights up"),
 'stretch':  ("Stretch the tape along the bar - you are measuring...",
              ["its length","its weight","its colour","its speed"], "its length"),
 'cycle':    ("Sun heat + time - the water...",
              ["evaporates, then rains","freezes","disappears","boils dry instantly"], "evaporates, then rains"),
 'prism':    ("White light through the prism...",
              ["splits into the spectrum","stays white","turns black","reflects back"], "splits into the spectrum"),
}

def esc(s):
    return s.replace("'", "\\'")

done = collections.Counter(); skipped = []
for f in glob.glob('class*/v3/*.ts'):
    src = open(f, encoding='utf-8').read()
    wm = re.search(r"widget: '(\w+)'", src)
    if not wm:
        skipped.append(f); continue
    w = wm.group(1)
    tpl = PRED.get(w)
    if not tpl:
        skipped.append(f); continue
    q, opts, ans = tpl
    opts_js = '[' + ', '.join("'%s'" % esc(o) for o in opts) + ']'
    pred = ("predict: { question: '%s', options: %s, answer: '%s', "
            "verifyWidget: '%s', verifyPrompt: 'Now try it - was your prediction right?' }"
            % (esc(q), opts_js, esc(ans), w))
    if re.search(r"predict: \{[^\n]*\}", src):
        src = re.sub(r"predict: \{[^\n]*\}", pred, src, count=1)
    else:
        ins = None
        for anchor in ['    beats: [', '    challenges: [', '    explore:']:
            i = src.find(anchor)
            if i > 0:
                ins = i
                break
        if ins is None:
            skipped.append(f); continue
        src = src[:ins] + '    ' + pred + ',\n' + src[ins:]
    open(f, 'w', encoding='utf-8').write(src)
    done[w] += 1

print('predict injected per widget:', dict(done.most_common()))
print('total injected:', sum(done.values()))
print('skipped:', len(skipped))
