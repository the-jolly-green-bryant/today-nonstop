
### References

**Potential Short Story Cycles**

- Bandersnatch

**Plot Elements**

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

- Add Stat Items
- Add Characters
- Add Character Discoverables

### Overview

Doppelgangers are impersonating people. Why? Where? How many? What does a successful end look like?

### Scenes

###### Cycle One - Human - 1xxy

This story reflects a human going through all sorts of zany encounters. It is based on sci-fi adventure that focuses on alien abductions and virtual reality, but is themed to a DnD appropriate universe. The original story is [here](https://www.reddit.com/r/WritingPrompts/comments/2yof9i/wp_create_a_choose_your_own_adventure_with_an/cpcgzew/?context=3)

- 1000 - RESTART - Your mind is a fog.
    - 1010 - Wake up
    - 1160 - FOURTH WALL - You're incredulous this is real. Break the fourth wall.

- 1010 - START - You jolt awake. There's a lot going on. A fair is in town.
    - Describe the festival going on
    - Dialog
        - `[[CLEAR_INVENTORY]]`
    - 1020 - FAKE WORLD - Go for a walk
    - 1030 - TOURNEY - Undress for the fair
    - 1040 - INVESTIGATE - Stoke the fire
    - 1050 - CHICKEN - Start morning aggressively

- 1020 - FAKE WORLD - During your walk, you see a hazy form floating in the sky.
    - Hazy form becomes a massive figure whose eyes are staring through a large domed glass.
    - The face is yours. (Doppelgangers!)
    - 1110 - EASTER EGG ENDING - What am I looking at?
    - 1140 - FAKE WORLD - You must be dreaming. Blink away the figment/vision.

- 1030 - TOURNEY - Today's the fair. You remember the archery tourney. You remember you're a participant.
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

- 1050 - CHICKEN - Start feeding the chickens.
    - What an easy life they have.
    - No worries, no concerns.
    - No missing villagers. What happened to those guys anyways?
    - 1051 - CHICKEN - Admire the chickens.

- 1051 - CHICKEN - Admire the chickens.
    - Become a chicken.
    - 1052 - CHICKEN - Lay an egg
    - 1053 - CHICKEN - Bacaaak

- 1052 - CHICKEN - Lay an egg
    - Oh, that's not an egg. It will come with practice.
    - Dialog:
        - `[[ADD_ITEM]]eggs_laid`
    - 1053 - ENDING - Become Chicken

- 1053 - CHICKEN - I'm a chicken now.
    - Dialog
        - `[[ADD_ITEM]]was_chicken`
    - 1000 - ENDING - Go to bed and wake back up as a human. Damn.

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

- 1071 - TOURNEY - You attend the archery tourney but brought a sword
    - Leads up to a "you brought a knife to a gunfight" ending
    - Skip To If
        - `has_bow` - 1072 - You brought a bow
    - 1000 - ENDING - You run down an alley to escape your shame. A figure follows you, laughing. He looks unreal. You're knocked out. Restart when you wake up.

- 1072 - TOURNEY - You attend the archery tourney with all required equipment. Pick your competition.
    - 1073 - TOURNEY - I want to shoot some butts. Sounds funnier than it really is.
    - 1074 - TOURNEY - I want to shoot something moving.
    - 1170 - ENDGAME - Go off script.
        - Show If: `entered_doppelganger`

- 1073 - TOURNEY - An archery accident gone bad kills you. (butts)
    - 1150 - ENDING - Wake up to a bad dream.

- 1074 - TOURNEY - An archery accident gone bad kills you. (roving)
    - 1150 - ENDING - Wake up to a bad dream.

- 1080 - INVESTIGATE - The crying turns to wailing. It's getting louder. Turns to roaring.
    - 1100 - ABDUCTION - Something barrels throught he door. You're knocked out.

- 1090 - TOURNEY - You don't attend event (and event likely only existed in your head)
    - You recognize this as a recurring dream. That dream always ends up with you having an accident at the tourney. Gotta snap out of it.
    - 1150 - BAD DREAM - It was all a dream, wake up.

- 1100 - ABDUCTION - Wake up scene to doppelgangers, shadowy figures.
    - Describe it like a sleep paralysis / alien abduction scene.
    - We don't recognize them as doppelgangers unless we know of them yet.
    - 1000 - ENDING - You fall back asleep / blackout. Restart when you wake up.

- 1110 - EASTER EGG ENDING - Must be a render error.
    - Like a console died and restarted. Video game begins rendering poorly. Fans running high. Everything goes black.
    - 1000 - ENDING - You blackout and restart.

- 1120 - BAD DREAM - What's that one doing awake? Take care of it.
    - 1000 - ENDING - Knocked out and forced to restart.

- 1130 - BAD DREAM - You attack the beast
    - 1150 - BAD DREAM - It was all a dream, wake up (to bad dream).
    - 1130 - BAD DREAM - Attack it again.
    - 1120 - BAD DREAM - Scream until you blackout and wake up (to "real" ending)

- 1140 - FAKE WORLD - You blink your eyes, but which eyes? Suddenly you're in the big you, staring down at little you in a snowglobe. What's going on?
    - There are other doppelgangers there with you. You meet their eyes.
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
    - 1130 - BAD DREAM - Attack the monster
    - 1040 - INVESTIGATE - It was all a dream, wake up (to slow morning)

- 1160 - FOURTH WALL - Explanation, don't give up.
    - You can complete this level without dying. In fact, you must.
    - Your character will remember previous lives, and new paths can open from that knowledge. Replay previous paths to see if new options pop up.
    - Do we explain any of the story?
    - 1010 - ENDING - Time to restart, we broke the fourth wall.

- 1170 - ENDGAME - We're at the tourney but not here to compete.
    - Aim towards the sky.
    - There's a familiar face there.
    - Blink like crazy.

- 1171 - ENDGAME - You let out a chicken sound. Everyone's distracted. Little you looses their arrow. Arrow kills the doppelganger next to you.
    - 2000 - SUCCESS - The world fades. What comes next?

- 1172 - ENDGAME - You say some cool catch phrase. You begin monologuing. You're distracted, though, and get captured.
    - 1000 - ENDING - The other doppelgangers captured you.


###### Cycle Two - Doppelganger - 2xxy

- 2000 - START - Coming Soon
    - You've done it. You've broken the constraints of your mortal bounds. Unfortunately, what comes next has yet to be written. Stay tuned.
    - Show restart button.
