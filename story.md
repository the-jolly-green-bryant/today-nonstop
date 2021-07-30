
### References

**Potential Short Story Cycles**

- Bandersnatch

**Plot Elements**

- Medieval Meme Paintings
    - Totally flippant and light-hearted

- Doppelgangers
    - True neutral, no real motive but to fit in.
    - Leave their young to be raised by whatever species they're immitating.
    - Will stalk and kidnap people in order to immitate them closer.
    - Can read surface-level thoughts
    - Encounters
        - One is stalking in the background (probably not noticed in the first loop)
        - One failing ending is for the doppelganger to kidnap you
        - In order to kill the doppelganger, you must arrange the death earlier in the loop (no big fight)

- Death
    - When something dies in your presence due to your action or inaction, you inhabit it's body.
    - You can progress by bringing a creature to death.
    - You can also lose progress by letting a creature you've previously inhabited die.

- Not So Slim Shady
    - Doppelganger leader
    - Big reveal
    - Ultimate ending, we can change everything if we're him.

- Simulation
    - You're in a simulation, in a simulation
    - Maybe take over the big you in the snowglobe?
    - Roy from Rick & Morty?

- Time Loop
    - Knowledge and items are collected from various playthroughs. This allows us to unlock successful endings.

### Finishing Touches

- Break long dialog up with options.
- Add Stat Items
- Add Characters
- Add Character Discoverables

### Overview

Doppelgangers are impersonating people. Why? Where? How many? What does a successful end look like?

### Scenes

###### Cycle One - Human - 1xxy

This story reflects a human going through all sorts of zany encounters. It is based on sci-fi adventure that focuses on alien abductions and virtual reality, but is themed to a DnD appropriate universe. The original story is [here](https://www.reddit.com/r/WritingPrompts/comments/2yof9i/wp_create_a_choose_your_own_adventure_with_an/cpcgzew/?context=3)

**Items**

- `was_nude`
    - Indicates we attended the tourney naked.
    - `Tourneyed Shamefully`
    - Persists
- `has_bow`
    - We brought a bow to the tourney.
    - `Elm Bow`
- `has_sword`
    - We brought a sword to the tourney.
    - `Rusted Sword`
- `has_clothes`
    - We grabbed our clothes
    - `Tourney Garb`
- `eggs_laid`
    - The number of eggs we laid.
    - `Eggs Laid`
    - Status
    - Persists
- `lives_lived`
    - The number of lives we've lived.
    - `Lives Lived`
    - Status
    - Persists
- `was_chicken`
    - Indicates we became a chicken.
    - `Clucked Around`
    - Persists
- `entered_doppelganger`
    - Indicates we entered the doppelganger
    - `Doppelgangers Doppelganged`
    - Persists
- `did_setup`
    - Indicates we setup for the endgame
    - Hidden
- `fought_dream_monster`
    - Indicates we hit the monster
    - `Losing Fights Fought`
    - Status
    - Persists
- `had_bad_dream`
    - Indicates we had the bad monster dream
    - Hidden
    - Persists
- `attended_tourney_nude`
    - Indicates we went to the tourney without clothes (unlocks discoverable for registrator)
    - Hidden
    - Perists
- `wont_forget_eggs`
    - Indicates we had the dream sequence unlocking chickens.
    - `Forgot The Eggs`
    - Persists
- `times_abducted`
    - Indicates we were abducted.
    - `Abducted`
    - Persists
- `restarted_once`
    - Indicates we restarted at least once already.
    - Hidden
    - Persists

**Scenes**

- 1000 - RESTART - Your mind is a fog.
    - Dialog
        - IMAGE: Crazy dream world
        - Speaker: Player
        - What just happened?
        - And where am I?
        - Speaker: Evil Player
        - Isn't it obvious?
        - You're dead.
        - Speaker: Player
        - No.
        - This can't be real.
        - Speaker: Evil Player:
        - Oh it's definitely real.
        - Speaker: Player
        - DELAY
        - ...
    - 1010 - Wake up
        - `This all feels like a bad dream.`
        - Dialog
            - Speaker: Player
            - This all feels like a bad dream.
            - Probably had too much cider.
            - Speaker: Evil Player
            - Tell yourself what you must.
            - But this ending is unacceptable.
            - Let's try it again from the top.
            - EMOTE: [The world explodes in a burst of color.]
    - 1160 - FOURTH WALL - You're incredulous this is real. Break the fourth wall.
        - `[Break the fourth wall.]`
        - Dialog
            - Speaker: Player
            - Okay, enough's enough.
            - This can't possibly be real.
            - What's going on?!

- 1010 - START - You jolt awake. There's a lot going on. A fair is in town.
    - Skip To If
        - `lives_lived >= 1` - 1012 - We've lived two lives
    - Dialog
        - `[[ADD_ITEM]]lives_lived`
        - `[[CLEAR_INVENTORY]]`
        - IMAGE: Sprinkling / Rain
        - EMOTE: [You stir at the sound of thunder.]
        - Speaker: Player
        - Such a strange dream...
        - It felt so real.
        - DELAY
        - Why am I so groggy?
        - Was I hitting the cider again?
        - Speaker: Evil Player
        - Blaming the cider again?
        - Did you ever consider that you might just be a layabout?
        - Speaker: Player
        - Shush up.
        - EMOTE: [Thunder punctuates your thought.]
        - This rain, man.
        - DELAY
        - Emote: [The sound of dampened revellers floats in from the street.]
        - Speaker: Player
        - Crazy folk, heading to the fair in this weather.
        - Speaker: Evil Player
        - Bloody fair...
        - All these cheery fools.
        - Some of us have work to do.
        - Speaker: Player
        - No use crying about it.
        - I'm sure the critters could use some tending.
        - Speaker: Evil Player
        - Or...
        - And here me out...
        - Let's play hookie!
    - 1011 - START - Move to options

- 1011 - START - Display Options
    - 1020 - FAKE WORLD - Go for a walk
        - `Let's clear our head with a walk.`
        - Dialog
            - NONE
    - 1030 - TOURNEY - Undress for the fair
        - `Let's undress for the fair.`
        - Dialog
            - NONE
    - 1040 - INVESTIGATE - Stoke the fire
        - `Let's get the fire started again.`
    - 1050 - CHICKEN - Check on the animals
        - `Let's check on the animals.`

- 1012 - START - Wake up on second day
    - Skip To If
        - `lives_lived >= 2` - 1012 - We've lived three lives
    - Dialog:
        - `[[ADD_ITEM]]lives_lived`
        - `[[ADD_ITEM]]restarted_once`
        - `[[CLEAR_INVENTORY]]`
        - IMAGE: Sprinkling / Rain
        - EMOTE: [You stir at the sound of thunder.]
        - Huh, WEATHER two days in a row
        - Delay.
        - Emote: Noise from outside
        - Are the fair revellers still going?
        - Wait, wasn't the fair yesterday.
        - Or did I dream that?
        - I've got to lay off the cider.
    - 1011 - START - Move to options

- 1013 - START - Wake up after two days
    - Dialog:
        - `[[ADD_ITEM]]lives_lived`
        - `[[CLEAR_INVENTORY]]`
        - IMAGE: Sprinkling / Rain
        - EMOTE: [You stir at the sound of thunder.]
        - This again?
        - Very cute, like Groundhog Day.
        - Wait, how many times have I made that joke?
        - Whatever, let's get this over with.
    - 1011 - START - move to options

- 1020 - FAKE WORLD - During your walk, you see a hazy form floating in the sky.
    - Hazy form becomes a massive figure whose eyes are staring through a large domed glass.
    - The face is yours. (Doppelgangers!)
    - Dialog:
        - Speaker: Player
        - I can't deal with this right now.
        - I'm getting out of here.
        - Gonna clear my head.
        - Speaker: Evil Player
        - In this weather?
        - You're going to get a soggy head.
        - Speaker Player
        - Shush up.
        - DELAY
        - IMAGE: Outside
        - Speaker: Player
        - I'm glad the weather cleared up.
        - And this fresh air.
        - Just what I needed!
        - EMOTE: [Your stomach grumbles.]
        - It's a shame I didn't bring any snacks.
        - Speaker: Evil Player
        - Might need to draw straws to see who we eat.
        - Just kidding.
        - We'd eat you, obviously.
        - Speaker: Player
        - Shush up.
        - EMOTE: [Birds sing overhead.]
        - Speaker: Evil Player
        - I don't mean to alarm anyone, but...
        - Do those birds look a little off to you?
        - Speaker: Player
        - What do you mean?
        - Speaker: Evil Player
        - I don't know, man.
        - Like, do those birds even look like birds?
        - Or is it just me?
        - Speaker: Player
        - Now that you mention it...
    - 1110 - EASTER EGG ENDING - What am I looking at?
        - `What's going on with that bird?`
    - 1140 - FAKE WORLD - You must be dreaming. Blink away the figment/vision.
        - `[Blink like mad.]`

- 1030 - TOURNEY - Today's the fair. You remember the archery tourney. You remember you're a participant.
    - Speaker: Player
        - Oh shoot.
        - Speaker: Evil Player
        - What?
        - Speaker: Player
        - Oh shoot, oh shoot.
        - We've got to go!
        - CONTINUE_HERE
    - 1031 - TOURNEY - Get ready for event
    - 1090 - TOURNEY - Skip event

- 1031 - TOURNEY - Get ready
    - 1032 - TOURNEY - Grab sword (if not has sword)
    - 1033 - TOURNEY - Grab bow (if not has bow)
    - 1034 - TOURNEY - Grab clothes
        - Show If: `was_nude`
    - 1170 - TOURNEY - Head to tourney
        - "Well, that's everything I need"

- 1032 - TOURNEY - Grab sword
    - Skip To If
        - `has_bow` - 1035 - Too much equipment
    - Dialog
        - `[[ADD_ITEM]]has_sword`
    - 1031 - TOURNEY - We can grab more stuff

- 1033 - TOURNEY - Grab bow
    - Skip To If
        - `has_sword` - 1035 - Too much equipment
    - Dialog
        - `[[ADD_ITEM]]has_bow`
    - 1031 - TOURNEY - We can grab more stuff

- 1034 - TOURNEY - Grab clothes
    - Dialog
        - `[[ADD_ITEM]]has_clothes`
    - 1031 - TOURNEY - We can grab more stuff

- 1035 - TOURNEY - Too much equipment (grab sword)
    - 1000 - ENDING - You die to an unfortunate slip and fall and wake up.

- 1036 - TOURNEY - Too much equipment (grab bow)
    - 1000 - ENDING - You die to an unfortunate slip and fall and wake up.

- 1040 - INVESTIGATE - It's a normal morning. You hear a child crying. You don't have children.
    - 1060 - INVESTIGATE - What's a child doing out this way?
    - 1080 - INVESTIGATE - Not my child, not my problem. Someone should quiet that child.

- 1050 - CHICKEN - Pa/Ma will be wanting some breakfast. Collect Breakfast. (Start farm chores?)
    - 1055 - CHICKEN - Milk the cows
    - 1056 - CHICKEN - Feed the pigs
    - 1051 - CHICKEN - DON'T FORGET THE EGGS
        - Show If: `wont_forget_eggs`

- 1051 - CHICKEN - Start feeding the chickens.
    - What an easy life they have.
    - No worries, no concerns.
    - No missing villagers. What happened to those guys anyways?
    - 1052 - CHICKEN - Admire the chickens.
    - 1040 - INVESTIGATE - Where'd those villagers go anyways?

- 1052 - CHICKEN - Admire the chickens.
    - Become a chicken.
    - 1053 - CHICKEN - Lay an egg
    - 1054 - CHICKEN - Bacaaak

- 1053 - CHICKEN - Lay an egg
    - Oh, that's not an egg. It will come with practice.
    - Dialog:
        - `[[ADD_ITEM]]eggs_laid`
    - 1054 - ENDING - Become Chicken

- 1054 - CHICKEN - I'm a chicken now.
    - Dialog
        - `[[ADD_ITEM]]was_chicken`
    - 1000 - ENDING - Go to bed and wake back up as a human. Damn.

- 1055 - CHICKEN - Dumb cows
    - 1056 - Feed the pigs

- 1056 - CHICKEN - Feed the pigs
    - Take them to the forest to feed on acorns
    - Something bad in the forest
    - 1000 - ENDING - You died.

- 1060 - INVESTIGATE - The thing you're investigating turns out to be a doppelganger (you may not recognize it as a doppelganger).
    - 1100 - ABDUCTION - You catch sight of something strange/alien. You're knocked out. You wake up to the abduction scene.
    - 1160 - FOURTH WALL - You're incredulous this is real. Break the fourth wall.

- 1070 - TOURNEY - You attend the archery tourney but forgot your clothes
    - Describe people jeering at their nudity in a way that could be misconstrued as kindness.
    - Skip To If
        - `has_clothes` - 1071 - You brought clothes
    - Dialog
        - `[[ADD_ITEM]]was_nude`
    - 1000 - ENDING - You run down an alley to escape your shame. A figure follows you, laughing. He looks unreal. You're knocked out. Restart when you wake up.
    - 1075 - TOURNEY - Assert yourself by acting like a chicken. The confused gate keeper lets you through.
        - Show If: `was_chicken`

- 1071 - TOURNEY - You attend the archery tourney but brought a sword
    - Leads up to a "you brought a knife to a gunfight" ending
    - Skip To If
        - `has_bow` - 1072 - You brought a bow
    - 1000 - ENDING - You run down an alley to escape your shame. A figure follows you, laughing. He looks unreal. You're knocked out. Restart when you wake up.

- 1072 - TOURNEY - You attend the archery tourney with all required equipment. Pick your competition.
    - 1073 - TOURNEY - I want to shoot some butts. Sounds funnier than it really is.
    - 1074 - TOURNEY - I want to shoot something moving.

- 1073 - TOURNEY - An archery accident gone bad kills you. (butts)
    - 1150 - ENDING - Wake up to a bad dream.

- 1074 - TOURNEY - An archery accident gone bad kills you. (roving)
    - 1150 - ENDING - Wake up to a bad dream.

- 1075 - TOURNEY - Leads to 1071 (registration) but with additional flavor.
    - Guy stares you up and down. Oh my.
    - Dialog:
        - `[[ADD_ITEM]]is_nude`
    - 1071 - TOURNEY - Pass through to the registration scene.
        - Dialog:
            - `[[ADD_ITEM]]attended_tourney_nude`
    - 1170 - ENDGAME - Go off script.
        - Show If: `entered_doppelganger`

- 1080 - INVESTIGATE - The crying turns to wailing. It's getting louder. Turns to roaring.
    - 1100 - ABDUCTION - Something barrels throught he door. You're knocked out.

- 1090 - TOURNEY - You don't attend event (and event likely only existed in your head)
    - You recognize this as a recurring dream. That dream always ends up with you having an accident at the tourney. Gotta snap out of it.
    - 1150 - BAD DREAM - It was all a dream, wake up.

- 1100 - ABDUCTION - Wake up scene to doppelgangers, shadowy figures.
    - Describe it like a sleep paralysis / alien abduction scene.
    - We don't recognize them as doppelgangers unless we know of them yet.
    - Dialog:
        - `[[ADD_ITEM]]times_abducted`
    - 1000 - ENDING - You fall back asleep / blackout. Restart when you wake up.

- 1110 - EASTER EGG ENDING - Must be a render error.
    - Like a console died and restarted. Video game begins rendering poorly. Fans running high. Everything goes black.
    - Dialog:
        - Speaker: Player
        - What's going on with that bird?
        - Is it flying backwards?
        - EMOTE: [You hear a loud rushing of air.]
        - Speaker: Evil Player
        - I don't like this.
        - Speaker: Player
        - Me either.
        - What do you think it is?
        - Speaker: Evil Player
        - It might be some kind of en--
        - Speaker: Player
        - Some kind of what?
        - Speaker: Evil Player
        - I think we're hav--
        - Some kind of sys--
        - Reboot.
        - Speaker: Player
        - Reboot?
        - EMOTE: [The sound suddenly dies away.]
        - Speaker: Player
        - Hello?
        - Speaker: Evil Player
        - ...
        - Speaker: Player
        - I know we have our differences, but don't leave me like this.
        - Speaker: Gamedev
        - SYSTEM REBOOT IMMINENT
        - Speaker: Player
        - What?
        - Speaker: Gamedev
        - In 3...
        - 2...
        - Speaker: Player
        - Wait!
        - 1...
        - EMOTE: [Everything goes dark.]
    - 1000 - ENDING - You blackout and restart.

- 1120 - BAD DREAM - Have a small dream sequence. What's that one doing awake? Take care of it.
    - During dream sequence, someone shouts at you: "DON'T FORGET THE EGGS!" (or similar)
    - Dream sequence unlocks chicken sequence.
    - Dialog:
        `[[ADD_ITEM]]wont_forget_eggs`
    - 1000 - ENDING - Knocked out and forced to restart.

- 1130 - BAD DREAM - You attack the beast
    - Dialog:
        `[[ADD_ITEM]]fought_dream_monster`
    - 1150 - BAD DREAM - It was all a dream, wake up (to bad dream).
    - 1130 - BAD DREAM - Attack it again.
    - 1120 - BAD DREAM - Scream until you blackout and wake up (to "real" ending)

- 1140 - FAKE WORLD - You blink your eyes, but which eyes? Suddenly you're in the big you, staring down at little you in a snowglobe. What's going on?
    - There are other doppelgangers there with you. You meet their eyes.
    - I want a "show me what you've got" joke in here.
    - Dialog:
        - `[[ADD_ITEM]]entered_doppelganger`
    - 1141 - FAKE WORLD - Try to be friendly with the other doppelgangers.
    - 1142 - FAKE WORLD - Ask what's going on.
    - 1171 - ENDGAME - Distract by acting like a chicken
        - Show If: `did_setup` and `was_chicken`
    - 1172 - ENDGAME - Cool phrase
        - Show If: `did_setup`

- 1141 - FAKE WORLD - Friendliess doesn't work.
    - 1000 - ENDING - The other doppelgangers recognize that you've taken over the body. They seize you.

- 1142 - FAKE WORLD - Confusion doesn't work.
    - 1000 - ENDING - The other doppelgangers recognize that you've taken over the body. They seize you.

- 1150 - BAD DREAM - You wake up from the dream (but are really still in a different dream) and there's a monster.
    - Waking up is nice. Your lover is laying next to you.
    - Wait, you don't have a lover, and this being is grotesque / monsterous.
    - Dialog:
        - `[[ADD_ITEM]]had_bad_dream`
    - 1130 - BAD DREAM - Attack the monster
    - 1040 - INVESTIGATE - It was all a dream, wake up (to slow morning)

- 1160 - FOURTH WALL - Explanation, don't give up.
    - Dialog
        - EMOTE: [The world freezes.]
        - Speaker: Gamedev
        - I imagine that right now, you’re feeling a bit like Alice.
        - Hmm?
        - Tumbling down the rabbit hole?
        - Let me tell you why you're here.
        - Speaker: Player
        - Please.
        - Speaker: Gamedev
        - You're here to solve a mystery.
        - To escape.
        - To win.
        - You win by losing and then not losing.
        - Savvy?
        - Speaker: Player
        - Savvy?
        - DELAY
        - No
        - Not savvy.
        - Speaker: Gamedev
        - ...
        - DELAY
        - Let me speak plainly.
        - Speaker: Player
        - Please!
        - Speaker: Gamedev
        - Your character will remember previous lives.
        - So what may seem like a loss is actually a chance to unlock new paths.
        - Replay paths you've previously taken to check for newly unlocked paths.
        - Speaker: Player
        - So lose in order to win.
        - Got it.
        - Speaker: Gamedev
        - But in order to ultimately win, you must live without dying.
        - DELAY
        - Oh.
        - And don't forget.
        - Clothing's optional.
        - Speaker: Player
        - What's that even mean?
        - Speaker: Gamedev
        - Enough of your fourth wall nonsense.
        - Be gone.
        - EMOTE: [The world explodes in a burst of color.]
    - 1010 - ENDING - Time to restart, we broke the fourth wall.

- 1170 - ENDGAME - We use our nudity to sneak to the top of the highest tower. No one wants to look our way. People are actively avoiding our gaze.
    - Aim towards the sky.
    - There's a familiar face there.
    - Blink like crazy.
    - Dialog
        - `[[ADD_ITEM]]did_setup`
    - 1140 - FAKE WORLD - We've unlocked an extra ending.

- 1171 - ENDGAME - You let out a chicken sound. Everyone's distracted. Little you looses their arrow. Arrow kills the doppelganger next to you.
    - 2000 - SUCCESS - The world fades. What comes next?

- 1172 - ENDGAME - You say some cool catch phrase. You begin monologuing. You're distracted, though, and get captured.
    - 1000 - ENDING - The other doppelgangers captured you.


###### Cycle Two - Doppelganger - 2xxy

- 2000 - START - Coming Soon
    - You've done it. You've broken the constraints of your mortal bounds. Unfortunately, what comes next has yet to be written. Stay tuned.
    - Show restart button.
