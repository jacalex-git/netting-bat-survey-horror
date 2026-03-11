// Story data - completely drives the game engine
const STORY_DATA = {
  "game_title": "The Netting: A Field Survey Gone Wrong",
  "initial_state": {
    "health": 100,
    "sanity": 100,
    "battery_level": 100,
    "starting_inventory": [
      "Headlamp",
      "Spare Battery",
      "Partial Spare Battery",
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
    "battery_death": "When battery reaches 0%, the headlamp dies and the game ends — ending_darkness",
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
        "You stand still. The soundscape is diminished. The spring peepers should be deafening at this time of year. Instead, sporadic calls. Tentative. Like the frogs are testing whether it's safe to make noise. A barred owl starts its call — 'who cooks for you' — but stops halfway through. As if something answered it that shouldn't have."
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
        "You begin unfurling the first mist net between two tupelo trunks. The 12-meter polyester mesh unfolds like a black widow's web. Your practiced hands find the shelf strings in the dark. The net hangs perfectly — four shelves of nearly invisible death for anything with wings.",
        "The mist net poles slide into the soft substrate with satisfying thuds. You tension the guy lines and begin draping the nets. Thirty-denier polyester, nearly invisible even in daylight. In this darkness, the nets cease to exist entirely. You know they're there only by touch.",
        "You being setting up the first net. The net snags on a branch and you have to untangle it, fingers working the mesh by feel alone - tensioning the lines carefully in the dark."
      ],
      "choices": [
        {
          "text": "Move to the second net location",
          "next_node": "second_net",
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

    "second_net": {
      "id": "second_net",
      "art_scene": "nets",
      "text_variants": [
        "Your stake sinks into the substrate and hits resistance — metal on metal. You dig around the base with your boot and find a solid steel stake, identical to yours, already sunk into position. Something about it feels... old. You check the site permit records on your datasheet. No survey has been conducted at Wetland Site 7 in recent record.",
        "Net two's anchor points have already been prepared — the poles and stakes are already hammered into position, exactly where you would have placed them. Exactly. Not approximately. Someone with your training, your methods, was here recently. Your headlamp finds a vinyl flagging strip tied to the tupelo above it. Your handwriting is on it. Today's date.",
        "Tangled in the base of a buttonbush, your lamp catches something white. A datasheet. You pull it free. It's a bat survey form — your form, your agency's header, your species codes. The capture data is filled out in your handwriting. Thirty-two individuals. Species you'd expect. Measurements in your typical shorthand. The survey date is tonight. You have not filled out this form. You have not made these captures. Not yet."
      ],
      "choices": [
        {
          "text": "Document the anomaly in your datasheet and keep moving — the acoustic monitor needs setting up",
          "next_node": "setup_acoustic",
          "sanity_change": -8,
          "health_change": 0,
          "adds_flag": "found_future_data"
        },
        {
          "text": "Leave it where it is. Finish the net and get to the acoustic monitor.",
          "next_node": "setup_acoustic",
          "sanity_change": -5,
          "health_change": 0
        },
        {
          "text": "Radio base camp to ask about prior surveys",
          "next_node": "second_net_radio",
          "sanity_change": -3,
          "health_change": 0,
          "requires_item": "Two-Way Radio"
        }
      ]
    },

    "second_net_radio": {
      "id": "second_net_radio",
      "art_scene": "nets",
      "text_variants": [
        "Base camp confirms: no prior surveys, no permitted access, no personnel at Wetland Site 7 in over a decade. They ask if you want to abort. You say no. You don't know why you say no. The word comes out before the thought forms, like someone else used your voice."
      ],
      "choices": [
        {
          "text": "Continue setting up the acoustic monitor",
          "next_node": "setup_acoustic",
          "sanity_change": -5,
          "health_change": 0
        }
      ]
    },

    "setup_acoustic": {
      "id": "setup_acoustic",
      "art_scene": "acoustic",
      "text_variants": [
        "You mount the acoustic detector on its tripod. It records ultrasonic frequencies and converts them to spectrograms — visual fingerprints of each bat species. You switch it on. The display populates immediately: multiple calls, overlapping, dense. High activity for this early in the survey window. You note it as a good sign. It is not a good sign."
      ],
      "choices": [
        {
          "text": "Check the spectrogram display more closely",
          "next_node": "acoustic_anomaly",
          "sanity_change": -3,
          "health_change": 0
        },
        {
          "text": "Leave it running and check the nets",
          "next_node": "bat_activity",
          "sanity_change": 0,
          "health_change": 0
        }
      ]
    },

    "acoustic_anomaly": {
      "id": "acoustic_anomaly",
      "art_scene": "anomalous_acoustic",
      "text_variants": [
        "You study the spectrogram. The call signatures don't match anything in your reference library — not the downward j-shaped sweeps of Eptesicus fuscus, not the bouncy curves of Lasiurus, not the sigmoidal sweeps of Myotis. The patterns are wrong. Not unidentified-species wrong. Wrong in the way that a word repeated too many times stops meaning anything — familiar components assembled into something that has never existed. And they repeat. The same sequence, over and over. Like something is saying the same sentence, waiting for a response.",
        "The spectrograms scroll across the display in a cascade. You scroll back through the recording history. The anomalous calls seem to begin exactly when your truck turned off the highway onto the access road. Whatever is making them knew you were coming before you arrived."
      ],
      "choices": [
        {
          "text": "Record the anomalous calls for later analysis and check the nets",
          "next_node": "bat_activity",
          "sanity_change": -8,
          "health_change": 0,
          "adds_flag": "recorded_calls"
        },
        {
          "text": "Switch off the display. You don't want to know.",
          "next_node": "bat_activity",
          "sanity_change": -4,
          "health_change": 0
        }
      ]
    },

    "bat_activity": {
      "id": "bat_activity",
      "art_scene": "nets",
      "text_variants": [
        "For twenty minutes: nothing. Then everything at once. Your headlamp catches the flicker of wings above the first net — one bat, two, a dozen, wheeling and diving in the gap between the trees. The survey is working. You tell yourself this is normal. You tell yourself you're relieved. Neither thought lands the way it should.",
        "A rush of activity over the pond surface — the bats are feeding, skimming the water, their echolocation clicks painting the air in frequencies you can't hear. You count at least eight individuals. Possibly more. The acoustic monitor's call rate indicator climbs steadily.",
        "The night comes alive. Wings everywhere, the soft percussion of bodies banking through still air, the occasional thud of a capture in the nets. You move between the nets with practiced efficiency. You are calm. You are competent. Enjoy this. It does not last."
      ],
      "choices": [
        {
          "text": "Check the nets for captures",
          "next_node": "first_capture",
          "sanity_change": 5,
          "health_change": 0
        },
        {
          "text": "Take a drink of water while you wait",
          "next_node": "water_bottle_beat",
          "sanity_change": 0,
          "health_change": 5,
          "requires_item": "Water Bottle"
        },
        {
          "text": "Check the acoustic detector — the call rate seems unusually high",
          "next_node": "acoustic_check_deep",
          "sanity_change": -3,
          "health_change": 0,
          "requires_item": "Headlamp"
        }
      ]
    },

    "water_bottle_beat": {
      "id": "water_bottle_beat",
      "art_scene": "nets",
      "text_variants": [
        "You unscrew the cap and drink. The water tastes wrong. Not bad — just wrong. Metallic. Like the air tasted when you first stepped out of the truck. You check the bottle: sealed this morning, same tap water you always use. You take another sip. There it is again. Copper and something underneath. The water tastes exactly like the air. Like the site recognized you and got into everything you brought with you.",
        "You drink. The water is cold and should be neutral and is neither. There is a taste to it — faint, mineral, geological. Like something deep underground has been slowly leaching up through the water table for a very long time. You think about the cave system marked on the topo map. You stop thinking about it and check the nets."
      ],
      "choices": [
        {
          "text": "Check the nets for captures",
          "next_node": "first_capture",
          "sanity_change": -5,
          "health_change": 5,
          "removes_item": "Water Bottle"
        }
      ]
    },

    "acoustic_check_deep": {
      "id": "acoustic_check_deep",
      "art_scene": "anomalous_acoustic",
      "text_variants": [
        "You lean over the detector display. The call rate is wrong — not high for a productive site, wrong in structure. The sequences repeat. Not individual bats calling as they hunt, but something broadcasting the same phrase over and over, modulating just slightly each iteration, like it's waiting for an echo back. Like it's mapping something. You realize the calls aren't coming from above the nets. They're coming from a fixed point in the tree line. Something is standing still and transmitting.",
        "The detector's directional indicator swings and locks — northeast, toward the deeper part of the wetland. The anomalous calls are point-source. Stationary. Whatever is making them isn't hunting. It isn't flying. It is rooted to one spot, broadcasting at you specifically, in a pattern that contains far too much structure to be biological noise."
      ],
      "choices": [
        {
          "text": "Put it down — get back to the nets",
          "next_node": "first_capture",
          "sanity_change": 0,
          "health_change": 0
        },
        {
          "text": "Follow the signal — it's coming from somewhere specific",
          "next_node": "follow_signal",
          "sanity_change": -8,
          "health_change": 0
        }
      ]
    },

    "follow_signal": {
      "id": "follow_signal",
      "art_scene": "dark_forest",
      "text_variants": [
        "You carry the detector like a compass, its indicator pulling you northeast through standing water and buttonbush. The call rate climbs with every meter. At thirty meters from the nets you stop. The calls are so dense on the display they've merged into a single white bar across the spectrogram. But you can't hear anything. The frequency is too high. It's inside your head, not outside it — a pressure behind your eyes that arrived so gradually you didn't notice it beginning.",
        "The undergrowth thins into a small clearing you don't remember seeing on the site map. The detector indicator locks. You're standing at the source. There's nothing here. No bat, no roost, no structure. Just an empty clearing with the faintest smell of ozone and wet mineral, and a sub-audible pulse that you feel in the cartilage of your ears more than you hear it. The detector screen glitches. For half a second it displays a spectrogram of a human voice saying your name."
      ],
      "choices": [
        {
          "text": "Turn back and get to the nets — something may have been caught while you were gone",
          "next_node": "first_capture",
          "sanity_change": -5,
          "health_change": 0
        },
        {
          "text": "Keep following — the signal is getting stronger",
          "next_node": "signal_source",
          "sanity_change": -12,
          "health_change": 0
        }
      ]
    },

    "signal_source": {
      "id": "signal_source",
      "art_scene": "dark_forest",
      "text_variants": [
        "You find it in a hollow between two limestone outcrops: nothing visible, but the detector is screaming. The display is a solid white rectangle. And then the pulses shift. They narrow. They focus. You feel the first one land on you like a finger pressed between your eyes — a single echolocation pulse, targeted, deliberate, reading the geometry of your skull. The ringing starts immediately. Not the dull tinnitus of loud noise. A tone. Clean and precise, like a tuning fork pressed against the bone behind your ear.",
        "The ringing has a pitch now. Then a second pitch — a harmony — and you understand with horrible clarity that you are being scanned. The pulses are mapping you. Every sinus cavity, every hollow behind your cheekbones, every air pocket in your inner ear. The cartilage of your outer ear feels warm. Then hot. You raise your hand to it and feel it moving under your fingers, reshaping, orienting — rotating, like a dish antenna, toward the source."
      ],
      "choices": [
        {
          "text": "Run — get away from the source NOW",
          "next_node": "signal_too_late",
          "sanity_change": -15,
          "health_change": -10
        },
        {
          "text": "Hold still — maybe it stops if you don't move",
          "next_node": "signal_too_late",
          "sanity_change": -20,
          "health_change": -5
        }
      ]
    },

    "signal_too_late": {
      "id": "signal_too_late",
      "art_scene": "dark_forest",
      "text_variants": [
        "It doesn't matter. The ringing has moved inward — past the outer ear, past the canal, into the architecture of your vestibular system. You take three steps and lose the horizon. The ground is somewhere but you can't find it with your feet. The pulses keep coming, methodical, thorough, and each one returns a slightly different echo as your anatomy changes to receive it better. You are being tuned. You are being improved. You drop the detector. You don't need it anymore. You can hear everything it could hear, and more — the shape of the trees in the dark, the depth of the water, the warm hollow of small mammals under the leaf litter. You open your mouth and a sound comes out that you have never made before. Something in the trees answers it immediately. It has been waiting for you to get the frequency right."
      ],
      "choices": [
        {
          "text": "Let it finish. Whatever is being done to you — let it finish.",
          "next_node": "ending_echolocated",
          "sanity_change": -20,
          "health_change": 0
        }
      ]
    },

    "first_capture": {
      "id": "first_capture",
      "art_scene": "bat_capture",
      "text_variants": [
        "Twenty minutes pass. Your headlamp catches movement in net three — something fluttering, tangled. You approach. A big brown bat, Eptesicus fuscus, wrapped in the lower shelf. Routine. You reach for your gloves.",
        "A soft chittering draws you to the second net. Your lamp illuminates a small body thrashing in the mesh — a tricolored bat, Perimyotis subflavus. Its tragus is distinctive, rounded. You've banded hundreds like it. Forearm 35mm, weight 6g, band 2.4mm.",
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
          "text": "Leave this one for now — something feels wrong. Check the other nets first.",
          "next_node": "second_capture",
          "sanity_change": -3,
          "health_change": 0
        }
      ]
    },

    "process_bat": {
      "id": "process_bat",
      "art_scene": "bat_capture",
      "text_variants": [
        "You extract the bat carefully, supporting its body. Forearm measurement. Weight. Sex. Age. Reproductive status. Everything by the book. You open your hand. It launches into the dark. Standard. But as it vanishes, you swear its wingbeat rhythm sounded like Morse code.",
        "You extract the bat carefully, supporting its body. Forearm measurement. Weight. Sex. Age. Reproductive status. As you release it, the bat doesn't fly away. It hangs from your glove and stares at you. Its eyes reflect your headlamp, but the reflection is the wrong color. Then it's gone."
      ],
      "choices": [
        {
          "text": "Move on — net two is close, and something was moving in it a moment ago",
          "next_node": "second_capture",
          "sanity_change": 0,
          "health_change": 0
        },
        {
          "text": "Drink some water and give yourself a moment — then net two needs checking",
          "next_node": "second_capture",
          "sanity_change": 2,
          "health_change": 5,
          "requires_item": "Water Bottle"
        }
      ]
    },

    "second_capture": {
      "id": "second_capture",
      "art_scene": "bat_capture",
      "text_variants": [
        "Net two has a capture — a little brown bat, Myotis lucifugus, tangled in the second shelf. You work it free with practiced fingers. But when you go to measure the forearm, the calipers won't close around it correctly. The arm is the right length. The arm is the wrong shape. Not broken — structured differently, with a joint that bends a direction forearms don't bend. You check the bat's band. It has one already. Aluminum, 2.4mm. Your agency's code. The band number is in sequence with the band you just put on the previous capture. You haven't banded this one yet.",
        "The capture in net two is a Myotis septentrionalis — a northern long-eared bat. Unremarkable. But the band already on its forearm stops you cold. You run the number. It comes back: banded at Wetland Site 7, twenty-three years ago. You hold the bat for a long moment. The bat holds very still, as though it has been waiting for you to do the math.",
        "The second capture is a species you don't immediately recognize — the fur color is wrong for everything in your regional guide, the tragus shape doesn't match. You photograph it. You run the measurements. Nothing matches. You've surveyed for fifteen years. You know every species in this range. This bat does not exist. It is in your hands. It echolocates at you once — a single pulse — and for one fraction of a second you see yourself from above, small and warm and glowing in the dark, surrounded by nets."
      ],
      "choices": [
        {
          "text": "Record the anomaly as precisely as you can, and release it — then check net three",
          "next_node": "third_net_check",
          "sanity_change": -5,
          "health_change": 0
        },
        {
          "text": "Take no measurements. Open your hand and let it go. Walk to net three without looking back.",
          "next_node": "third_net_check",
          "sanity_change": -8,
          "health_change": 0,
          "adds_flag": "net_in_water"
        },
        {
          "text": "Take a hair sample carefully, then release the bat and move on to net three",
          "next_node": "third_net_check",
          "sanity_change": -10,
          "health_change": -5,
          "adds_flag": "took_sample",
          "requires_item": "Banding Kit"
        }
      ]
    },

    "third_net_check": {
      "id": "third_net_check",
      "art_scene": "dark_forest",
      "text_variants": [
        "Net three is empty. But it's been disturbed. The lower two shelf strings are snapped — not tangled, not sagged, but cleanly broken under load. The breaks face outward, away from the water. Something large moved through this net from the inside out.",
        "Net three is down. The poles are still upright but the mesh is gone — not tangled in the vegetation, not on the ground. Gone. Thirty denier polyester doesn't just disappear. You find one shelf string still attached to the pole, trailing off into the dark toward the pond. You follow it two meters. It goes into the water. Something under the surface has the rest of the net. The water is still. It shouldn't be still with a net being pulled through it.",
        "Net three has been moved. Not tangled, not damaged — repositioned. The poles have been pulled from the substrate and replanted four meters farther into the tree line, the net re-strung between different trees with the same tension and hang angle you use. The new position faces the direction you came from. It's aimed at the parking area. At your truck. At you."
      ],
      "choices": [
        {
          "text": "Wade in and recover the net — it's agency equipment",
          "next_node": "ending_drowned",
          "sanity_change": 0,
          "health_change": 0,
          "requires_flag": "net_in_water"
        },
        {
          "text": "Leave the net in the swamp and keep working",
          "next_node": "wrong_sound",
          "sanity_change": -8,
          "health_change": 0,
          "requires_flag": "net_in_water"
        },
        {
          "text": "Collect your equipment and regroup at the truck — give the repositioned net a wide berth.",
          "next_node": "wrong_sound",
          "sanity_change": -5,
          "health_change": 0,
          "condition": "Only appears if not net_in_water"
        },
        {
          "text": "Keep checking the remaining nets",
          "next_node": "wrong_sound",
          "sanity_change": -8,
          "health_change": 0,
          "condition": "Only appears if not net_in_water"
        },
        {
          "text": "Check the future datasheet — does it mention net three?",
          "next_node": "wrong_sound",
          "sanity_change": -12,
          "health_change": 0,
          "requires_flag": "found_future_data"
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
      "flag_variant": {
        "requires_flag": "noted_silence",
        "text": "Then the frogs come back. All at once — every spring peeper, every chorus frog, every pickeral frog in the wetland, calling simultaneously. But they're all making the same call. One species' call, coming from every frog throat in the marsh. The wrong call, from wrong mouths, in perfect unison. They stop. The sub-audible frequency fills the void they leave."
      },
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
        },
        {
          "text": "That's enough. Abort the survey — get to the truck now.",
          "next_node": "ending_escape",
          "sanity_change": -5,
          "health_change": 0,
          "condition": "Only appears if sanity >= 20"
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
          "text": "Turn the radio off. Something is caught in the nets — you can hear the mesh straining from here.",
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
        "Net two has something in it. Something large. Too large for any bat species native to this continent. It hangs in the upper shelf, distending the mesh downward. Your headlamp illuminates a wingspan that shouldn't exist — three meters at least. The fur is wrong. It moves like oil. Behind you, the pond surface has gone white. Mist is building.",
        "You approach net one and stop. The entire net is full. Not tangled with multiple captures — full of one thing. It fills all four shelves. Its body is the wrong geometry. Wings that fold in directions that hurt to look at. It turns what might be a face toward your light. The air is thickening. Condensation is forming on every surface — your skin, the net poles, the mesh itself.",
        "The third net ripples with movement. Something enormous is tangled in all four shelves at once. Your headlamp reveals limbs — too many limbs — arranged in configurations your training in mammalian anatomy cannot reconcile. Fog is rising from the pond. You can feel it on the back of your neck."
      ],
      "choices": [
        {
          "text": "Approach it with your calipers. You're a scientist.",
          "next_node": "investigate_shape",
          "sanity_change": -15,
          "health_change": -10,
          "requires_item": "Calipers",
          "adds_flag": "infected"
        },
        {
          "text": "Step back slowly. Don't take your eyes off it.",
          "next_node": "glove_failure",
          "sanity_change": -10,
          "health_change": 0,
          "adds_flag": "infected"
        },
        {
          "text": "Turn off your headlamp. Maybe it hunts by light.",
          "next_node": "darkness_choice",
          "sanity_change": -20,
          "health_change": 0,
          "adds_flag": "infected"
        }
      ]
    },

    "glove_failure": {
      "id": "glove_failure",
      "art_scene": "creature",
      "text_variants": [
        "You back away — but your glove catches on an outstetched claw and tears. A clean rip across the palm. Your skin is exposed. The thing in the net turns toward your bare hand. It makes a sound at a frequency that seems designed specifically for the geometry of your skull. You feel it vibrate through the bones of your bare palm. A tingling spreads from the contact point — faint, electric, like a limb waking from numbness. You tell yourself it's adrenaline.",
        "You step back and the creature shifts its weight, one limb extending further than the mesh should allow. The tip of something — a claw, a finger, a structure with no name — grazes the back of your glove. The latex splits open. Your skin tingles where the air touches it. The tingling doesn't stop. It spreads. You look at your hand and see the faintest tracery of something beneath the skin — thread-thin, branching, moving toward your wrist."
      ],
      "choices": [
        {
          "text": "Snap on your spare glove and keep trying to untangle the creature",
          "next_node": "ending_merged",
          "sanity_change": -5,
          "health_change": -5,
          "removes_item": "Bat Handling Gloves",
          "adds_flag": "infected"
        },
        {
          "text": "Run, bare hands and all — into the treeline.",
          "next_node": "flee_to_treeline",
          "sanity_change": -10,
          "health_change": -5,
          "adds_flag": "infected"
        },
        {
          "text": "Hold your bare hand up under the headlamp — the tingling under the skin demands a closer look",
          "next_node": "check_hands",
          "sanity_change": -20,
          "health_change": -5,
          "adds_flag": "infected"
        }
      ]
    },

    "darkness_choice": {
      "id": "darkness_choice",
      "art_scene": "creature",
      "text_variants": [
        "You kill the headlamp. Total darkness. For three heartbeats: nothing. Then you understand your mistake. It doesn't hunt by light. It echolocates. And in the dark, without your light, you just became invisible to yourself — but not to it. You hear it extract itself from the net with a sound like tearing silk. It clicks at you once. The click tells it everything about you — your shape, your density, the speed of your blood. You have maybe five seconds."
      ],
      "choices": [
        {
          "text": "Turn the headlamp back on and run. Run into the mist.",
          "next_node": "the_mist",
          "sanity_change": -10,
          "health_change": -15
        },
        {
          "text": "Stand still. Do nothing. Wait it out for as long as you can.",
          "next_node": "ending_paralyzed",
          "sanity_change": -15,
          "health_change": -5
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
          "next_node": "after_fight",
          "sanity_change": -5,
          "health_change": 0
        },
        {
          "text": "Swing again. Don't stop.",
          "next_node": "ending_consumed",
          "sanity_change": -10,
          "health_change": -15
        }
      ]
    },

    "after_fight": {
      "id": "after_fight",
      "art_scene": "dark_forest",
      "text_variants": [
        "You put distance between yourself and the net. Ten meters. Twenty. You stop and look back. The net is empty — the creature is gone. In your hands, the aluminum pole is bent into a shape that has no structural explanation. You hit it once. The pole has five bends in it. You look at your hands, which are intact, which held the pole, which absorbed none of the force that created five bends in aircraft-grade aluminum. Behind you, the pond has begun to exhale. A low mist is forming over the water, moving toward the tree line faster than mist should move.",
        "You stop running and press your back against a tupelo trunk. Behind you, the net hangs slack and empty. The creature is gone. You look at the bent pole in your hands. The metal is warm — body-temperature warm, like it's been held in a fist for a long time. The bent section has a texture now that the rest of the pole doesn't — fine and regular, like scales. Like skin. You drop the pole. You do not pick it up again. The air around the pond has thickened. Mist is rolling off the water in sheets, and it has edges.",
        "Distance. Breath. You look at where you've been. The mist net is undamaged. The creature is gone. But both facts are somehow more frightening than the alternative. Gone where? Through the net without tearing it? You know exactly what thirty-denier polyester can and cannot pass. And the pond — the pond is breathing fog. A wall of mist is building at the water's edge, dense and directional, moving toward your nets."
      ],
      "choices": [
        {
          "text": "Move into the mist — staying in the open with it loose is worse",
          "next_node": "the_mist",
          "sanity_change": -8,
          "health_change": 0
        },
        {
          "text": "Head for the treeline while it's gone",
          "next_node": "flee_to_treeline",
          "sanity_change": -5,
          "health_change": 0
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
          "text": "Drop the calipers and run — into the trees, away from the nets, toward the road",
          "next_node": "flee_to_treeline",
          "sanity_change": -15,
          "health_change": 0,
          "removes_item": "Calipers"
        },
        {
          "text": "Use a spare mist-net pole to strike the creature. It's not from this world.",
          "next_node": "ending_consumed",
          "sanity_change": -25,
          "health_change": -10,
          "adds_flag": "chose_science"
        },
        {
          "text": "Back slowly away from the net — a strange mist is moving in from the pond",
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
      "flag_variant": {
        "requires_flag": "recorded_calls",
        "text": "The mist rolls in — and your acoustic detector fires. Not recording. Playing back. The anomalous calls you recorded earlier now broadcast into the fog at full volume. The mist stops moving. It listens. Then it answers. The spectrogram display whites out completely and does not come back. But the mist parts, just slightly, just enough. Whatever is inside heard its name called. It's coming toward you."
      },
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
          "text": "Check your datasheets — the future version might say what to do",
          "next_node": "use_datasheets",
          "sanity_change": -15,
          "health_change": 0,
          "requires_flag": "found_future_data",
          "requires_item": "Field Datasheets"
        },
        {
          "text": "Stay. You belong here now. You can feel it.",
          "next_node": "ending_absorbed",
          "sanity_change": -25,
          "health_change": -10,
          "condition": "Only appears if infected"
        },
        {
          "text": "Whatever is generating this came from underground. Push through the mist and find the source.",
          "next_node": "find_cave",
          "sanity_change": -25,
          "health_change": -10,
          "condition": "Only appears if not infected"
        }
      ]
    },

    "use_datasheets": {
      "id": "use_datasheets",
      "art_scene": "mist",
      "text_variants": [
        "You pull out the future datasheet. You scan the capture records. Thirty-two individuals. All routine. Then a final entry at the bottom, in handwriting that is yours but changed — shakier, or more deliberate, you can't tell which: 'Do not enter the cave. The cave is not a cave. The band number on the last capture is yours.' You check your wrist. You are not wearing a band. There is a pale ring of skin on your left forearm, a pressure mark, like something was there recently and was removed.",
        "You unfold the datasheet. At the bottom of the page, in increasingly small handwriting that spirals into the margin: 'It uses the nets because it learned from watching us. It has been watching since before the first survey. Check the oldest band number in the regional database. It is not a species.' The handwriting ends mid-word and resumes as something you cannot read.",
        "The last page is a species account. Formal, scientific. Author: your name. Journal: unknown. The abstract reads: 'We describe a new species of colonial chiropteran exhibiting recursive roosting behavior, echolocation-mediated cognition transfer, and indefinite individual persistence. Holotype: the collecting author.' The specimen number matches the band sequence you've been using tonight."
      ],
      "choices": [
        {
          "text": "Fold the datasheets away and run — toward the access road, away from whatever wrote this",
          "next_node": "flee_to_treeline",
          "sanity_change": -20,
          "health_change": 0
        },
        {
          "text": "Find the cave. Understand this.",
          "next_node": "find_cave",
          "sanity_change": -15,
          "health_change": 0
        }
      ]
    },

    "use_headlamp": {
      "id": "use_headlamp",
      "art_scene": "mist",
      "text_variants": [
        "You crank the headlamp to maximum. The beam cuts through the mist and for one terrible moment, you see everything — the canopy above is not branches. It has never been branches. It is a membrane of interlinked wings stretching to the horizon. It breathes.",
        "Full beam. The darkness doesn't retreat — it repositions. Your light reveals what was always there: the ground between the trees is covered in pellets. Not owl pellets. They contain tiny human bones. Tiny skulls with bat-like tragus growths.",
        "Your headlamp blazes. In the sudden brightness, every surface reveals itself to be covered in guano — but it's warm. Fresh. Falling from above in a gentle rain. You look up. The sky above the canopy is not sky. It is fur."
      ],
      "choices": [
        {
          "text": "Turn the lamp off and run — into the trees, toward the road, away from whatever is above you.",
          "next_node": "flee_to_treeline",
          "sanity_change": -20,
          "health_change": -10
        },
        {
          "text": "You need to understand this. Find the source.",
          "next_node": "find_cave",
          "sanity_change": -15,
          "health_change": 0
        },
        {
          "text": "Turn off the light. You've seen enough.",
          "next_node": "ending_absorbed",
          "sanity_change": -30,
          "health_change": 0,
          "condition": "Only appears if infected"
        },
        {
          "text": "Kill the light. Whatever is causing this is coming from underground — find it.",
          "next_node": "find_cave",
          "sanity_change": -30,
          "health_change": 0,
          "condition": "Only appears if not infected"
        }
      ]
    },

    "use_radio": {
      "id": "use_radio",
      "art_scene": "mist",
      "text_variants": [
        "You key the two-way radio. Static. Then, under the static, a voice — your voice — reading species measurements from a survey you haven't conducted yet. It lists species that don't exist. It describes morphologies that violate everything you know. It sounds happy.",
        "The radio crackles to life before you press the transmit button. A colleague's voice — but wrong. She's describing a capture in clinical detail: 'Specimen exhibits recursive skeletal structure. Every bone contains smaller bones. It's bones all the way down.' She laughs.",
        "You try the radio. Someone answers. They say your name. They say they've been waiting. They ask you to check your hands. You look at your hands. In the amber light, the skin looks thin. You can see something moving underneath."
      ],
      "choices": [
        {
          "text": "Throw the radio into the pond and run — toward the treeline, toward the road, away from here.",
          "next_node": "flee_to_treeline",
          "sanity_change": -15,
          "health_change": 0,
          "removes_item": "Two-Way Radio"
        },
        {
          "text": "Keep listening. Try to understand.",
          "next_node": "ending_absorbed",
          "sanity_change": -25,
          "health_change": 0,
          "condition": "Only appears if infected"
        },
        {
          "text": "The frequency is coming from underground. Follow it to the source.",
          "next_node": "find_cave",
          "sanity_change": -25,
          "health_change": 0,
          "condition": "Only appears if not infected"
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
        "You look. Under the skin of your left hand, something moves. Not veins — something with its own volition. It presses upward from beneath, forming ridges that look like wing bones. Patagium. You watch the membrane begin to form between your fingers, translucent and threaded with new blood vessels. It doesn't hurt. That's the worst part. It feels like it was always supposed to be there."
      ],
      "choices": [
        {
          "text": "Use the calipers to tear the membrane back — then run before it can grow again.",
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
          "text": "Whatever this is, it needs a hospital. Get to the truck. Get to the road. Go.",
          "next_node": "flee_to_treeline",
          "sanity_change": -15,
          "health_change": -10,
          "adds_flag": "infected"
        }
      ]
    },

    "flee_to_treeline": {
      "id": "flee_to_treeline",
      "art_scene": "flee",
      "text_variants": [
        "You run. Branches whip your face. Your headlamp beam bounces wildly, catching glimpses of things between the trees — hanging from branches like fruit, watching with too many eyes. The mist follows. It's faster than you.",
        "Your boots churn through standing water as you sprint. Behind you, the sound intensifies and you feel your thoughts begin to unspool. Your field datasheets blow from your vest like fleeing birds.",
        "You abandon your equipment and run. The forest closes around you. Every tree trunk you pass has something clinging to its bark, folded tight like roosting bats but shaped like collapsed origami of skin and bone."
      ],
      "choices": [
        {
          "text": "Keep running — find the truck",
          "next_node": "ending_absorbed",
          "sanity_change": -5,
          "health_change": -10,
          "condition": "Only appears if infected"
        },
        {
          "text": "Keep running — find the truck",
          "next_node": "ending_escape",
          "sanity_change": -5,
          "health_change": -10,
          "condition": "Only appears if not infected"
        },
        {
          "text": "Stop. Sit down. You're so tired.",
          "next_node": "ending_absorbed",
          "sanity_change": -20,
          "health_change": 0,
          "condition": "Only appears if sanity <= 30"
        },
        {
          "text": "Look for the cave entrance — the topo map showed one nearby",
          "next_node": "find_cave",
          "sanity_change": -10,
          "health_change": 0
        }
      ]
    },

    "find_cave": {
      "id": "find_cave",
      "art_scene": "dark_forest",
      "text_variants": [
        "You push through the undergrowth, following the terrain downward. The ground becomes softer, wetter. Then you see it — a depression in the earth, barely visible in your headlamp's dying beam. The air coming up from it is cold. Old cold. The kind that hasn't been warm since before anything alive was here to feel it."
      ],
      "choices": [
        {
          "text": "Approach the cave entrance",
          "next_node": "the_cave",
          "sanity_change": -5,
          "health_change": 0
        },
        {
          "text": "Turn back while you still can",
          "next_node": "flee_to_treeline",
          "sanity_change": -5,
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
        "A fissure in the earth. You shine your lamp inside. The walls are covered in hibernating bats, packed shoulder to shoulder — but they're all identical. Same species. Same individual. Thousands of copies of the same bat, and it has your face."
      ],
      "choices": [
        {
          "text": "Enter the cave",
          "next_node": "cave_descent",
          "sanity_change": -10,
          "health_change": -5
        },
        {
          "text": "Turn back. Find another way out.",
          "next_node": "ending_absorbed",
          "sanity_change": -10,
          "health_change": -15,
          "condition": "Only appears if infected"
        },
        {
          "text": "Turn back. Find another way out.",
          "next_node": "ending_escape",
          "sanity_change": -10,
          "health_change": -15,
          "condition": "Only appears if not infected"
        },
        {
          "text": "You came here to study bats. Study this.",
          "next_node": "cave_descent",
          "sanity_change": -15,
          "health_change": 0,
          "adds_flag": "chose_science"
        }
      ]
    },

    "cave_descent": {
      "id": "cave_descent",
      "art_scene": "cave",
      "text_variants": [
        "You descend. The limestone walls close around you, the temperature dropping with each meter. Your headlamp casts long shadows behind formations that look too regular — too bilateral, too symmetrical, as if the cave grew itself according to a body plan. Your footsteps echo wrong: the echo comes back before the sound leaves your mouth. The cave is anticipating you. At a narrow passage, you turn sideways to pass through. Your hand touches the wall. The rock is warm. It pulses once under your palm. A single slow pulse, like a heartbeat at rest.",
        "The descent takes longer than the cave's exterior dimensions should allow. The walls transition — limestone to something darker, smoother, organic in texture. You realize you can no longer hear the wetland above you. You cannot remember exactly when that stopped. At a widening in the passage, you find survey equipment. Not yours. Older. A canvas field bag, a glass-vial banding kit, a headlamp with an incandescent bulb. A datasheet in a format your agency discontinued in 1987. The capture records are filled out. The handwriting is yours.",
        "Deeper. The cave is not going down anymore — it is going somewhere that isn't a direction you have a word for. The walls have writing on them. Species accounts. Formal, scientific, dozens of them, carved into the rock face. Author on every one: your name. Publication dates spanning centuries. You read the most recent one. It describes tonight's survey. It is accurate in every detail up to this moment. It does not have an ending yet."
      ],
      "choices": [
        {
          "text": "Continue deeper — you have to see what's at the bottom",
          "next_node": "ending_cave",
          "sanity_change": -15,
          "health_change": -10,
          "condition": "Only appears if not chose_science"
        },
        {
          "text": "Turn back. Now. Before you can't.",
          "next_node": "ending_cave_lost",
          "sanity_change": -10,
          "health_change": -5,
          "condition": "Only appears if not chose_science"
        },
        {
          "text": "Continue deeper — there is data here that doesn't exist anywhere else",
          "next_node": "ending_cave",
          "sanity_change": -15,
          "health_change": -10,
          "condition": "Only appears if chose_science"
        },
        {
          "text": "Finish the species account on the wall. Add the ending.",
          "next_node": "ending_documented",
          "sanity_change": -20,
          "health_change": 0,
          "requires_flag": "chose_science"
        }
      ]
    },

    "ending_escape": {
      "id": "ending_escape",
      "type": "ending",
      "art_scene": "ending_escape",
      "text_variants": [
        "Dawn. You stumble onto the access road, covered in mud and blood that may not all be yours. Your equipment is gone. Your datasheets are full of writing you don't remember making — measurements of things that don't exist in any field guide. You will never enter a forest at night again. But in quiet moments, you still hear the frequency. And sometimes, when you close your eyes, you see wings.\n\n[ENDING: THE SURVIVOR — You escaped. Your body survived. The rest of you is still in the wetland.]",
        "You find the truck. The keys are where you left them. The engine starts. You drive. In the rearview mirror, the mist recedes. But the rearview mirror also shows you something sitting in the back seat — folded tight, patient, waiting. You don't look back again. You drive until sunrise.\n\n[ENDING: THE PASSENGER — You brought something back with you.]",
        "You reach the road at first light. Your hands are shaking so badly you can barely get the key in the ignition. As you pull onto the highway, your phone gets signal. Twelve missed calls from base camp. The voicemails are all the same — your voice, reading capture data, calm and professional, all night long. The last message was left four minutes ago. You are on the highway. You did not call.\n\n[ENDING: THE DUPLICATE — Someone finished the survey for you.]"
      ],
      "flag_variant": {
        "requires_flag": "took_sample",
        "text": "You make it to the truck as the sky greys in the east. Your hands are shaking but your vest pocket is not empty — the sample vial is still there, sealed, undamaged. The tissue inside is viable. You know this without testing it. Whatever was in that bat, whatever you extracted in the dark while something in the net watched you work, it survived the night intact. You have physical evidence. Peer-reviewable, reproducible, undeniable evidence of something that shouldn't exist.\n\nYou drive. At the on-ramp, you stop and hold the vial up to the grey morning light. The sample is the right color. The fixative is clear. Everything correct, everything preserved. You will have to explain where you got it. You will have to bring someone back here to verify the collection site. You will have to return to Wetland Site 7.\n\nYou put the truck in drive.\n\n[ENDING: THE SPECIMEN — You brought proof. Proof has consequences.]"
      },
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
        "Your sanity crumbles like wet field notes. You sit down in the shallow water and begin filling out your datasheets with perfect calm. Species: unknown. Morphology: impossible. Behavior: hunting. You record everything. Your handwriting changes. It becomes something else. Something older. You don't notice when the wings grow in.\n\n[ENDING: THE LAST DATASHEET — Science is observation. You became the observation.]",
        "The mist settles over you like a roost. You are not afraid. You cannot remember being afraid. You remember every survey you've ever conducted — every bat, every band number, every forearm measurement — and you understand that you were always measuring the wrong things. The echolocation clicks around you and you understand every word. They've been trying to tell you something for fifteen years. You finally have the ears to hear it.\n\n[ENDING: FLUENT — You learned the language. The cost was everything you were before.]"
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
        "The cave goes deeper than geology allows. At the bottom, there is no monster. There is a mirror. In it, you see yourself, but the reflection is hanging upside down. It mouths words: 'The survey is complete.' Your headlamp dies. In the perfect dark, you finally hear what the bats have always been saying.\n\n[ENDING: THE FREQUENCY — You heard the truth. You can never unhear it.]",
        "At the bottom of the cave, it is waiting. And it knows you. Not as prey — as a colleague. It has read every paper you've published. It gestures at the walls — your species accounts, centuries of them — and then at an empty section of wall. Blank stone. It offers you a tool for carving. You understand. There is one species left to describe. You have all the data you need. You begin to write.\n\n[ENDING: PEER REVIEW — The oldest mind on Earth asked you to co-author. You said yes.]"
      ],
      "choices": [
        {
          "text": "Begin again [Play Again]",
          "next_node": "__restart__",
          "action": "restart_game"
        }
      ]
    },

    "ending_cave_lost": {
      "id": "ending_cave_lost",
      "type": "ending",
      "art_scene": "ending_cave",
      "text_variants": [
        "You turn back. The passage behind you is where you left it — you're certain. You walk. You walk for longer than the descent took. The passage doesn't end. You try the other direction. You walk. You find a junction you don't remember passing. You choose left. You walk. You find the same junction. You choose right. You find the same junction. You stop and mark the wall with your calipers — a deep scratch at eye level — and walk again. You find the mark eleven minutes later, approached from the same direction you made it. The cave has no exits. It never did. It was never a cave. It was a throat that swallowed you whole, and now it's just waiting, with all the patience of limestone, for you to stop moving.\n\nYour headlamp battery dies somewhere in the eighth hour. In the dark, you navigate by echolocation. You don't remember learning how.\n\n[ENDING: THE MAZE — You tried to leave. The cave had other plans.]",
        "You turn around. The entrance should be forty meters back, uphill, cold air coming from above. You walk forty meters. You walk eighty. The temperature doesn't change. The air doesn't move. Your headlamp illuminates passage after passage, all of them identical in their wrongness — the walls too smooth, the floor too flat, the formations too symmetrical. You've been marking junctions with flagging tape from your vest. You find your own flagging tape on a junction you are certain you have never visited. The tape is old. It has been here longer than tonight. You reach up and touch it. Your handwriting. The label reads: WRONG WAY. You wrote this. You don't know when. You don't know how many times you've been here before.\n\n[ENDING: THE MAZE — You've done this before. You'll do it again.]"
      ],
      "choices": [
        {
          "text": "Wake up [Play Again]",
          "next_node": "__restart__",
          "action": "restart_game"
        }
      ]
    },

    "ending_documented": {
      "id": "ending_documented",
      "type": "ending",
      "art_scene": "ending_documented",
      "text_variants": [
        "You carve the last line of the species account into the wall. The cave exhales. Something in the rock clicks — a lock releasing — and a passage opens that wasn't there before. Outside air. Dawn light, grey and cold, filtering down through a fissure. You climb out into a field half a mile from your truck. Your datasheets are complete — thirty-two captures, all documented, plus one final entry in handwriting that is almost yours: a full species description, photographs you don't remember taking, tissue sample data, range maps, behavioral notes, everything needed for formal taxonomic recognition. A publishable paper. A career-defining paper. A paper that will require you to explain where you collected your specimens, and how, and whether you'd be willing to return to the site. You will publish it. You already know you will. The frequency hums in the base of your skull, patient and satisfied, all the way home.\n\n[ENDING: DOCUMENTED — You escaped with the data. Something let you. It wants to be known.]",
        "Dawn finds you on the access road, datasheets clutched to your chest. Everything is intact — every measurement, every observation, the acoustic recordings, even the tissue sample, still viable in its vial. You got out. Your hands are steady. Your mind is clear. The species description practically writes itself. Peer review will be brutal. The referees will demand you justify every claim. You will be able to. You will have evidence for all of it. You will spend the rest of your career answering questions about Wetland Site 7. You will never stop being right.\n\n[ENDING: THE PAPER — Science advances. Something in the dark advances with it.]"
      ],
      "choices": [
        {
          "text": "Publish the findings [Play Again]",
          "next_node": "__restart__",
          "action": "restart_game"
        }
      ]
    },

    "ending_darkness": {
      "id": "ending_darkness",
      "type": "ending",
      "art_scene": "ending_darkness",
      "trigger": "Battery reaches 0%",
      "text_variants": [
        "Your headlamp died hours ago. Or was it minutes? Time doesn't work the same in total darkness. You can't see your hand in front of your face. But you can hear them — thousands of wings in the canopy above. They speak in frequencies that bypass your ears entirely, resonating directly in your skull. They're teaching you their language. Noun: prey. Verb: hunt. Subject: you.\n\nYou don't remember sitting down, but you're on the ground now. The wetland water soaks through your clothes. It's warm. That's wrong. You reach out in the dark and touch something. It touches back. Too many fingers. They belonged to the last researcher who ran out of battery.\n\nOne of them leans close. Its breath smells like century-old guano and rotted fruit. It whispers: 'Welcome to the real survey.'\n\n[ENDING: CONSUMED BY DARKNESS — The light was all that kept you human.]"
      ],
      "choices": [
        {
          "text": "Wake up [Play Again]",
          "next_node": "__restart__",
          "action": "restart_game"
        }
      ]
    },

    "ending_drowned": {
      "id": "ending_drowned",
      "type": "ending",
      "art_scene": "drowning",
      "text_variants": [
        "You wade into the pond. The water is warmer than it should be. You reach for the tangled net — thirty denier polyester, agency property, your responsibility. Your fingers close on the mesh. Something closes on your ankle.\n\nYou have time to understand three things: First, the water is not three feet deep. It has no bottom. Second, the thing gripping your leg has been waiting in this exact spot since before you were born. Third, the net was bait.\n\nYou try to scream but water fills your mouth. The thing pulls you down. Your headlamp beam spirals upward through dark water, illuminating shapes that swim in formations that look like equations. Your last thought, as the light fades, is that you should have recorded this. The tissue sample alone would have been career-defining.\n\n[ENDING: DROWNED — You retrieved the net. The net retrieved you.]"
      ],
      "choices": [
        {
          "text": "Wake up [Play Again]",
          "next_node": "__restart__",
          "action": "restart_game"
        }
      ]
    },

    "ending_consumed": {
      "id": "ending_consumed",
      "type": "ending",
      "art_scene": "creature",
      "text_variants": [
        "You swing. The pole connects and this time the creature doesn't recoil — it wraps around the impact, absorbing the aluminum into itself like it's made of clay. The pole is gone. Your hands are empty. The creature unfolds from the net, its wingspan blotting out the trees behind it. It moves faster than anything that size should move. You don't have time to scream. Its mouth opens wider than physics allows and you see yourself reflected in concentric rings of teeth, each one carved with a band number you recognize. The last thing you understand is that you were always going to end up here. The survey was never yours.\n\n[ENDING: CONSUMED — You fought back. It was hungry.]"
      ],
      "choices": [
        {
          "text": "Wake up [Play Again]",
          "next_node": "__restart__",
          "action": "restart_game"
        }
      ]
    },

    "ending_echolocated": {
      "id": "ending_echolocated",
      "type": "ending",
      "art_scene": "dark_forest",
      "text_variants": [
        "By the time you understand what's happening, your inner ear has been restructured. Not damaged — improved. The ringing resolved hours ago into something else entirely: perfect spatial awareness, rendered in sound. You can hear the shape of the darkness. The depth of the water. The warm hollow of small mammals sheltering under the leaf litter twenty meters away. You can hear your own heartbeat echo off the trees and read the forest in its return.\n\nYou dropped the detector somewhere back there. You don't need it. You dropped the headlamp too — the light was noise, cluttering the picture. You navigate perfectly without it. You don't need the truck either, or the road, or any of the things you came with.\n\nYou roost at dawn in the canopy, folded tight and small and patient, your new ears cupped toward the wetland below. You don't remember the word for what you used to be. You don't need to. You can hear everything, forever, and the world is made entirely of sound.\n\n[ENDING: ECHOLOCATED — You followed the frequency. It followed you back. Inside.]"
      ],
      "choices": [
        {
          "text": "Wake up [Play Again]",
          "next_node": "__restart__",
          "action": "restart_game"
        }
      ]
    },

    "ending_merged": {
      "id": "ending_merged",
      "type": "ending",
      "art_scene": "ending_merged",
      "text_variants": [
        "Your gloved hands reach into the net. Professional instinct. You've done this a thousand times — support the body, avoid the wings, work the mesh free gently. The creature doesn't struggle. It watches you with eyes that contain depths. Your fingers find the first tangle point. The mesh has wrapped around what should be a wing joint but isn't — the anatomy is wrong, recursive, folding into itself in ways that hurt to parse.\n\nYou feel it before you see it. The boundary between your glove and the creature's fur stops being a boundary. The latex doesn't tear. It merges. Becomes porous. You watch your hand sink into the creature's body like it's sinking into warm mud, except there's no resistance, no sensation of entry, just the horrible understanding that where you end and it begins is no longer a meaningful distinction.\n\nYou try to pull back. Your arm is in up to the elbow now. The creature makes a sound — not distress, satisfaction. Recognition. You were always going to do this. Every bat you've ever handled was practice for this moment. Your other hand reaches out on its own — no, you reach out, you've always wanted to understand, to know, to merge data and specimen until there's no difference.\n\nThe last thought that is purely yours: the mesh isn't tangled. It never was. The net caught exactly what it was designed to catch.\n\n[ENDING: INTEGRATED — The survey found its final data point. You.]"
      ],
      "choices": [
        {
          "text": "Wake up [Play Again]",
          "next_node": "__restart__",
          "action": "restart_game"
        }
      ]
    },

    "ending_paralyzed": {
      "id": "ending_paralyzed",
      "type": "ending",
      "art_scene": "ending_paralyzed",
      "text_variants": [
        "You turn the headlamp back off. Then on. Then off. Then on. The creature is still in the net, ten meters away, motionless. It hasn't moved. You haven't moved. The mist hasn't moved. Everything has stopped except your heartbeat, which sounds deafening in the new silence.\n\nYou wait. Professional protocol: if you can't identify the species, observe. Document. Give it time. The creature's eyes catch your headlamp beam and hold it, pupils dilating to impossible widths. You can see yourself reflected in them — multiple copies, slightly offset, like you're being viewed through compound insect eyes that happen to be shaped like mammalian ones.\n\nTime becomes strange. You know you've been standing here — how long? Minutes? Hours? Your legs don't ache. You're not cold despite standing motionless in the wetland air. The creature blinks. All its eyes blink in sequence, left to right, a cascading wave of closures that takes three full seconds to complete. You count them. Forty-seven eyes. That's impossible. It only has two. You counted wrong. You count again. Seventy-three.\n\nYour hands are at your sides. When did you lower them? Your headlamp is pointed at the ground now. When did you look away? The creature is closer. You didn't see it move but it's closer. Three meters now. Close enough to hear it breathing — a wet, whistling sound through apertures that aren't a nose. It clicks once. You understand: it wasn't hunting you. It was waiting for you to understand that you'd already been caught. The waiting was the trap.\n\nYou've been standing here since you arrived. The rest — the nets, the captures, the survey — that was all permission you granted yourself to approach. Everything you did tonight was walking into this clearing and standing still while something decided whether you were interesting enough to keep.\n\nIt decides. You don't move. You can't remember how.\n\n[ENDING: THE VIGIL — You waited. It waited longer. You're both still waiting.]"
      ],
      "choices": [
        {
          "text": "Wake up [Play Again]",
          "next_node": "__restart__",
          "action": "restart_game"
        }
      ]
    },

    "battery_dead": {
      "id": "battery_dead",
      "art_scene": "battery_dead",
      "text_variants": [
        "The headlamp flickers — amber to brown to nothing. The darkness doesn't arrive. It was already here, held back by a failing bulb and three ounces of lithium. Now it rushes in from every direction at once, filling your skull through your eyes. You can't see your hands. You can't see the ground. But you can hear them — wingbeats, dozens of them, circling tighter, and beneath the wingbeats a clicking that maps the shape of your body in the dark with surgical precision. They know exactly where you are. They have always known. The light was the only thing that made them wait.",
        "The beam dims, stutters, and dies. Total darkness. Not the darkness of a room with the lights off — the darkness of deep water, of cave systems, of closed eyes that will never open again. The wetland sounds rush in to fill the space the light occupied: wingbeats overhead, the soft percussion of bodies banking through air you can no longer see, and beneath it all a frequency that hums in your jaw and your fillings and the fluid of your inner ear. Something lands on the net pole three feet to your left. You hear its claws tighten on the aluminum. It clicks at you once. The click tells it everything.",
        "Click. Click. Nothing. Your headlamp is dead. The darkness is absolute and immediate and alive. Around you, the wetland reorganizes itself for a world without light — the bats don't need it, never needed it, and now neither does whatever else is circling in the canopy above the nets. You hear the mesh of the nearest mist net strain under a sudden weight. Then another net. Then a sound from behind you that is not a bat and not a frog and not anything in your fifteen years of field experience. Your hands find your vest pockets by feel. You have seconds."
      ],
      "choices": [
        {
          "text": "Swap in the spare battery — fumble it out of your vest and slam it home",
          "next_node": "__resume_previous__",
          "sanity_change": -10,
          "health_change": 0,
          "requires_item": "Spare Battery",
          "removes_item": "Spare Battery",
          "battery_restore": 100
        },
        {
          "text": "Swap in the partial spare — it's half-dead but it's something",
          "next_node": "__resume_previous__",
          "sanity_change": -10,
          "health_change": 0,
          "requires_item": "Partial Spare Battery",
          "removes_item": "Partial Spare Battery",
          "battery_restore": 40
        },
        {
          "text": "You have nothing. The dark closes in.",
          "next_node": "ending_darkness",
          "sanity_change": -10,
          "health_change": 0,
          "condition": "Only appears if no spare batteries"
        }
      ]
    }

  }
};

// =========================================================
// GAME ENGINE — reads from STORY_DATA
// =========================================================

export function getSceneText(sceneId, flags = {}) {
  const node = STORY_DATA.story_nodes[sceneId];
  if (!node) return "The darkness swallows everything.";

  // Check for flag variant first (supports single flag or array of flags)
  if (node.flag_variant) {
    const requiredFlags = node.flag_variant.requires_flags || [node.flag_variant.requires_flag];
    const hasAllFlags = requiredFlags.every(flag => flags[flag]);
    if (hasAllFlags) {
      return node.flag_variant.text;
    }
  }

  if (node.text_variants && node.text_variants.length > 0) {
    // third_net_check: show pond variant (index 1) only if net_in_water flag is set,
    // otherwise randomly pick from non-pond variants (0 and 2)
    if (sceneId === 'third_net_check') {
      if (flags.net_in_water) {
        return node.text_variants[1];
      } else {
        return node.text_variants[Math.random() < 0.5 ? 0 : 2];
      }
    }
    if (sceneId === 'cave_descent') {
      if (flags.chose_science) {
        return node.text_variants[2];
      } else {
        return node.text_variants[Math.floor(Math.random() * 2)];
      }
    }
    const idx = Math.floor(Math.random() * node.text_variants.length);
    return node.text_variants[idx];
  }

  return "The darkness presses closer.";
}

export function getSceneChoices(sceneId, health, sanity, inventory, flags = {}) {
  const node = STORY_DATA.story_nodes[sceneId];
  if (!node || !node.choices) return [];

  return node.choices.filter(choice => {
    // Item requirements
    if (choice.requires_item && !inventory.includes(choice.requires_item)) {
      return false;
    }

    // Flag requirements
    if (choice.requires_flag && !flags[choice.requires_flag]) {
      return false;
    }

    // Condition string parsing
    if (choice.condition) {
      const c = choice.condition.toLowerCase();
      if (c.includes("sanity <= 30") && sanity > 30) return false;
      if (c.includes("health <= 30") && health > 30) return false;
      if (c.includes("sanity >= 20") && sanity < 20) return false;
      if (c.includes("not infected") && flags.infected) return false;
      if (c.includes("infected") && !c.includes("not infected") && !flags.infected) return false;
      if (c.includes("not chose_science") && flags.chose_science) return false;
      if (c.includes("chose_science") && !c.includes("not chose_science") && !flags.chose_science) return false;
      if (c.includes("not net_in_water") && flags.net_in_water) return false;
      if (c.includes("net_in_water") && !c.includes("not net_in_water") && !flags.net_in_water) return false;
      if (c.includes("no spare batteries")) {
        if (inventory.includes("Spare Battery") || inventory.includes("Partial Spare Battery")) return false;
      }
    }

    return true;
  });
}

export function getSceneArt(sceneId) {
  const node = STORY_DATA.story_nodes[sceneId];
  return node?.art_scene || "dark_forest";
}

export function getSceneType(sceneId) {
  const node = STORY_DATA.story_nodes[sceneId];
  return node?.type || null;
}

export function getInitialState() {
  return {
    health: STORY_DATA.initial_state.health,
    sanity: STORY_DATA.initial_state.sanity,
    battery_level: STORY_DATA.initial_state.battery_level,
    inventory: [...STORY_DATA.initial_state.starting_inventory],
    currentScene: STORY_DATA.initial_state.starting_scene,
    flags: {},
    turnCount: 0,
    pending_scene: null
  };
}

export function applyChoice(state, choice) {
  const newState = { ...state };

  // Apply stat changes
  newState.health = Math.max(0, Math.min(100, state.health + (choice.health_change || 0)));
  newState.sanity = Math.max(0, Math.min(100, state.sanity + (choice.sanity_change || 0)));
  newState.turnCount = state.turnCount + 1;

  // Battery drain per turn
  newState.battery_level = Math.max(0, state.battery_level - 10);

  // Remove items
  if (choice.removes_item) {
    newState.inventory = state.inventory.filter(i => i !== choice.removes_item);
  }

  // Battery restore on choice (applied after drain)
  if (choice.battery_restore) {
    newState.battery_level = choice.battery_restore;
  }

  // Add flags from choice
  if (choice.adds_flag) {
    newState.flags = { ...newState.flags, [choice.adds_flag]: true };
  }

  // Battery just died this turn — intercept and route to battery_dead scene
  if (newState.battery_level <= 0 && state.battery_level > 0) {
    newState.pending_scene = choice.next_node;
    newState.currentScene = "battery_dead";
    return newState;
  }

  // Resume after battery swap
  if (choice.next_node === "__resume_previous__") {
    newState.currentScene = state.pending_scene || state.currentScene;
    newState.pending_scene = null;
    return newState;
  }

  // Auto-endings based on stats
  if (newState.health <= 0) {
    newState.currentScene = "ending_absorbed";
  } else if (newState.sanity <= 0) {
    newState.currentScene = "ending_absorbed";
  } else if (choice.next_node === "__restart__") {
    return getInitialState();
  } else {
    newState.currentScene = choice.next_node;
  }

  return newState;
}