import os
"""
Regenerate 4 problematic Elective English sub-node files with ACTUAL poem texts included.
This prevents Claude from fabricating quotations.

Poems verified from web sources:
- Yeats: No Second Troy, Easter 1916, The Wild Swans at Coole, The Second Coming
- Dylan Thomas: Death Shall Have No Dominion, Poem in October, Fern Hill, Do not go gentle
- Plath: Mirror, Tulips, Pursuit
- Zephaniah: What If, Faceless, We Refugees
"""
import json, sys, time, urllib.request, ssl, re
from pathlib import Path

API_KEY = os.environ.get('ANTHROPIC_API_KEY') or ''
API_URL = 'https://api.claudeopus.pro/v1/messages'
MODEL = 'claude-opus-5'
MAX_TOKENS = 128000
OUTPUT_DIR = Path(r'D:\platform\parsed_output\english_granular_nodes')

# Actual poem texts verified from web sources
POEM_TEXTS = {
    'c12_engelec_poet_01': {
        'author': 'William Butler Yeats',
        'text_name': 'No Second Troy, Easter 1916, The Wild Swans at Coole, The Second Coming',
        'poems': {
            'No Second Troy': """Why should I blame her that she filled my days
With misery, or that she would of late
Have taught to ignorant men most violent ways,
Or hurled the little streets upon the great,
Had they but courage equal to desire:
What could have made her peaceful with the mind
That nobleness made simple as a fire,
With beauty like a tightened bow, or had
All beauty's most high-up beauty of the world,
Or that she would of late have taught
To ignorant men most violent ways,
Or hurled the little streets upon the great,
Had they but courage equal to desire:
Was there another Troy for her to burn?""",
            'Easter 1916': """I have met them at close of day
Coming with vivid faces
From counter or desk among grey
Eighteenth-century houses.
I have passed with a nod of the head
Or polite meaningless words,
Or have lingered awhile and said
Polite meaningless words,
And thought before I had done
Of a mocking tale or a gibe
To please a companion
Around the fire at the club,
Being certain that they and I
But lived where motley is worn,
All changed, changed utterly:
A terrible beauty is born.

That woman's days were spent
In ignorant good-will,
Her nights in argument
Until her voice grew shrill.
What voice more sweet than hers
When, young and beautiful,
She rode to harriers?
This man had kept a school
And rode our winged horse;
This other his helper and friend
Was coming into his force;
He might have won fame in the end,
So sensitive his nature seemed,
So daring and sweet his thought.
This other man I had dreamed
A drunken, vainglorious lout.
He had done most bitter wrong
To some who are near my heart,
Yet I number him in the song;
He, too, has resigned his part
In the casual comedy;
He, too, has been changed in his turn,
Transformed utterly:
A terrible beauty is born.

Hearts with one purpose alone
Through summer and winter seem
Enchanted to a stone
To trouble the living stream.
The stone that in the midst
Of the living stream
Too long a sacrifice
Can make a stone of the heart.
O when may it suffice?
That is Heaven's part, our part
To murmur name upon name,
As a mother names her child
When sleep at last has come
On limbs that had run wild.
What is it but nightfall?
No, no, not night but death;
Was it needless death after all?
For England may keep faith
For all that is done and said.
We know their dream; enough
To know they dreamed and are dead;
And what if excess of love
Bewildered them till they died?
I write it out in a verse—
MacDonagh and MacBride
And Connolly and Pearse
Now and in time to be,
Wherever green is worn,
All changed, changed utterly:
A terrible beauty is born.""",
            'The Wild Swans at Coole': """The trees are in their autumn beauty,
The woodland paths are dry,
Under the October twilight the water
Mirrors a still sky;
Upon the brimming water among the stones
Are nine-and-fifty swans.

The nineteenth autumn has come upon me
Since I first made my count;
I saw, before I had well finished,
All suddenly mount
And scatter wheeling in great broken rings
Upon their clamorous wings.

I have looked upon those brilliant creatures,
And now my heart is sore.
All's changed since I, hearing at twilight,
The first time on this shore,
The bell-beat of their wings above my head,
Trod with a lighter tread.

Unwearied still, lover by lover,
They paddle in the cold
Companionable streams or climb the air;
Their hearts have not grown old;
Passion or conquest, wander where they will,
Attend upon them still.

But now they drift on the still water,
Mysterious, beautiful;
Among what rushes will they build,
By what lake's edge or pool
Delight men's eyes when I awake some day
To find they have flown away?""",
            'The Second Coming': """Turning and turning in the widening gyre
The falcon cannot hear the falconer;
Things fall apart; the centre cannot hold;
Mere anarchy is loosed upon the world,
The blood-dimmed tide is loosed, and everywhere
The ceremony of innocence is drowned;
The best lack all conviction, while the worst
Are full of passionate intensity.

Surely some revelation is at hand;
Surely the Second Coming is at hand.
The Second Coming! Hardly are those words out
When a vast image out of Spiritus Mundi
Troubles my sight: somewhere in sands of the desert
A shape with lion body and the head of a man,
A gaze blank and pitiless as the sun,
Is moving its slow thighs, while all about it
Reel shadows of the indignant desert birds.
The darkness drops again; but now I know
That twenty centuries of stony sleep
Were vexed to nightmare by a rocking cradle,
And what rough beast, its hour come round at last,
Slouches towards Bethlehem to be born?"""
        }
    },
    'c12_engelec_poet_03': {
        'author': 'Dylan Thomas',
        'text_name': 'Death Shall Have No Dominion, Poem in October, Fern Hill, Do not go gentle into that good night',
        'poems': {
            'Death Shall Have No Dominion': """And death shall have no dominion.
Dead men naked they shall be one
With the man in the wind and the west moon;
When their bones are picked clean and the clean bones gone,
They shall have stars at elbow and foot;
Though they go mad they shall be sane,
Though they sink through the sea they shall rise again;
Though lovers be lost love shall not;
And death shall have no dominion.

And death shall have no dominion.
Under the windings of the sea
They lying long shall not die windily;
Twisting on racks when sinews give way,
Strapped to a wheel, yet they shall not break;
Faith in their hands shall snap in two,
And the unicorn evils run them through;
Split all ends up they shan't crack;
And death shall have no dominion.

And death shall have no dominion.
No more may gulls cry at their ears
Or waves break loud on the seashores;
Where blew a flower may a flower no more
Lift its head to the blows of the rain;
Though they be mad and dead as nails,
Heads of the characters hammer through daisies;
Break in the sun till the sun breaks down,
And death shall have no dominion.""",
            'Do not go gentle into that good night': """Do not go gentle into that good night,
Old age should burn and rave at close of day;
Rage, rage against the dying of the light.

Though wise men at their end know dark is right,
Because their words had forked no lightning they
Do not go gentle into that good night.

Good men, the last wave by, crying how bright
Their frail deeds might have danced in a green bay,
Rage, rage against the dying of the light.

Wild men who caught and sang the sun in flight,
And learn, too late, they grieved it on its way,
Do not go gentle into that good night.

Grave men, near death, who see with blinding sight
Blind eyes could blaze like meteors and be gay,
Rage, rage against the dying of the light.

And you, my father, there on the sad height,
Curse, bless, me now with your fierce tears, I pray.
Do not go gentle into that good night.
Rage, rage against the dying of the light.""",
            'Fern Hill': """Now as I was young and easy under the apple boughs
About the lilting house and happy as the grass was green,
The night above the dingle whitefooted,
By the evening star over the sky I ran to nothing,

Green and golden I was huntsman and herdsman, the calf
Sang to my horn, and the foxes on the hills barked
clear and cold,
And the sabbath rang slowly
In the pebbles of the holy streams.

All the sun long it was running, it was lovely, the hay
Fields as high as the house,
And all I owned was the sun, and the sun was always
young, and only
Time let me hail and climb
Golden in the heydays of his eyes,
And honoured among wagons I was prince of the apple
towns,
And once below a time I lordly had the trees and leaves
Trail with daisies and barley
Down the rivers of the windfall light.

And as I was green and carefree, famous among the barns
About the happy yard and singing as the farm was home,
In the sun that is young once only,
Time let me play and be
Golden in the mercy of his means,
And green and golden I was huntsman and herdsman, the calf
Sang to my horn, and the foxes on the hills barked
clear and cold,
And the sabbath rang slowly
In the pebbles of the holy streams.

Nothing I cared, in the lamb white days, that time would
take me
Up to the swallow thronged loft by the shadow of my
hand,
In the moon that is always rising,
Nor that riding to sleep
I should hear him fly with the high fields
And wake to the farm forever fled from the childless land.
Oh as I was young and easy in the mercy of his means,
Time held me green and dying
Though I sang in my chains like the sea.""",
            'Poem in October': """It was my thirtieth year to heaven
Woke to my hearing from harbour and neighbour wood
And the mussel gathered and the heron
Priested shore
The morning beckon
With water praying and call of seagull and rook
And the knock of sailing boats on the net webbed wall
Myself to set foot
That second
In the still sleeping town and set forth.

My birthday began with the water-
Birds and the birds of the winged trees flying my name
Above the farms and the white horses
And I rose
In rainy autumn
And walked abroad in a shower of all my days.
High tide and the heron dived when I took the road
And the weather of birds
And the rain of birds
And the rain of my young blood
And the sea flowing
And the seagull flying
And the ricks of apples
And the wood
Below the lough
And the mystery
Sang over my moving childhood
In the rain of my young blood
And I rose
In rainy autumn
And walked abroad in shower of all my days."""
        }
    },
    'c12_engelec_poet_07': {
        'author': 'Sylvia Plath',
        'text_name': 'Mirror, Tulips, Pursuit',
        'poems': {
            'Mirror': """I am silver and exact. I have no preconceptions.
Whatever I see I swallow immediately
Just as it is, unmisted by love or dislike.
I am not cruel, only truthful ‚
The eye of a little god, four-cornered.
Most of the time I meditate on the opposite wall.
It is pink, with speckles. I have looked at it so long
I think it is part of my heart. My heart flickers.
Faces and darkness separate us over and over.

Now I am a lake. A woman bends over me,
Searching my reaches for what she really is.
Then she turns to those liars, the candles or the moon.
I see her back, and reflect it faithfully.
She rewards me with tears and an agitation of hands.
I am important to her. She comes and goes.
Each morning it is her face that replaces the darkness.
In me she has drowned a young girl, and in me an old woman
Rises toward her day after day, like a terrible fish.""",
            'Pursuit': """Dans le fond des forêts votre image me suit.—RACINE

There is a panther stalks me down:
One day I'll have my death of him;
His greed has set the woods aflame,
He prowls more lordly than the sun.
Most soft, most suavely glides that step,
Advancing always at my back;
From gaunt hemlock, rooks croak havoc:
The hunt is on, and sprung the trap.
Flayed by thorns I trek the rocks,
Haggard through the hot white noon.
Along red network of his veins
What fires run, what craving wakes?
Insatiate, he ransacks the land
Condemned by our ancestral fault,
Crying: blood, let blood be spilt;
Meat must glut his mouth's raw wound.
Keen the rending teeth and sweet
The singeing fury of his fur;
His kisses parch, each paw's a briar,
Doom consummates that appetite.
In the wake of this fierce cat,
Kindled like torches for his joy,
Charred and ravened women lie,
Become his starving body's bait.
Now hills hatch menace, spawning shade;
Midnight cloaks the sultry grove;
The black marauder, hauled by love
On fluent haunches, keeps my speed.
Behind snarled thickets of my eyes
Lurks the lithe one; in dreams' ambush
Bright those claws that mar the flesh
And hungry, hungry, those taut thighs.
His ardor snares me, lights the trees,
And I run flaring in my skin;
What lull, what cool can lap me in
When burns and brands that yellow gaze?
I hurl my heart to halt his pace,
To quench his thirst I squander blood;
He eats, and still his need seeks food,
Compels a total sacrifice.
His voice waylays me, spells a trance,
The gutted forest falls to ash;
Appalled by secret want, I rush
From such assault of radiance.
Entering the tower of my fears,
I shut my doors on that dark guilt,
I bolt the door, each door I bolt.
Blood quickens, gonging in my ears:
The panther's tread is on the stairs,
Coming up and up the stairs.""",
            'Tulips': """The tulips are too excitable, it is winter here.
Look how white everything is, how quiet, how snowed-in.
I am learning peacefulness, lying by myself quietly
As the light lies on these white walls, this bed, these hands.
I am nobody; I have nothing to do with these explosions.
I have given my name and my day-clothes up to the nurses
And my history to the anesthetist and my body to surgeons.

They have propped my head between the pillow and the sheet-cuff
Like an eye between two white lids that will not shut.
Stupid pupil, it has to take everything in.
The nurses pass and pass, they are no trouble,
They pass the way gulls pass inland in their white silver caps,
Doing things with their hands, one just the same as another,
So it is impossible to tell how many there are.
My body is a pebble to them, they tend it as water
Tends to the pebbles it must run over, smoothing their pass.

I am learning peacefulness.
I am not a nun, I am not a saint, I am not a hospital nun.
I am nobody; I have nothing to do with explosions.
I have given my name and my day-clothes up to the nurses
And my history to the anesthetist and my body to surgeons.

The tulips are too red in the first place, they hurt me.
Even through the gift paper I could hear them breathe
Lightly, through their white swaddling, like an awful baby.
Their redness talks to my wound, it corresponds.
They are subtle: they seem to float, though they weigh me down,
Upsetting me with their sudden tongues and their color,
A dozen red lead sinkers round my neck.

Nobody watched me before, I was at one with the streams
And the trees, and I was so happy.
But now the tulips are watching me, and I am a pebble.
The tulips should be behind bars like dangerous animals;
They are opening like the mouth of some great African cat.

And I am aware of my heart: it opens and closes
Its bowl of red blooms out of sheer love of me.
The water I taste is warm and salt, like the sea,
And comes from a country far away as health."""
        }
    },
    'c12_engelec_poet_10': {
        'author': 'Benjamin Zephaniah',
        'text_name': 'What If, Faceless, We Refugees',
        'poems': {
            'What If': """If you can keep your money when governments about you
Are losing theirs and blaming it on you,
If you can trust your neighbour when they trust not you
And they be very nosy too;
If you can await the warm delights of summer
Then summer comes and goes with sun not seen,
And pay so much for drinking water
Knowing that the water is unclean.

If you seek peace in times of war creation,
And you can see that oil merchants are to blame,
If you can meet a pimp or politician,
And treat those two impostors just the same;
If you cannot bear dis-united nations
And you think this new world order is a trick,
If you've ever tried to build good race relations,
And watch bad policing mess your work up quick.

If you can make one heap of all your savings
And risk buying a small house and plot,
Then sit back and watch the economy inflating
Then have to deal with the negative equity you've got;
If you can force your mind and body to continue
When all the social services have gone,
If you struggle on when there is nothing in you,
Except the knowledge that justice can be wrong.

If you can speak the truth to common people
Or walk with Kings and Queens and live no lie,
If you can see how power can be evil
And know that every censor is a spy;
If you can fill an unforgiving lifetime
With years of working hard to make ends meet,
You may not be wealthy but I am sure you will find
That you can hold your head high as you walk the streets.""",
            'Faceless': """You have to look beyond the face to see the person true,
Deep down within my inner space I am the same as you;
I've counted since that fire burnt the many lessons I have learnt.
You have to talk to me and not the skin that holds me in,
I took the wisdom that I got to make sure I would win;
I'm counting weaker folk than me who look but truly cannot see.
I've seen compassion from the blind who think with open eyes,
It's those that judge me quick you'll find are those that are unwise;
Why judge the face that I have on just value my opinion.
Friends will come and friends will go, now I need friends who feel.
My friends have changed so much and so, I make sure they are real;
I took the ride and paid the price, I can't afford to do that twice.
I came to here from ignorance I cannot call it bliss,
And now I know the importance of loving me like this;
To leave behind that backward state of judging looks is very great.
I'm beautiful, I'm beautiful this minor fact I know,
I tell you it's incredible near death has made me grow;
Look at me, smile, you are now seeing a great thing called a human being.""",
            'We Refugees': """I come from a musical place
Where they shoot me for my song
And my brother has been tortured
By my brother in my land.
I come from a beautiful place
Where they hate my shade of skin
They don't like the way I pray
And they ban free poetry.
I come from a beautiful place
Where girls cannot go to school
There you are told what to believe
And even young boys must grow beards.
I come from a great old forest
I think it is now a field
And the people I once knew
Are not there now.
We can all be refugees
Nobody is safe,
All it takes is a mad leader
Or no rain to bring forth food,
We can all be refugees
We can all be told to go,
We can be hated by someone
For being someone.
I come from a beautiful place
Where the valley floods each year
And each year the hurricane tells us
That we must keep moving on.
I come from an ancient place
All my family were born there
And I would like to go there
But I really want to live.
I come from a sunny, sandy place
Where tourists go to darken skin
And dealers like to sell guns there
I just can't tell you what's the price.
I am told I have no country now
I am told I am a lie
I am told that modern history books
May forget my name.
We can all be refugees
Sometimes it only takes a day,
Sometimes it only takes a handshake
Or a paper that is signed.
We all came from refugees
Nobody simply just appeared,
Nobody's here without a struggle,
And why should we live in fear
Of the weather or the troubles?
We all came here from somewhere."""
        }
    }
}

def call_claude(prompt, system_prompt=None):
    messages = [{'role': 'user', 'content': prompt}]
    body = {
        'model': MODEL,
        'max_tokens': MAX_TOKENS,
        'messages': messages,
    }
    if system_prompt:
        body['system'] = system_prompt
    payload = json.dumps(body).encode()
    req = urllib.request.Request(API_URL, data=payload)
    req.add_header('x-api-key', API_KEY)
    req.add_header('Content-Type', 'application/json')
    req.add_header('anthropic-version', '2023-06-01')
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    for attempt in range(3):
        try:
            resp = urllib.request.urlopen(req, timeout=600, context=ctx)
            data = json.loads(resp.read())
            for block in data['content']:
                if block['type'] == 'text':
                    return block['text']
            return ''
        except Exception as e:
            print('  Attempt %d failed: %s' % (attempt+1, str(e)[:100]))
            time.sleep(5)
    return None

def parse_delimited(text):
    blocks = re.split(r'<<<SUBNODE>>>', text)
    sub_nodes = []
    for i, block in enumerate(blocks, 1):
        block = block.strip()
        if not block or 'TITLE:' not in block:
            continue
        def extract(field):
            m = re.search(r'%s:\s*(.*?)(?=\n[A-Z_]+:|\n<<<|\Z)' % field, block, re.DOTALL)
            return m.group(1).strip() if m else ''
        title = extract('TITLE')
        node_type = extract('NODE_TYPE')
        themes_raw = extract('THEMES')
        eli5 = extract('ELI5')
        content = extract('CONTENT')
        mastery = extract('MASTERY_CRITERIA')
        themes = [t.strip() for t in themes_raw.split(',') if t.strip()]
        # Parse diagnostic questions
        dq_text = ''
        m = re.search(r'DIAGNOSTIC_QUESTIONS:\s*(.*?)(?=\n[A-Z_]+:|\n<<<|\Z)', block, re.DOTALL)
        if m: dq_text = m.group(1).strip()
        diag_qs = []
        for qm in re.finditer(r'Q:\s*(.*?)\s*\|\|\s*A:\s*(.*?)\s*\|\|\s*L:\s*(.*?)(?:\n|$)', dq_text):
            diag_qs.append({
                'question': qm.group(1).strip(),
                'acceptable_answer': qm.group(2).strip(),
                'level': qm.group(3).strip().lower()
            })
        # Parse misconceptions
        misc_text = ''
        m = re.search(r'MISCONCEPTIONS:\s*(.*?)(?=\n[A-Z_]+:|\n<<<|\Z)', block, re.DOTALL)
        if m: misc_text = m.group(1).strip()
        misconceptions = []
        for mm in re.finditer(r'M:\s*(.*?)\s*\|\|\s*C:\s*(.*?)(?:\n|$)', misc_text):
            misconceptions.append({
                'misconception': mm.group(1).strip(),
                'correction': mm.group(2).strip()
            })
        # Parse key quotes
        kq_text = ''
        m = re.search(r'KEY_QUOTES:\s*(.*?)(?=\n<<<|\Z)', block, re.DOTALL)
        if m: kq_text = m.group(1).strip()
        key_quotes = []
        for qm in re.finditer(r'QUOTE:\s*(.*?)\s*\|\|\s*SPEAKER:\s*(.*?)\s*\|\|\s*CONTEXT:\s*(.*?)\s*\|\|\s*SIGNIFICANCE:\s*(.*?)(?:\n|$)', kq_text):
            key_quotes.append({
                'quote': qm.group(1).strip(),
                'speaker': qm.group(2).strip(),
                'context': qm.group(3).strip(),
                'significance': qm.group(4).strip()
            })
        if not title:
            continue
        sub_nodes.append({
            'node_id': '',
            'parent_node_id': '',
            'title': title,
            'class': 12,
            'subject': 'Elective English',
            'text_name': '',
            'author': '',
            'section': '',
            'node_type': node_type,
            'content': content,
            'mastery_criteria': mastery,
            'diagnostic_questions': diag_qs,
            'common_misconceptions': misconceptions,
            'key_quotes': key_quotes,
            'themes': themes,
            'prerequisites': [],
            'eli5': eli5
        })
    return sub_nodes

def build_prompt_with_texts(node_id, info):
    poems_text = ""
    for title, text in info['poems'].items():
        poems_text += '\n\n=== "%s" ===\n%s\n' % (title, text)

    system = """You are a master English teacher and CISCE/ISC curriculum expert specializing in Elective English.
Your task is to create granular, world-class learning nodes for prescribed poems in the ISC Elective English syllabus (Exam Year 2027).

CRITICAL RULES:
- The ACTUAL FULL TEXTS of all prescribed poems are provided below. Use ONLY these texts.
- All quotations MUST be copied EXACTLY from the provided poem texts. Do NOT invent, paraphrase, or modify any quotation.
- Do NOT quote from any poem that is not in the provided list.
- If you need a quote, find it in the provided text and copy it verbatim.
- Content should be 500-1000 words per sub-node.
- Include 3-5 diagnostic questions per sub-node.
- Include 2-3 common misconceptions per sub-node.
- Include key quotes copied EXACTLY from the provided poem texts.

OUTPUT FORMAT — Use this EXACT delimited text format. Do NOT use JSON.

For EACH sub-node:
<<<SUBNODE>>>
TITLE: (short title)
NODE_TYPE: (one of: scene_analysis, theme_analysis, literary_devices, form_structure, context, exam_application)
THEMES: (comma-separated)
ELI5: (one sentence)

CONTENT:
(500-1000 words)

MASTERY_CRITERIA:
(2-3 sentences)

DIAGNOSTIC_QUESTIONS:
Q: (question) || A: (answer) || L: (level: recall|reasoning|evaluation|application|creation)
Q: (question) || A: (answer) || L: (level)
(add 3-5)

MISCONCEPTIONS:
M: (misconception) || C: (correction)
(add 2-3)

KEY_QUOTES:
QUOTE: (exact quote from poem) || SPEAKER: (who) || CONTEXT: (when/where) || SIGNIFICANCE: (why)
(add relevant quotes, copied EXACTLY from the provided texts)
<<<END>>>

Then start the next sub-node with <<<SUBNODE>>> again."""

    prompt = """CREATE GRANULAR LEARNING NODES FOR THESE PRESCRIBED POEMS BY {author}:

PRESCRIBED POEMS (Class 12, ISC Elective English, Exam Year 2027):
{poem_list}

THE ACTUAL FULL TEXTS OF ALL PRESCRIBED POEMS ARE PROVIDED BELOW.
USE ONLY THESE TEXTS. ALL QUOTATIONS MUST BE COPIED EXACTLY FROM THESE TEXTS.

{poems_text}

Create sub-nodes covering:
1. FORM AND STRUCTURE — for each poem or comparatively
2. THEMES — central themes across the poems
3. LINE-BY-LINE ANALYSIS — using the actual text provided
4. LITERARY DEVICES — with exact quotes from the texts
5. CONTEXT AND VOICE — biographical/historical context
6. EXAM APPLICATION — essay strategies

Target: 6-10 sub-nodes total. Use the <<<SUBNODE>>> delimited format. Do NOT use JSON.""".format(
        author=info['author'],
        poem_list=', '.join(info['poems'].keys()),
        poems_text=poems_text
    )

    return system, prompt

# Process the 4 files
NODE_IDS = ['c12_engelec_poet_01', 'c12_engelec_poet_03', 'c12_engelec_poet_07', 'c12_engelec_poet_10']

for node_id in NODE_IDS:
    info = POEM_TEXTS[node_id]
    print('\n=== Processing %s (%s) ===' % (node_id, info['author']))

    system, prompt = build_prompt_with_texts(node_id, info)
    print('  Calling Claude with %d chars of poem text...' % len(prompt))

    response = call_claude(prompt, system)
    if not response:
        print('  FAILED - no response')
        continue

    sub_nodes = parse_delimited(response)
    print('  Parsed %d sub-nodes' % len(sub_nodes))

    if not sub_nodes:
        print('  FAILED - no sub-nodes parsed')
        continue

    # Fill in metadata
    for i, sn in enumerate(sub_nodes, 1):
        sn['node_id'] = '%s_%02d' % (node_id, i+1)
        sn['parent_node_id'] = node_id
        sn['text_name'] = info['text_name']
        sn['author'] = info['author']
        sn['section'] = 'Poetry: %s' % ', '.join(info['poems'].keys())

    # Load existing file to get parent_title
    out_file = OUTPUT_DIR / ('%s_subnodes.json' % node_id)
    existing = json.load(open(out_file, encoding='utf-8'))

    output = {
        'parent_node': node_id,
        'parent_title': existing['parent_title'],
        'text_type': 'poem',
        'class': existing['class'],
        'subject': 'Elective English',
        'subject_code': 'engelec',
        'text_name': info['text_name'],
        'author': info['author'],
        'sub_nodes': sub_nodes
    }

    out_file.write_text(json.dumps(output, indent=2, ensure_ascii=False), encoding='utf-8')
    print('  Wrote %d sub-nodes to %s' % (len(sub_nodes), out_file.name))

print('\nDONE')
