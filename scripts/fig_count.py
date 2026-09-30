import re, glob, collections, os
os.chdir('D:/_KEEP/text_cache_new')

SUBJ = {'sc':'Science','cu':'Science (Curiosity)','es':'Social Science','st':'Social Science','ss':'Social Science',
        'bo':'Biology','bt':'Biotechnology','ch':'Chemistry','ph':'Physics','ma':'Maths','mh':'Maths','em':'Maths',
        'gy':'Geography','gp':'Geography(Practical)','hi':'History','ps':'Political Sci','ec':'Economics',
        'ac':'Accountancy','bs':'Business','so':'Sociology','hs':'Home Science','cs':'Computer Sci','ip':'IP',
        'py':'Psychology','en':'English','he':'English (Elective)','hn':'Hindi','vt':'Hindi','at':'Hindi',
        'sp':'Hindi','ks':'Hindi','ga':'Hindi','ar':'Hindi','ur':'Urdu','sk':'Sanskrit','ep':'English',
        'ed':'Education','pa':'Painting','mu':'Music','kl':'Kala','fa':'Fine Arts','hp':'Heritage Crafts','pe':'Physical Ed'}
BAND = {'j':10,'i':9,'k':11,'l':12,'f':6,'e':7,'h':8,'g':7,'m':5,'n':4,'o':3,'p':2,'q':1}

by_subj = collections.defaultdict(set)
by_cls = collections.defaultdict(set)
for f in glob.glob('*.txt'):
    fn = os.path.basename(f)
    if fn.startswith('am1'):
        subj, cls = 'Applied Maths', '11-12'
    else:
        code = re.match(r'([a-z]+)\d', fn)
        if not code:
            continue
        letters = code.group(1)
        band, sub = letters[0], letters[1:]
        subj = SUBJ.get(sub, SUBJ.get(sub[-2:], sub))
        cls = str(BAND.get(band, '?'))
    txt = open(f, encoding='utf-8', errors='ignore').read()
    figs = set(re.findall(r'(?:Figure|Fig\.?)\s*(\d+\.\d+)', txt))
    for n in figs:
        by_subj[subj].add((fn, n))
        by_cls[cls + '|' + subj].add((fn, n))

tot = 0
print('UNIQUE FIGURES NEEDED - BY SUBJECT')
for s, st in sorted(by_subj.items(), key=lambda x: -len(x[1])):
    print('  %-22s %d' % (s, len(st)))
    tot += len(st)
print('TOTAL:', tot)
print()
cl = collections.Counter()
for k, st in by_cls.items():
    cl[k.split('|')[0]] += len(st)
print('BY CLASS:')
for c in sorted(cl, key=lambda x: (len(x), x)):
    print('  class %s: %d' % (c, cl[c]))
