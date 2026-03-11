import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORY_DATA = {
  "game_title": "The Netting: A Field Survey Gone Wrong",
  "initial_state": {
    "health": 100,
    "sanity": 100,
    "battery_level": 100,
    "starting_inventory": [
      "Headlamp",
      "Field Datasheets",
      "Bat Handling Gloves",
      "Mist Net Poles (x4)",
      "Calipers",
      "Banding Kit",
      "Water Bottle",
      "Two-Way Radio"
    ],
    "starting_scene": "arrival"
  },
  "mechanics": {
    "battery_drain": "10% per turn",
    "darkness_penalty": "When battery reaches 0%, lose 10 sanity per turn",
    "headlamp_use": "Can manually use headlamp for +15 sanity at cost of 10% battery"
  },
  "story_nodes": {
    "arrival": {
      "id": "arrival",
      "art_scene": "arrival",
      "text_variants": [
        "The truck's headlights die. You step out into darkness so complete it feels solid against your skin. The wetland air is thick — a cocktail of rotting vegetation and something faintly metallic you can't place.",
        "Your boots sink into soft earth as you exit the vehicle. The canopy above swallows every photon of moonlight. The air tastes wrong tonight — copper and wet moss and something underneath both.",
        "The engine ticks as it cools. Around you, the forest wetland breathes in humid exhalations. Your headlamp carves a pitiful cone of amber through the dark. The frogs have stopped calling."
      ],
      "choices": [
        {
          "text": "Begin setting up the mist nets",
          "next_node": "setup_nets",
          "sanity_change": 0,
          "health_change": 0
        },
        {
          "text": "Check your equipment one more time",
          "next_node": "arrival_check",
          "sanity_change": 5,
          "health_change": 0
        },
        {
          "text": "Listen to the forest for a moment",
          "next_node": "arrival_listen",
          "sanity_change": -5,
          "health_change": 0
        }
      ]
    },
    "arrival_check": {
      "id": "arrival_check",
      "art_scene": "arrival",
      "text_variants": [
        "You spread your equipment on the tailgate. Headlamp: charged. Nets: furled and ready. Calipers, banding kit, datasheets — all present. The routine calms you. Everything is in order. Everything is normal. You notice your hands are steady. Good. You'll need that later, though you don't know it yet."
      ],
      "choices": [
        {
          "text": "Begin setting up the mist nets",
          "next_node": "setup_nets",
          "sanity_change": 0,
          "health_change": 0
        },
        {
          "text": "Radio base camp to confirm your position",
          "next_node": "arrival_radio",
          "sanity_change": 0,
          "health_change": 0
        }
      ]
    },
    "arrival_listen": {
      "id": "arrival_listen",
      "art_scene": "arrival",
      "text_variants": [
        "You stand still. The soundscape is... diminished. The spring peepers should be deafening at this time of year. Instead, sporadic calls. Tentative. Like the frogs are testing whether it's safe to make noise. A barred owl starts its call — 'who cooks for you' — but stops halfway through. As if something answered it that shouldn't have."
      ],
      "choices": [
        {
          "text": "Shake it off and set up the nets",
          "next_node": "setup_nets",
          "sanity_change": 0,
          "health_change": 0
        },
        {
          "text": "Note the unusual silence in your datasheet",
          "next_node": "setup_nets",
          "sanity_change": -3,
          "health_change": 0,
          "adds_flag": "noted_silence"
        }
      ]
    },
    "arrival_radio": {
      "id": "arrival_radio",
      "art_scene": "arrival",
      "text_variants": [
        "You key the radio. 'Base, this is Survey Team Alpha at Wetland Site 7. Beginning setup.' A pause. Then: 'Copy, Alpha. Weather looks clear. Good luck out there.' Normal. Professional. But as you clip the radio back to your vest, you hear one more transmission — barely audible, submerged in static: your own voice saying 'It's already here.'"
      ],
      "choices": [
        {
          "text": "...Begin setting up the nets",
          "next_node": "setup_nets",
          "sanity_change": -8,
          "health_change": 0
        }
      ]
    },
    "setup_nets": {
      "id": "setup_nets",
      "art_scene": "nets",
      "text_variants": [
        "You begin furling out the first mist net between two tupelo trunks. The 12-meter polyester mesh unfolds like a black widow's web. Your practiced hands find the shelf strings in the dark. The net hangs perfectly — four shelves of nearly invisible death for anything with wings.",
        "The mist net poles slide into the soft substrate with satisfying thuds. You tension the guy lines and begin draping the nets. Thirty-denier polyester, nearly invisible even in daylight. In this darkness, the nets cease to exist entirely. You know they're there only by touch.",
        "Net one goes up clean. Net two snags on a branch and you have to untangle it, fingers working the mesh by feel alone. You set up a third net near the pond edge, tensioning the lines carefully in the dark."
      ],
      "choices": [
        {
          "text": "Check the nets for captures",
          "next_node": "first_capture",
          "sanity_change": 0,
          "health_change": 0
        },
        {
          "text": "Set up the acoustic monitor while you wait",
          "next_node": "setup_acoustic",
          "sanity_change": 0,
          "health_change": 0
        }
      ]
    },
    "setup_acoustic": {
      "id": "setup_acoustic",
      "art_scene": "nets",
      "text_variants": [
        "You mount the acoustic detector on its tripod. It records ultrasonic frequencies and converts them to spectrograms — visual fingerprints of each bat species. You switch it on. The spectrogram display immediately fills with calls. Dozens. All at once. But the patterns don't match any known species in your reference library. The calls aren't random — they form repeating sequences. Like language. Like something talking about you."
      ],
      "choices": [
        {
          "text": "Check the mist nets",
          "next_node": "first_capture",
          "sanity_change": -5,
          "health_change": 0,
          "adds_flag": "heard_language"
        },
        {
          "text": "Record the anomalous calls for later analysis",
          "next_node": "first_capture",
          "sanity_change": -8,
          "health_change": 0,
          "adds_flag": "recorded_calls"
        }
      ]
    },
    "first_capture": {
      "id": "first_capture",
      "art_scene": "bat_capture",
      "text_variants": [
        "Twenty minutes pass. Your headlamp catches movement in net three — something fluttering, tangled. You approach. A big brown bat, Eptesicus fuscus, wrapped in the lower shelf. Routine. You reach for your gloves.",
        "A soft chittering draws you to the second net. Your lamp illuminates a small body thrashing in the mesh — a tricolored bat, Perimyotis subflavus. Its tragus is distinctive, rounded. You've banded hundreds like it.",
        "The first net has a capture. You approach carefully and find a red bat — Lasiurus borealis — its fur brilliant even in lamplight. Perfectly routine. Perfectly normal. For now."
      ],
      "choices": [
        {
          "text": "Process the capture — measure, band, and release",
          "next_node": "process_bat",
          "sanity_change": 0,
          "health_change": 0
        },
        {
          "text": "Something feels off. Check the other nets first.",
          "next_node": "wrong_sound",
          "sanity_change": -3,
          "health_change": 0
        }
      ]
    },
    "process_bat": {
      "id": "process_bat",
      "art_scene": "bat_capture",
      "text_variants": [
        "You extract the bat carefully, supporting its body. Forearm measurement: 42mm. Weight: 14g. Sex: female. Reproductive status: non-reproductive. Everything by the book. You open your hand. It launches into the dark. Standard. But as it vanishes, you swear its wingbeat rhythm sounded like Morse code.",
        "You extract the bat carefully, supporting its body. Forearm measurement: 42mm. Weight: 14g. Sex: female. Reproductive status: non-reproductive. Everything by the book. As you release it, the bat doesn't fly away. It hangs from your glove and stares at you. Its eyes reflect your headlamp, but the reflection is the wrong color. Then it's gone."
      ],
      "note": "Second variant only displays if player has 'noted_silence' flag",
      "choices": [
        {
          "text": "Continue checking nets",
          "next_node": "wrong_sound",
          "sanity_change": -3,
          "health_change": 0
        },
        {
          "text": "Take a break, drink some water",
          "next_node": "wrong_sound",
          "sanity_change": 2,
          "health_change": 5
        }
      ]
    },
    "wrong_sound": {
      "id": "wrong_sound",
      "art_scene": "dark_forest",
      "text_variants": [
        "Then you hear it. Not echolocation — you know every frequency signature in these woods. This is lower. Sub-audible. You feel it in your molars before your ears register it. The water in the nearby pond begins to vibrate in concentric circles with no wind to explain them.",
        "Between net checks, a sound reaches you that shouldn't exist. It's below the range of any chiropteran call you've catalogued. It resonates in your chest cavity like a second heartbeat. Your headlamp flickers once.",
        "The silence comes first. Every frog, every insect, every rustling thing in the understory goes mute simultaneously. Then the sound fills the void — a frequency that makes your fillings ache and your vision swim at the edges."
      ],
      "choices": [
        {
          "text": "Investigate the source of the sound",
          "next_node": "wrong_shape_net",
          "sanity_change": -10,
          "health_change": 0
        },
        {
          "text": "Ignore it — focus on the survey",
          "next_node": "wrong_shape_net",
          "sanity_change": -5,
          "health_change": 0
        },
        {
          "text": "Try the two-way radio",
          "next_node": "use_radio_early",
          "sanity_change": -8,
          "health_change": 0,
          "requires_item": "Two-Way Radio"
        }
      ]
    },
    "use_radio_early": {
      "id": "use_radio_early",
      "art_scene": "dark_forest",
      "text_variants": [
        "You try base camp. Static. You try channel 9 — emergency. Static. Every channel: static. But underneath all of it, a rhythm. The same sub-audible frequency, transmitted through electronics now. It shouldn't be possible. Radio waves and sound waves aren't the same thing. Unless what's making the sound doesn't care about the distinction."
      ],
      "choices": [
        {
          "text": "Check the nets — something big has been caught",
          "next_node": "wrong_shape_net",
          "sanity_change": -5,
          "health_change": 0
        }
      ]
    },
    "wrong_shape_net": {
      "id": "wrong_shape_net",
      "art_scene": "creature",
      "text_variants": [
        "Net two has something in it. Something large. Too large for any bat species native to this continent. It hangs in the upper shelf, distending the mesh downward. Your headlamp illuminates a wingspan that shouldn't exist — three meters at least. The fur is wrong. It moves like oil.",
        "You approach net one and stop. The entire net is full. Not tangled with multiple captures — full of one thing. It fills all four shelves. Its body is the wrong geometry. Wings that fold in directions that hurt to look at. It turns what might be a face toward your light.",
        "The third net ripples with movement. Something enormous is tangled in all four shelves at once. Your headlamp reveals limbs — too many limbs — arranged in configurations your training in mammalian anatomy cannot reconcile."
      ],
      "choices": [
        {
          "text": "Approach it with your calipers. You're a scientist.",
          "next_node": "investigate_shape",
          "sanity_change": -15,
          "health_change": -10,
          "requires_item": "Calipers"
        },
        {
          "text": "Step back slowly. Don't take your eyes off it.",
          "next_node": "the_mist",
          "sanity_change": -10,
          "health_change": 0
        },
        {
          "text": "Turn off your headlamp. Maybe it hunts by light.",
          "next_node": "darkness_choice",
          "sanity_change": -20,
          "health_change": 0
        }
      ]
    },
    "darkness_choice": {
      "id": "darkness_choice",
      "art_scene": "dark_forest",
      "text_variants": [
        "You kill the headlamp. Total darkness. For three heartbeats: nothing. Then you understand your mistake. It doesn't hunt by light. It echolocates. And in the dark, without your light, you just became invisible to yourself — but not to it. You hear it extract itself from the net with a sound like tearing silk. It clicks at you once. The click tells it everything about you — your shape, your density, the speed of your blood. You have maybe five seconds."
      ],
      "choices": [
        {
          "text": "Turn the headlamp back on — NOW",
          "next_node": "the_mist",
          "sanity_change": -10,
          "health_change": -15
        },
        {
          "text": "Stay still. Don't breathe. Don't think.",
          "next_node": "the_mist",
          "sanity_change": -15,
          "health_change": -5,
          "adds_flag": "stayed_dark"
        },
        {
          "text": "Use the mist net poles as a weapon",
          "next_node": "fight_back",
          "sanity_change": -5,
          "health_change": -20,
          "requires_item": "Mist Net Poles (x4)",
          "removes_item": "Mist Net Poles (x4)"
        }
      ]
    },
    "fight_back": {
      "id": "fight_back",
      "art_scene": "creature",
      "text_variants": [
        "You swing the aluminum pole like a baseball bat. It connects with something solid — then something not solid — then something that feels like hitting a mirror, your own impact force reflecting back through the pole into your arms. The shock numbs your hands. The pole is bent at an angle that suggests the thing you hit was harder than aluminum. But you've bought yourself time. It shrieks — a frequency that makes your fillings sing and your vision strobe."
      ],
      "choices": [
        {
          "text": "Run. Now. Toward the treeline.",
          "next_node": "flee_to_treeline",
          "sanity_change": -5,
          "health_change": 0
        },
        {
          "text": "Swing again. Don't stop.",
          "next_node": "the_mist",
          "sanity_change": -10,
          "health_change": -15,
          "adds_flag": "fought_twice"
        }
      ]
    },
    "investigate_shape": {
      "id": "investigate_shape",
      "art_scene": "creature",
      "text_variants": [
        "You step closer, calipers still in hand. Professional instinct overrides the screaming in your hindbrain. The creature's tragus isn't a tragus — it's something that unfolds as you watch, revealing structures beneath that look like they were designed by something that had only heard of ears described secondhand. Its echolocation clicks at you. You understand them.",
        "Your gloved hand reaches toward it. Up close, the fur resolves into something else — thousands of filaments that each end in a structure like a closed eye. Some of them open as your headlamp passes over them. The creature's mouth opens. It has human teeth. Your teeth.",
        "The calipers tremble in your hand as you attempt a measurement. Forearm length: impossible. The number keeps changing because the arm keeps growing. The creature looks at you with eyes that contain depth — not reflective like a normal bat's eyeshine. These eyes go inward, into distances that shouldn't fit inside a skull."
      ],
      "choices": [
        {
          "text": "Drop the calipers and run",
          "next_node": "flee_to_treeline",
          "sanity_change": -15,
          "health_change": 0,
          "removes_item": "Calipers"
        },
        {
          "text": "Keep measuring. Record everything.",
          "next_node": "the_mist",
          "sanity_change": -25,
          "health_change": -10,
          "adds_flag": "measured_it"
        },
        {
          "text": "Bow to the creature",
          "next_node": "the_mist",
          "sanity_change": -20,
          "health_change": -25,
          "adds_flag": "took_sample"
        }
      ]
    },
    "the_mist": {
      "id": "the_mist",
      "art_scene": "mist",
      "text_variants": [
        "Mist rolls in from the pond. But it doesn't move like mist — it has edges, borders, intentionality. Where it touches the furled nets, the mesh dissolves. Where it touches your skin, you see memories that aren't yours: a vast dark space, the sound of ten million wings, a hunger older than the first mammal.",
        "A wall of fog advances through the trees. Inside it, shapes fly — dozens, hundreds. Their wingbeats create a subsonic rhythm that makes your nose bleed. The mist smells like formaldehyde and loam and the inside of a cave that has never known light.",
        "The mist arrives without weather to explain it. It clings to the water's surface like a living membrane. Inside, you see the silhouettes of things that fly without wings. They spiral upward in patterns that look like equations written in a language of motion."
      ],
      "choices": [
        {
          "text": "Run for the treeline — find the access road",
          "next_node": "flee_to_treeline",
          "sanity_change": -10,
          "health_change": -5
        },
        {
          "text": "Use your headlamp at full power to see through it",
          "next_node": "use_headlamp",
          "sanity_change": -15,
          "health_change": 0,
          "requires_item": "Headlamp"
        },
        {
          "text": "Try the radio one more time",
          "next_node": "use_radio",
          "sanity_change": -20,
          "health_change": 0,
          "requires_item": "Two-Way Radio"
        },
        {
          "text": "Stand your ground. Observe. Document.",
          "next_node": "the_cave",
          "sanity_change": -25,
          "health_change": -10,
          "adds_flag": "stood_ground"
        }
      ]
    },
    "use_headlamp": {
      "id": "use_headlamp",
      "art_scene": "mist",
      "text_variants": [
        "You crank the headlamp to maximum. The beam cuts through the mist and for one terrible moment, you see everything — the canopy above is not branches. It has never been branches. It is a membrane of interlinked wings stretching to the horizon. It breathes.",
        "Full beam. The darkness doesn't retreat — it repositions. Your light reveals what was always there: the ground between the trees is covered in pellets. Not owl pellets. They contain tiny human bones. Tiny human skulls with bat-like tragus growths.",
        "Your headlamp blazes. In the sudden brightness, every surface reveals itself to be covered in guano — but it's warm. Fresh. Falling from above in a gentle rain. You look up. The sky above the canopy is not sky. It is fur."
      ],
      "choices": [
        {
          "text": "RUN. GET OUT.",
          "next_node": "flee_to_treeline",
          "sanity_change": -20,
          "health_change": -10
        },
        {
          "text": "You need to understand this. Find the source.",
          "next_node": "the_cave",
          "sanity_change": -15,
          "health_change": 0,
          "adds_flag": "saw_canopy"
        },
        {
          "text": "Turn off the light. You've seen enough.",
          "next_node": "the_cave",
          "sanity_change": -30,
          "health_change": 0
        }
      ]
    },
    "use_radio": {
      "id": "use_radio",
      "art_scene": "mist",
      "text_variants": [
        "You key the two-way radio. Static. Then, under the static, a voice — your voice — reading species measurements from a survey you haven't conducted yet. It lists species that don't exist. It describes morphologies that violate everything you know. It sounds happy.",
        "The radio crackles to life before you press the transmit button. A colleague's voice — Sarah from the lab — but wrong. She's describing a capture in clinical detail: 'Specimen exhibits recursive skeletal structure. Every bone contains smaller bones. It's bones all the way down.' She laughs.",
        "You try the radio. Channel 7, your team's frequency. Someone answers. They say your name. They say they've been waiting. They ask you to check your hands. You look at your hands. In the amber light, the skin looks thin. You can see something moving underneath."
      ],
      "choices": [
        {
          "text": "Throw the radio away and run",
          "next_node": "flee_to_treeline",
          "sanity_change": -15,
          "health_change": 0,
          "removes_item": "Two-Way Radio"
        },
        {
          "text": "Keep listening. Try to understand.",
          "next_node": "the_cave",
          "sanity_change": -25,
          "health_change": 0,
          "adds_flag": "listened_radio"
        },
        {
          "text": "Look at your hands.",
          "next_node": "check_hands",
          "sanity_change": -30,
          "health_change": -15
        }
      ]
    },
    "check_hands": {
      "id": "check_hands",
      "art_scene": "mist",
      "text_variants": [
        "You look. Under the skin of your left hand, something moves. Not veins — something with its own volition. It presses upward from beneath, forming ridges that look like... wing bones. Patagium. You watch the membrane begin to form between your fingers, translucent and threaded with new blood vessels. It doesn't hurt. That's the worst part. It feels like it was always supposed to be there."
      ],
      "choices": [
        {
          "text": "Tear it off. Use the calipers. CUT IT OUT.",
          "next_node": "flee_to_treeline",
          "sanity_change": -20,
          "health_change": -30,
          "requires_item": "Calipers"
        },
        {
          "text": "...It's beautiful.",
          "next_node": "ending_absorbed",
          "sanity_change": -40,
          "health_change": 0
        },
        {
          "text": "Run for the truck. Drive to a hospital.",
          "next_node": "flee_to_treeline",
          "sanity_change": -15,
          "health_change": -10
        }
      ]
    },
    "flee_to_treeline": {
      "id": "flee_to_treeline",
      "art_scene": "flee",
      "text_variants": [
        "You run. Branches whip your face. Your headlamp beam bounces wildly, catching glimpses of things between the trees — hanging from branches like fruit, watching with too many eyes. The mist follows. It's faster than you.",
        "Your boots churn through standing water as you sprint. Behind you, the sound intensifies — that wrong frequency — and you feel your thoughts begin to unspool. Your field datasheets blow from your vest like fleeing birds.",
        "You abandon your equipment and run. The forest closes around you. Every tree trunk you pass has something clinging to its bark, folded tight like roosting bats but shaped like collapsed origami of skin and bone."
      ],
      "choices": [
        {
          "text": "Keep running — find the truck",
          "next_node": "ending_escape",
          "sanity_change": -5,
          "health_change": -10
        },
        {
          "text": "Stop. Sit down. You're so tired.",
          "next_node": "ending_absorbed",
          "sanity_change": -20,
          "health_change": 0,
          "condition": "Only appears if sanity <= 30"
        },
        {
          "text": "You can't run anymore. Find shelter.",
          "next_node": "the_cave",
          "sanity_change": -10,
          "health_change": -5,
          "condition": "Only appears if health <= 30"
        },
        {
          "text": "Look for the cave entrance you saw on the topo map",
          "next_node": "the_cave",
          "sanity_change": -10,
          "health_change": 0
        }
      ]
    },
    "the_cave": {
      "id": "the_cave",
      "art_scene": "cave",
      "text_variants": [
        "You find it — or it finds you. A sinkhole in the limestone, breathing cold air upward. The entrance is ringed with bones arranged in taxonomic order. Every species you've ever banded. Below, in the dark, something enormous shifts its weight and the ground trembles.",
        "The cave mouth opens before you where no cave existed on any geological survey. Its entrance is shaped like a cross-section of a bat's ear canal. From within, echolocation pulses emerge at frequencies that carry meaning: come in, come in, come in.",
        "A fissure in the earth. You shine your lamp inside. The walls are covered in what looks like hibernating bats, packed shoulder to shoulder — but they're all identical. Same species. Same individual. Thousands of copies of the same bat, and it has your face."
      ],
      "choices": [
        {
          "text": "Enter the cave",
          "next_node": "ending_cave",
          "sanity_change": -20,
          "health_change": -10
        },
        {
          "text": "Turn back. Find another way out.",
          "next_node": "ending_escape",
          "sanity_change": -10,
          "health_change": -15
        },
        {
          "text": "You came here to study bats. Study this.",
          "next_node": "ending_cave",
          "sanity_change": -30,
          "health_change": 0,
          "adds_flag": "chose_science"
        }
      ]
    },
    "ending_escape": {
      "id": "ending_escape",
      "type": "ending",
      "art_scene": "ending_escape",
      "text_variants": [
        "Dawn. You stumble onto the access road, covered in mud and blood that may not all be yours. Your equipment is gone. Your datasheets are full of writing you don't remember making — measurements of things that don't exist in any field guide. You will never enter a forest at night again. But in quiet moments, you still hear the frequency. And sometimes, when you close your eyes, you see wings.\n\n[ENDING: THE SURVIVOR — You escaped. Your body survived. The rest of you is still in the wetland.]",
        "You find the truck. The keys are where you left them. The engine starts. You drive. In the rearview mirror, the mist recedes. But the rearview mirror also shows you something sitting in the back seat — folded tight, patient, waiting. You don't look back again. You drive until sunrise.\n\n[ENDING: THE PASSENGER — You brought something back with you.]"
      ],
      "choices": [
        {
          "text": "Start a new survey [Play Again]",
          "next_node": "__restart__",
          "action": "restart_game"
        }
      ]
    },
    "ending_absorbed": {
      "id": "ending_absorbed",
      "type": "ending",
      "art_scene": "ending_absorbed",
      "text_variants": [
        "You stop running. The mist wraps around you like a collection bag. It doesn't hurt. The frequency becomes music — the most beautiful sound you've ever heard. You understand now. The survey was never about the bats. The bats were surveying you. You open your arms. Your wingspan is magnificent.\n\n[ENDING: METAMORPHOSIS — You became what you studied.]",
        "Your sanity crumbles like wet field notes. You sit down in the shallow water and begin filling out your datasheets with perfect calm. Species: unknown. Morphology: impossible. Behavior: hunting. You record everything. Your handwriting changes. It becomes something else. Something older. You don't notice when the wings grow in.\n\n[ENDING: THE LAST DATASHEET — Science is observation. You became the observation.]"
      ],
      "choices": [
        {
          "text": "Wake up [Play Again]",
          "next_node": "__restart__",
          "action": "restart_game"
        }
      ]
    },
    "ending_cave": {
      "id": "ending_cave",
      "type": "ending",
      "art_scene": "ending_cave",
      "text_variants": [
        "You descend into the cave. The temperature drops. The walls pulse. At the bottom, you find a chamber filled with roost — millions of bodies hanging in perfect silence. In the center, something ancient opens one eye. It's been waiting since before mammals existed. It chose this form — wings, fur, echolocation — as camouflage. It has been counting your species the way you count its. You are Specimen #7,847,293,102. It bands you.\n\n[ENDING: CATALOGUED — You became data in something else's study.]",
        "The cave goes deeper than geology allows. You descend for what feels like hours. The walls transition from limestone to something organic. At the bottom, there is no monster. There is a mirror. In it, you see yourself, but the reflection is hanging upside down. It mouths words: 'The survey is complete.' Your headlamp dies. In the perfect dark, you finally hear what the bats have always been saying.\n\n[ENDING: THE FREQUENCY — You heard the truth. You can never unhear it.]"
      ],
      "choices": [
        {
          "text": "Begin again [Play Again]",
          "next_node": "__restart__",
          "action": "restart_game"
        }
      ]
    },
    "ending_darkness": {
      "id": "ending_darkness",
      "type": "ending",
      "art_scene": "ending_darkness",
      "text_variants": [
        "Your headlamp died hours ago. Or was it minutes? Time doesn't work the same in total darkness. You can't see your hand in front of your face. You can't see the trees. You can't see the ground. But you can hear them — thousands of wings in the canopy above. They speak in frequencies that bypass your ears entirely, resonating directly in your skull. They're teaching you their language. Noun: prey. Verb: hunt. Subject: you.\n\nYou don't remember sitting down, but you're on the ground now. The wetland water soaks through your clothes. It's warm. That's wrong. You reach out in the dark and touch something. It touches back. Too many fingers. They belonged to the last researcher who ran out of battery.\n\nYour eyes adjust to a light that isn't there. In the absolute dark, you begin to see. The forest is full of shapes that were always there — things that only exist in the absence of light. They've been waiting. Your headlamp kept them at bay. Now there's nothing between you and them.\n\nOne of them leans close. Its breath smells like century-old guano and rotted fruit. It whispers: 'Welcome to the real survey.'\n\n[ENDING: CONSUMED BY DARKNESS — The light was all that kept you human.]"
      ],
      "trigger": "Battery reaches 0% and sanity reaches 0",
      "choices": [
        {
          "text": "Wake up [Play Again]",
          "next_node": "__restart__",
          "action": "restart_game"
        }
      ]
    }
  }
};

export default function StoryExport() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const jsonString = JSON.stringify(STORY_DATA, null, 2);
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-amber-600 mb-2">
              Story Export: The Netting
            </h1>
            <p className="text-sm text-gray-400">
              Complete narrative structure with all nodes, choices, and branching paths
            </p>
          </div>
          <Button
            onClick={handleCopy}
            className="gap-2 bg-amber-900/40 hover:bg-amber-900/60 border border-amber-800"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy JSON
              </>
            )}
          </Button>
        </div>

        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 overflow-auto max-h-[calc(100vh-200px)]">
          <pre className="text-xs text-gray-300 font-mono">
            {JSON.stringify(STORY_DATA, null, 2)}
          </pre>
        </div>

        <div className="mt-4 p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
          <h3 className="text-sm font-semibold text-amber-600 mb-2">Structure Overview:</h3>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• <strong>Total Nodes:</strong> {Object.keys(STORY_DATA.story_nodes).length}</li>
            <li>• <strong>Endings:</strong> 4 (Survivor/Passenger, Metamorphosis/Last Datasheet, Catalogued/Frequency, Consumed by Darkness)</li>
            <li>• <strong>Branching Points:</strong> Multiple choice-driven paths with stat-based conditions</li>
            <li>• <strong>Dynamic Elements:</strong> Conditional choices based on health/sanity, item requirements, procedural text variants</li>
            <li>• <strong>Game Mechanics:</strong> Health, Sanity, Battery (drains 10%/turn), Inventory system</li>
          </ul>
        </div>
      </div>
    </div>
  );
}