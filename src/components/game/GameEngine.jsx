// Core game state and story data
const STARTING_INVENTORY = [
  "Headlamp",
  "Field Datasheets",
  "Bat Handling Gloves",
  "Mist Net Poles (x4)",
  "Calipers",
  "Banding Kit",
  "Water Bottle",
  "Two-Way Radio"
];

const SCENE_VARIANTS = {
  arrival: [
    "The truck's headlights die. You step out into darkness so complete it feels solid against your skin. The wetland air is thick — a cocktail of rotting vegetation and something faintly metallic you can't place.",
    "Your boots sink into soft earth as you exit the vehicle. The canopy above swallows every photon of moonlight. The air tastes wrong tonight — copper and wet moss and something underneath both.",
    "The engine ticks as it cools. Around you, the forest wetland breathes in humid exhalations. Your headlamp carves a pitiful cone of amber through the dark. The frogs have stopped calling."
  ],
  setup_nets: [
    "You begin furling out the first mist net between two tupelo trunks. The 12-meter polyester mesh unfolds like a black widow's web. Your practiced hands find the shelf strings in the dark. The net hangs perfectly — four shelves of nearly invisible death for anything with wings.",
    "The mist net poles slide into the soft substrate with satisfying thuds. You tension the guy lines and begin draping the nets. Thirty-denier polyester, nearly invisible even in daylight. In this darkness, the nets cease to exist entirely. You know they're there only by touch.",
    "Net one goes up clean. Net two snags on a branch and you have to untangle it, fingers working the mesh by feel alone. You set up a third net near the pond edge, tensioning the lines carefully in the dark."
  ],
  second_net: [
    "Moving to the second net site, your headlamp catches something in the undergrowth. Equipment. Field vest. Datasheets in a waterproof case. Someone else's gear. But the schedule showed no survey before yours. You check the datasheets: Site 7, same location, dated three weeks ago. The handwriting becomes illegible halfway through, devolving into repeated symbols that hurt to look at.",
    "You position the poles for net two and nearly trip over something. A backpack. Field equipment scattered around it like someone left in a hurry — or was taken. The radio is still on, battery dead, the last transmission frozen on the display: DONT COME HERE.",
    "The second net location has been used recently. Fresh pole holes in the soft earth. But your supervisor told you this site hasn't been surveyed in six months. Someone was here. Whoever it was left everything behind. Including their headlamp. It still has battery. Why would anyone leave their headlamp?"
  ],
  bat_activity: [
    "Twenty minutes of perfect survey conditions. Echolocation calls fill the detector — big browns, reds, silvers. Normal species, normal frequencies. You relax into the routine. This is what you trained for. The detector chirps steadily. Forty-two calls per minute. Fifty. Sixty. That's... a lot of bat activity for this temperature.",
    "Your acoustic monitor shows a beautiful spectrogram. Multiple species, all behaving exactly as expected. Eastern red bats commuting to foraging areas. Big browns checking the nets at distance. This is good data. This is why you became a bat biologist. The detector's counter climbs: 100 calls. 150. 200. That can't be right.",
    "Everything is normal. Beautifully, perfectly normal. The bats are active, the nets are set, your equipment is functioning. You take a water break and check your datasheets. All routine observations. The only odd thing is the call rate — your detector is logging 300+ calls per minute now. That would require hundreds of bats in immediate proximity. Your headlamp shows empty sky."
  ],
  acoustic_anomaly: [
    "You check the acoustic detector. The call rate has spiked to 500 per minute. Impossible concentration. You adjust the gain, thinking it's a malfunction. The calls keep coming. And they're all identical. The same frequency, the same duration, the same pattern. Like a recording being played back. But there are no speakers out here. Just trees. And wings.",
    "The detector's spectrogram has stopped updating. The screen is full, every pixel occupied by calls. The buffer can't keep up. You've never seen bat activity like this. No one has. This is publication-worthy data. If it's real. You listen to the headphones. The calls have rhythm. Structure. Like they're saying something.",
    "You lean close to the detector screen. The patterns in the spectrogram aren't random. They repeat. Same sequence every 15 seconds. Call-pause-call-pause-call. Like Morse code. Like language. You're a scientist. You don't believe in coincidences. But you also don't believe bats can count."
  ],
  second_capture: [
    "Net two has a capture. A hoary bat — Lasiurus cinereus. Beautiful specimen. But it shouldn't be here. Hoarys don't occur in this watershed. You check the band. Already banded. Old aluminum, pre-1985 style. The date stamp reads 1974. This bat would be over 50 years old. The longevity record for the species is 8.",
    "You extract the bat from net two. Northern long-eared — Myotis septentrionalis. Common species. Everything seems normal. Forearm measurement: 42mm. You write it down. Then you measure again to be sure. 38mm. Third measurement: 45mm. Your calipers are working fine. You check them against your thumb. Consistent. The bat's forearm is changing length.",
    "A red bat in the second net, glowing rust-colored in your headlamp. Textbook example. You've banded dozens. This one looks wrong somehow. The proportions are off by millimeters. You measure it. All standard. But it has six toes on its left foot. Bats have five. You count again. Six. Each one with a tiny human fingernail."
  ],
  third_net_check: [
    "Net three is torn. Not caught on anything — torn. Cleanly, from the center, the mesh pushed outward like something emerged from inside it. That's impossible. Things get caught in nets from outside. The force required to tear 30-denier polyester from within would mean... something was inside the net pocket. Living in the net.",
    "You approach the third net. It's moving. The whole net ripples despite no wind. As you get closer you see why: the mesh is full of holes. Hundreds of them. Each one perfectly circular, burned through the polyester. Some are still smoking. No fire. No scorching. Just absence, like the material ceased to exist.",
    "The third net is destroyed. Shredded. Something went through it — through all four shelves at once. The tears radiate from a central impact point. Whatever hit the net was traveling fast. And it was big. You find pieces of the mesh scattered 20 meters away. Some are embedded in tree trunks. The nets are only stressed to 8kg breaking strength."
  ],
  glove_failure: [
    "Your handling glove tears during the extraction. Just splits along the seam. Now your bare hand is touching it. Bat handling protocol is clear: never make skin contact. Rabies. Histoplasmosis. Lyssavirus. You pull back but it's too late. The creature's fur is cold. Impossibly cold. The cold travels up your arm. In your veins.",
    "The glove doesn't tear. It dissolves. You watch the leather break down at molecular speed where the creature touches it, reducing to ash. Your exposed hand makes contact. The skin doesn't burn. It changes. For just a moment, you can see through your hand. See the bones. See something moving between the bones.",
    "When you grab it, the glove's seams fail. Your finger brushes its wing. Electric shock — no, not shock. Information. You see through its eyes: the canopy from below. The world in ultrasound, rendered in clicks and echoes. You see yourself through its echolocation. Your skeleton. Your skull. The shape of your thoughts."
  ],
  after_fight: [
    "You're holding the bent pole. The aluminum is deformed in a way that requires hydraulic force. You did this with your arms. Adrenaline. Survival reflex. That's what you tell yourself. The creature is gone but you can still hear it, somewhere in the dark, circling. Waiting. The pole is warm. It shouldn't be warm.",
    "The pole fell somewhere during the fight. You find it by the pond, half-submerged. The end that struck the creature isn't bent. It's twisted, like it was made of clay and something grabbed it and wrung it out. The metal has fingerprints in it. Not human fingerprints. Too many ridges. Too many fingers.",
    "You lean against a tree, breathing hard. Your hands are shaking. The pole is at your feet. You don't remember dropping it. Where you hit the creature, the aluminum has corroded, green patina spreading like infection. That patina formation takes decades. You hit it 30 seconds ago."
  ],
  water_bottle: [
    "You unclip your water bottle and drink. The water tastes wrong. Metallic. Copper. Like the air when you first arrived. But the bottle was sealed. You brought it from home. The taste intensifies. Your tongue goes numb. You look at the water. It's normal. Clear. When you hold it up to your headlamp, there's something floating in it. Something moving.",
    "Dehydration is dangerous. You remember your training. You drink. The water slides down your throat cold and wrong. It tastes like cave air. Like guano. Like it's been sitting in darkness for a thousand years. You bought this bottle at a gas station six hours ago.",
    "The water hits your stomach and you feel it spread through you. Not hydration. Something else. You can trace its path through your body. Your veins light up with cold. The metallic taste is in your sinuses now, your brain. You look at the bottle. The label has changed. The brand is written in a language with too many consonants."
  ],
  use_datasheets: [
    "You pull out your datasheets to record the anomaly. Your handwriting has changed. Mid-sentence, the letters shift, become angular, geometric. You don't remember writing this. You flip back through previous entries. The change started hours ago, gradually, each page more alien than the last. The most recent entry isn't in any alphabet you know.",
    "The datasheets are full. But you've only logged three captures. You flip through: pages and pages of data, species descriptions, measurements. None of it is yours. The handwriting looks like yours but the content is impossible. Specimen 4,782. Specimen 9,101. You've been here 90 minutes. The date on the top of each page changes. Some are dated next week.",
    "You reach for your datasheet to log the mist observation. Your hand is shaking. You write: 'Anomalous fog formation, non-meteorological origin.' The words come out backward. You're writing right to left. But you're not. Your hand is moving left to right. The pencil is writing reality wrong."
  ],
  use_banding_kit: [
    "You still have one band left in the kit — aluminum size 4. Standard protocol: band the specimen, release it, track recapture. You approach the creature in the net. Maybe if you treat it like a bat, it will act like a bat. You reach for its forearm. Your hand passes through it. Not intangible. The opposite. Too solid. Your hand doesn't belong in the same space.",
    "The banding kit is open in your palm. Tiny aluminum rings, each stamped with a unique ID number. You look at them in the amber light. The numbers are moving. Rearranging. You blink. Band 2847-96420 reads 0000-00000. They all read zeros now. The aluminum is cold enough to stick to your skin.",
    "You try to band it. Protocol is protocol. You fit the aluminum ring around its forearm and squeeze the applicator. The band doesn't close on the bat. The bat closes on the band. Absorbs it. You watch the aluminum disappear into its fur like water into sand. In the place where the band was, your reflection looks back at you from the creature's limb."
  ],
  first_capture: [
    "Twenty minutes pass. Your headlamp catches movement in net three — something fluttering, tangled. You approach. A big brown bat, Eptesicus fuscus, wrapped in the lower shelf. Routine. You reach for your gloves.",
    "A soft chittering draws you to the second net. Your lamp illuminates a small body thrashing in the mesh — a tricolored bat, Perimyotis subflavus. Its tragus is distinctive, rounded. You've banded hundreds like it.",
    "The first net has a capture. You approach carefully and find a red bat — Lasiurus borealis — its fur brilliant even in lamplight. Perfectly routine. Perfectly normal. For now."
  ],
  wrong_sound: [
    "Then you hear it. Not echolocation — you know every frequency signature in these woods. This is lower. Sub-audible. You feel it in your molars before your ears register it. The water in the nearby pond begins to vibrate in concentric circles with no wind to explain them.",
    "Between net checks, a sound reaches you that shouldn't exist. It's below the range of any chiropteran call you've catalogued. It resonates in your chest cavity like a second heartbeat. Your headlamp flickers once.",
    "The silence comes first. Every frog, every insect, every rustling thing in the understory goes mute simultaneously. Then the sound fills the void — a frequency that makes your fillings ache and your vision swim at the edges."
  ],
  wrong_sound_frogs: [
    "The silence you noted earlier breaks. The frogs come back. All of them. All at once. But they're calling the same call. Not the same species call — the same individual call, perfectly synchronized. Two hundred frogs producing one voice. The voice says your name. Your full name. Including your middle name that you never use."
  ],
  cave_interior: [
    "You're inside now. The cave mouth closes behind you — not literally, just psychologically. The point of no return. Your headlamp reveals walls that sweat. The floor descends at exactly 15 degrees, carved smooth. This isn't a natural cave. It's a throat. You can still leave. The entrance is right there. Behind you. Getting smaller.",
    "Twenty meters in, your headlamp catches something on the wall. Writing. Not carved — grown into the stone like tree rings. You recognize some of the languages. Latin. Proto-Germanic. Sumerian. The newest inscription is in English, dated last month: 'COUNT THE SHELVES.' You don't understand. There are four shelves in a mist net. Everyone knows that.",
    "The cave breathes. You feel the air pressure change with each exhale. In-out. In-out. You're walking in time with its rhythm. You try to stop. Your feet keep moving. The walls are covered in taxonomy — species names written in every language humans have ever spoken. At the bottom of the list, one entry remains blank."
  ],
  ending_documented: [
    "You make it out. You make it to the truck. You drive to the nearest university. Your datasheets are complete. Every observation recorded with scientific rigor. The morphology measurements. The behavior notes. The acoustic data. Peer review will be brutal but the evidence is undeniable. You have documented a new species.\n\nYou submit the paper. Nature publishes it. The discovery of the century. You become famous. Speaking tours. Interviews. You tell everyone where to find them. You give them maps. GPS coordinates. Instructions.\n\nMore researchers go to Site 7. All of them come back. All of them bring datasheets. All of them report success. The species is spreading. Adapting. Learning. You check your citation count: 10,000 papers have referenced your work. The things you discovered are teaching others how to find humans.\n\nThe last line of your published paper reads: 'Further study is recommended.' You don't remember writing that line. You remember wanting to write 'Don't go there.' But that's not what appeared on the page.\n\n[ENDING: THE DOCUMENTED — You advanced science. Science advanced something else.]"
  ],
  wrong_shape_net: [
    "Net two has something in it. Something large. Too large for any bat species native to this continent. It hangs in the upper shelf, distending the mesh downward. Your headlamp illuminates a wingspan that shouldn't exist — three meters at least. The fur is wrong. It moves like oil.",
    "You approach net one and stop. The entire net is full. Not tangled with multiple captures — full of one thing. It fills all four shelves. Its body is the wrong geometry. Wings that fold in directions that hurt to look at. It turns what might be a face toward your light.",
    "The third net ripples with movement. Something enormous is tangled in all four shelves at once. Your headlamp reveals limbs — too many limbs — arranged in configurations your training in mammalian anatomy cannot reconcile."
  ],
  investigate_shape: [
    "You step closer, calipers still in hand. Professional instinct overrides the screaming in your hindbrain. The creature's tragus isn't a tragus — it's something that unfolds as you watch, revealing structures beneath that look like they were designed by something that had only heard of ears described secondhand. Its echolocation clicks at you. You understand them.",
    "Your gloved hand reaches toward it. Up close, the fur resolves into something else — thousands of filaments that each end in a structure like a closed eye. Some of them open as your headlamp passes over them. The creature's mouth opens. It has human teeth. Your teeth.",
    "The calipers tremble in your hand as you attempt a measurement. Forearm length: impossible. The number keeps changing because the arm keeps growing. The creature looks at you with eyes that contain depth — not reflective like a normal bat's eyeshine. These eyes go inward, into distances that shouldn't fit inside a skull."
  ],
  the_mist: [
    "Mist rolls in from the pond. But it doesn't move like mist — it has edges, borders, intentionality. Where it touches the furled nets, the mesh dissolves. Where it touches your skin, you see memories that aren't yours: a vast dark space, the sound of ten million wings, a hunger older than the first mammal.",
    "A wall of fog advances through the trees. Inside it, shapes fly — dozens, hundreds. Their wingbeats create a subsonic rhythm that makes your nose bleed. The mist smells like formaldehyde and loam and the inside of a cave that has never known light.",
    "The mist arrives without weather to explain it. It clings to the water's surface like a living membrane. Inside, you see the silhouettes of things that fly without wings. They spiral upward in patterns that look like equations written in a language of motion."
  ],
  flee_to_treeline: [
    "You run. Branches whip your face. Your headlamp beam bounces wildly, catching glimpses of things between the trees — hanging from branches like fruit, watching with too many eyes. The mist follows. It's faster than you.",
    "Your boots churn through standing water as you sprint. Behind you, the sound intensifies — that wrong frequency — and you feel your thoughts begin to unspool. Your field datasheets blow from your vest like fleeing birds.",
    "You abandon your equipment and run. The forest closes around you. Every tree trunk you pass has something clinging to its bark, folded tight like roosting bats but shaped like collapsed origami of skin and bone."
  ],
  use_radio: [
    "You key the two-way radio. Static. Then, under the static, a voice — your voice — reading species measurements from a survey you haven't conducted yet. It lists species that don't exist. It describes morphologies that violate everything you know. It sounds happy.",
    "The radio crackles to life before you press the transmit button. A colleague's voice — Sarah from the lab — but wrong. She's describing a capture in clinical detail: 'Specimen exhibits recursive skeletal structure. Every bone contains smaller bones. It's bones all the way down.' She laughs.",
    "You try the radio. Channel 7, your team's frequency. Someone answers. They say your name. They say they've been waiting. They ask you to check your hands. You look at your hands. In the amber light, the skin looks thin. You can see something moving underneath."
  ],
  use_headlamp: [
    "You crank the headlamp to maximum. The beam cuts through the mist and for one terrible moment, you see everything — the canopy above is not branches. It has never been branches. It is a membrane of interlinked wings stretching to the horizon. It breathes.",
    "Full beam. The darkness doesn't retreat — it repositions. Your light reveals what was always there: the ground between the trees is covered in pellets. Not owl pellets. They contain tiny human bones. Tiny human skulls with bat-like tragus growths.",
    "Your headlamp blazes. In the sudden brightness, every surface reveals itself to be covered in guano — but it's warm. Fresh. Falling from above in a gentle rain. You look up. The sky above the canopy is not sky. It is fur."
  ],
  the_cave: [
    "You find it — or it finds you. A sinkhole in the limestone, breathing cold air upward. The entrance is ringed with bones arranged in taxonomic order. Every species you've ever banded. Below, in the dark, something enormous shifts its weight and the ground trembles.",
    "The cave mouth opens before you where no cave existed on any geological survey. Its entrance is shaped like a cross-section of a bat's ear canal. From within, echolocation pulses emerge at frequencies that carry meaning: come in, come in, come in.",
    "A fissure in the earth. You shine your lamp inside. The walls are covered in what looks like hibernating bats, packed shoulder to shoulder — but they're all identical. Same species. Same individual. Thousands of copies of the same bat, and it has your face."
  ],
  ending_escape: [
    "Dawn. You stumble onto the access road, covered in mud and blood that may not all be yours. Your equipment is gone. Your datasheets are full of writing you don't remember making — measurements of things that don't exist in any field guide. You will never enter a forest at night again. But in quiet moments, you still hear the frequency. And sometimes, when you close your eyes, you see wings.\n\n[ENDING: THE SURVIVOR — You escaped. Your body survived. The rest of you is still in the wetland.]",
    "You find the truck. The keys are where you left them. The engine starts. You drive. In the rearview mirror, the mist recedes. But the rearview mirror also shows you something sitting in the back seat — folded tight, patient, waiting. You don't look back again. You drive until sunrise.\n\n[ENDING: THE PASSENGER — You brought something back with you.]"
  ],
  ending_absorbed: [
    "You stop running. The mist wraps around you like a collection bag. It doesn't hurt. The frequency becomes music — the most beautiful sound you've ever heard. You understand now. The survey was never about the bats. The bats were surveying you. You open your arms. Your wingspan is magnificent.\n\n[ENDING: METAMORPHOSIS — You became what you studied.]",
    "Your sanity crumbles like wet field notes. You sit down in the shallow water and begin filling out your datasheets with perfect calm. Species: unknown. Morphology: impossible. Behavior: hunting. You record everything. Your handwriting changes. It becomes something else. Something older. You don't notice when the wings grow in.\n\n[ENDING: THE LAST DATASHEET — Science is observation. You became the observation.]"
  ],
  ending_cave: [
    "You descend into the cave. The temperature drops. The walls pulse. At the bottom, you find a chamber filled with roost — millions of bodies hanging in perfect silence. In the center, something ancient opens one eye. It's been waiting since before mammals existed. It chose this form — wings, fur, echolocation — as camouflage. It has been counting your species the way you count its. You are Specimen #7,847,293,102. It bands you.\n\n[ENDING: CATALOGUED — You became data in something else's study.]",
    "The cave goes deeper than geology allows. You descend for what feels like hours. The walls transition from limestone to something organic. At the bottom, there is no monster. There is a mirror. In it, you see yourself, but the reflection is hanging upside down. It mouths words: 'The survey is complete.' Your headlamp dies. In the perfect dark, you finally hear what the bats have always been saying.\n\n[ENDING: THE FREQUENCY — You heard the truth. You can never unhear it.]"
  ],
  ending_darkness: [
    "Your headlamp died hours ago. Or was it minutes? Time doesn't work the same in total darkness. You can't see your hand in front of your face. You can't see the trees. You can't see the ground. But you can hear them — thousands of wings in the canopy above. They speak in frequencies that bypass your ears entirely, resonating directly in your skull. They're teaching you their language. Noun: prey. Verb: hunt. Subject: you.\n\nYou don't remember sitting down, but you're on the ground now. The wetland water soaks through your clothes. It's warm. That's wrong. You reach out in the dark and touch something. It touches back. Too many fingers. They belonged to the last researcher who ran out of battery.\n\nYour eyes adjust to a light that isn't there. In the absolute dark, you begin to see. The forest is full of shapes that were always there — things that only exist in the absence of light. They've been waiting. Your headlamp kept them at bay. Now there's nothing between you and them.\n\nOne of them leans close. Its breath smells like century-old guano and rotted fruit. It whispers: 'Welcome to the real survey.'\n\n[ENDING: CONSUMED BY DARKNESS — The light was all that kept you human.]"
  ]
};

// Scene definitions with choices
const SCENES = {
  arrival: {
    id: "arrival",
    art: "arrival",
    choices: [
      { text: "Begin setting up the mist nets", next: "setup_nets", sanityChange: 0, healthChange: 0 },
      { text: "Check your equipment one more time", next: "arrival_check", sanityChange: 5, healthChange: 0 },
      { text: "Listen to the forest for a moment", next: "arrival_listen", sanityChange: -5, healthChange: 0 }
    ]
  },
  arrival_check: {
    id: "arrival_check",
    art: "arrival",
    getText: () => "You spread your equipment on the tailgate. Headlamp: charged. Nets: furled and ready. Calipers, banding kit, datasheets — all present. The routine calms you. Everything is in order. Everything is normal. You notice your hands are steady. Good. You'll need that later, though you don't know it yet.",
    choices: [
      { text: "Begin setting up the mist nets", next: "setup_nets", sanityChange: 0, healthChange: 0 },
      { text: "Radio base camp to confirm your position", next: "arrival_radio", sanityChange: 0, healthChange: 0 }
    ]
  },
  arrival_listen: {
    id: "arrival_listen",
    art: "arrival",
    getText: () => "You stand still. The soundscape is... diminished. The spring peepers should be deafening at this time of year. Instead, sporadic calls. Tentative. Like the frogs are testing whether it's safe to make noise. A barred owl starts its call — 'who cooks for you' — but stops halfway through. As if something answered it that shouldn't have.",
    choices: [
      { text: "Shake it off and set up the nets", next: "setup_nets", sanityChange: 0, healthChange: 0 },
      { text: "Note the unusual silence in your datasheet", next: "setup_nets", sanityChange: -3, healthChange: 0, addFlag: { noted_silence: true } }
    ]
  },
  arrival_radio: {
    id: "arrival_radio",
    art: "arrival",
    getText: () => "You key the radio. 'Base, this is Survey Team Alpha at Wetland Site 7. Beginning setup.' A pause. Then: 'Copy, Alpha. Weather looks clear. Good luck out there.' Normal. Professional. But as you clip the radio back to your vest, you hear one more transmission — barely audible, submerged in static: your own voice saying 'It's already here.'",
    choices: [
      { text: "...Begin setting up the nets", next: "setup_nets", sanityChange: -8, healthChange: 0 }
    ]
  },
  setup_nets: {
    id: "setup_nets",
    art: "nets",
    choices: [
      { text: "Move on to setting up the second net", next: "second_net", sanityChange: 0, healthChange: 0 },
      { text: "Set up the acoustic monitor while you wait", next: "setup_acoustic", sanityChange: 0, healthChange: 0 }
    ]
  },
  second_net: {
    id: "second_net",
    art: "nets",
    choices: [
      { text: "Examine the abandoned equipment closely", next: "bat_activity", sanityChange: -8, healthChange: 0, addFlag: { found_gear: true } },
      { text: "Ignore it. Complete your net setup.", next: "bat_activity", sanityChange: 0, healthChange: 0 }
    ]
  },
  bat_activity: {
    id: "bat_activity",
    art: "nets",
    choices: [
      { text: "Relax. This is normal. Check nets for captures.", next: "first_capture", sanityChange: 3, healthChange: 0 },
      { text: "The call rate is too high. Check the detector.", next: "acoustic_anomaly", sanityChange: -5, healthChange: 0 }
    ]
  },
  acoustic_anomaly: {
    id: "acoustic_anomaly",
    art: "nets",
    choices: [
      { text: "Record the anomalous pattern for analysis", next: "first_capture", sanityChange: -8, healthChange: 0, addFlag: { recorded_calls: true } },
      { text: "Turn off the detector. Check the nets.", next: "first_capture", sanityChange: -3, healthChange: 0 }
    ]
  },
  setup_acoustic: {
    id: "setup_acoustic",
    art: "nets",
    choices: [
      { text: "Wait and observe normal bat activity", next: "bat_activity", sanityChange: 2, healthChange: 0 },
      { text: "Something feels wrong. Check the detector closely.", next: "acoustic_anomaly", sanityChange: -5, healthChange: 0 }
    ]
  },
  first_capture: {
    id: "first_capture",
    art: "bat_capture",
    choices: [
      { text: "Process the capture — measure, band, and release", next: "process_bat", sanityChange: 0, healthChange: 0 },
      { text: "Something feels off. Check the other nets first.", next: "wrong_sound", sanityChange: -3, healthChange: 0 }
    ]
  },
  process_bat: {
    id: "process_bat",
    art: "bat_capture",
    getText: (flags) => {
      const base = "You extract the bat carefully, supporting its body. Forearm measurement: 42mm. Weight: 14g. Sex: female. Reproductive status: non-reproductive. You fit a band to its forearm — aluminum, size 4. Everything by the book.";
      if (flags.noted_silence) {
        return base + " As you release it, the bat doesn't fly away. It hangs from your glove and stares at you. Its eyes reflect your headlamp, but the reflection is the wrong color. Then it's gone.";
      }
      return base + " You open your hand. It launches into the dark. Standard. But as it vanishes, you swear its wingbeat rhythm sounded like Morse code.";
    },
    choices: [
      { text: "Check the second net", next: "second_capture", sanityChange: 0, healthChange: 0 },
      { text: "Take a break, drink some water", next: "water_bottle", sanityChange: 2, healthChange: 0, requiresItem: "Water Bottle" }
    ]
  },
  second_capture: {
    id: "second_capture",
    art: "bat_capture",
    choices: [
      { text: "This can't be right. Measure it again.", next: "third_net_check", sanityChange: -10, healthChange: 0, addFlag: { saw_anomaly: true } },
      { text: "Log the data and move on. Check net three.", next: "third_net_check", sanityChange: -5, healthChange: 0 }
    ]
  },
  third_net_check: {
    id: "third_net_check",
    art: "dark_forest",
    getChoices: (health, sanity, inventory, flags) => {
      const choices = [
        { text: "Try to understand what could do this", next: "wrong_sound", sanityChange: -8, healthChange: 0 }
      ];
      if (flags.noted_silence) {
        choices.push({ text: "Listen. Something has changed.", next: "wrong_sound_frogs", sanityChange: -12, healthChange: 0 });
      } else {
        choices.push({ text: "Whatever did this might still be here", next: "wrong_sound", sanityChange: -10, healthChange: 0 });
      }
      return choices;
    }
  },
  wrong_sound_frogs: {
    id: "wrong_sound_frogs",
    art: "dark_forest",
    choices: [
      { text: "RUN. NOW.", next: "wrong_shape_net", sanityChange: -15, healthChange: 0 },
      { text: "Stand still. Don't make a sound.", next: "wrong_shape_net", sanityChange: -10, healthChange: 0 }
    ]
  },
  water_bottle: {
    id: "water_bottle",
    art: "bat_capture",
    choices: [
      { text: "Spit it out. Drop the bottle.", next: "second_capture", sanityChange: -8, healthChange: 0, removeItem: "Water Bottle" },
      { text: "Force yourself to swallow. You need hydration.", next: "second_capture", sanityChange: -12, healthChange: -5, addFlag: { drank_wrong: true } }
    ]
  },
  wrong_sound: {
    id: "wrong_sound",
    art: "dark_forest",
    choices: [
      { text: "Investigate the source of the sound", next: "wrong_shape_net", sanityChange: -10, healthChange: 0 },
      { text: "Ignore it — focus on the survey", next: "wrong_shape_net", sanityChange: -5, healthChange: 0 },
      { text: "Try the two-way radio", next: "use_radio_early", sanityChange: -8, healthChange: 0, requiresItem: "Two-Way Radio" }
    ]
  },
  use_radio_early: {
    id: "use_radio_early",
    art: "dark_forest",
    getText: () => "You try base camp. Static. You try channel 9 — emergency. Static. Every channel: static. But underneath all of it, a rhythm. The same sub-audible frequency, transmitted through electronics now. It shouldn't be possible. Radio waves and sound waves aren't the same thing. Unless what's making the sound doesn't care about the distinction.",
    choices: [
      { text: "Check the nets — something big has been caught", next: "wrong_shape_net", sanityChange: -5, healthChange: 0 }
    ]
  },
  wrong_shape_net: {
    id: "wrong_shape_net",
    art: "creature",
    choices: [
      { text: "Approach it with your calipers. You're a scientist.", next: "glove_failure", sanityChange: -15, healthChange: -10, requiresItem: "Calipers" },
      { text: "Step back slowly. Don't take your eyes off it.", next: "the_mist", sanityChange: -10, healthChange: 0 },
      { text: "Turn off your headlamp. Maybe it hunts by light.", next: "darkness_choice", sanityChange: -20, healthChange: 0 }
    ]
  },
  glove_failure: {
    id: "glove_failure",
    art: "creature",
    choices: [
      { text: "Pull back. Get away from it.", next: "the_mist", sanityChange: -15, healthChange: -10, addFlag: { touched_it: true } },
      { text: "Keep holding it. Measure it anyway.", next: "investigate_shape", sanityChange: -20, healthChange: -15, addFlag: { touched_it: true } }
    ]
  },
  darkness_choice: {
    id: "darkness_choice",
    art: "dark_forest",
    getText: () => "You kill the headlamp. Total darkness. For three heartbeats: nothing. Then you understand your mistake. It doesn't hunt by light. It echolocates. And in the dark, without your light, you just became invisible to yourself — but not to it. You hear it extract itself from the net with a sound like tearing silk. It clicks at you once. The click tells it everything about you — your shape, your density, the speed of your blood. You have maybe five seconds.",
    choices: [
      { text: "Turn the headlamp back on — NOW", next: "the_mist", sanityChange: -10, healthChange: -15 },
      { text: "Stay still. Don't breathe. Don't think.", next: "the_mist", sanityChange: -15, healthChange: -5, addFlag: { stayed_dark: true } },
      { text: "Use the mist net poles as a weapon", next: "fight_back", sanityChange: -5, healthChange: -20, requiresItem: "Mist Net Poles (x4)", removeItem: "Mist Net Poles (x4)" }
    ]
  },
  fight_back: {
    id: "fight_back",
    art: "creature",
    getText: () => "You swing the aluminum pole like a baseball bat. It connects with something solid — then something not solid — then something that feels like hitting a mirror, your own impact force reflecting back through the pole into your arms. The shock numbs your hands. The pole is bent at an angle that suggests the thing you hit was harder than aluminum. But you've bought yourself time. It shrieks — a frequency that makes your fillings sing and your vision strobe.",
    choices: [
      { text: "Look at what you just hit", next: "after_fight", sanityChange: -10, healthChange: 0 },
      { text: "Don't think. RUN.", next: "flee_to_treeline", sanityChange: -5, healthChange: 0 }
    ]
  },
  after_fight: {
    id: "after_fight",
    art: "dark_forest",
    choices: [
      { text: "Run before it comes back", next: "flee_to_treeline", sanityChange: -8, healthChange: 0, addFlag: { saw_damage: true } },
      { text: "You need to document this", next: "the_mist", sanityChange: -12, healthChange: 0, addFlag: { saw_damage: true } }
    ]
  },
  investigate_shape: {
    id: "investigate_shape",
    art: "creature",
    getChoices: (health, sanity, inventory, flags) => {
      const choices = [
        { text: "Drop the calipers and run", next: "flee_to_treeline", sanityChange: -15, healthChange: 0, removeItem: "Calipers", addFlag: { measured_it: true } },
        { text: "Keep measuring. Record everything.", next: "the_mist", sanityChange: -25, healthChange: -10, addFlag: { measured_it: true } }
      ];
      if (inventory.includes("Banding Kit")) {
        choices.push({ text: "Try to collect a tissue sample", next: "the_mist", sanityChange: -20, healthChange: -25, addFlag: { took_sample: true } });
      }
      return choices;
    }
  },
  the_mist: {
    id: "the_mist",
    art: "mist",
    getChoices: (health, sanity, inventory, flags) => {
      const choices = [
        { text: "Run for the treeline — find the access road", next: "flee_to_treeline", sanityChange: -10, healthChange: -5 },
        { text: "Use your headlamp at full power to see through it", next: "use_headlamp", sanityChange: -15, healthChange: 0, requiresItem: "Headlamp" },
        { text: "Try the radio one more time", next: "use_radio", sanityChange: -20, healthChange: 0, requiresItem: "Two-Way Radio" }
      ];
      if (inventory.includes("Field Datasheets")) {
        choices.push({ text: "Check your field notes", next: "use_datasheets", sanityChange: -15, healthChange: 0, requiresItem: "Field Datasheets" });
      }
      if (inventory.includes("Banding Kit")) {
        choices.push({ text: "Try to band it with the kit", next: "use_banding_kit", sanityChange: -25, healthChange: 0, requiresItem: "Banding Kit" });
      }
      choices.push({ text: "Stand your ground. Observe. Document.", next: "the_cave", sanityChange: -25, healthChange: -10, addFlag: { stood_ground: true } });
      return choices;
    }
  },
  use_datasheets: {
    id: "use_datasheets",
    art: "mist",
    choices: [
      { text: "This isn't you. This isn't your handwriting.", next: "flee_to_treeline", sanityChange: -20, healthChange: 0, addFlag: { saw_change: true } },
      { text: "Keep reading. Try to understand.", next: "the_cave", sanityChange: -30, healthChange: 0, addFlag: { read_future: true } }
    ]
  },
  use_banding_kit: {
    id: "use_banding_kit",
    art: "mist",
    choices: [
      { text: "Drop the kit. This was a mistake.", next: "flee_to_treeline", sanityChange: -20, healthChange: 0, removeItem: "Banding Kit" },
      { text: "Science demands completion.", next: "the_cave", sanityChange: -35, healthChange: 0, addFlag: { banded_it: true } }
    ]
  },
  use_headlamp: {
    id: "use_headlamp",
    art: "mist",
    getChoices: (health, sanity, inventory, flags) => {
      const choices = [
        { text: "RUN. GET OUT.", next: "flee_to_treeline", sanityChange: -20, healthChange: -10 },
        { text: "You need to understand this. Find the source.", next: "the_cave", sanityChange: -15, healthChange: 0, addFlag: { saw_canopy: true } },
        { text: "Turn off the light. You've seen enough.", next: "the_cave", sanityChange: -30, healthChange: 0 }
      ];
      if (flags.recorded_calls) {
        choices.push({ text: "Play back the recorded calls from your detector", next: "the_cave", sanityChange: -25, healthChange: 0, addFlag: { called_them: true } });
      }
      return choices;
    }
  },
  use_radio: {
    id: "use_radio",
    art: "mist",
    choices: [
      { text: "Throw the radio away and run", next: "flee_to_treeline", sanityChange: -15, healthChange: 0, removeItem: "Two-Way Radio" },
      { text: "Keep listening. Try to understand.", next: "the_cave", sanityChange: -25, healthChange: 0, addFlag: { listened_radio: true } },
      { text: "Look at your hands.", next: "check_hands", sanityChange: -30, healthChange: -15 }
    ]
  },
  check_hands: {
    id: "check_hands",
    art: "mist",
    getText: () => "You look. Under the skin of your left hand, something moves. Not veins — something with its own volition. It presses upward from beneath, forming ridges that look like... wing bones. Patagium. You watch the membrane begin to form between your fingers, translucent and threaded with new blood vessels. It doesn't hurt. That's the worst part. It feels like it was always supposed to be there.",
    choices: [
      { text: "Tear it off. Use the calipers. CUT IT OUT.", next: "flee_to_treeline", sanityChange: -20, healthChange: -30, requiresItem: "Calipers" },
      { text: "...It's beautiful.", next: "ending_absorbed", sanityChange: -40, healthChange: 0 },
      { text: "Run for the truck. Drive to a hospital.", next: "flee_to_treeline", sanityChange: -15, healthChange: -10 }
    ]
  },
  flee_to_treeline: {
    id: "flee_to_treeline",
    art: "flee",
    getChoices: (health, sanity) => {
      const choices = [
        { text: "Keep running — find the truck", next: "ending_escape", sanityChange: -5, healthChange: -10 }
      ];
      if (sanity <= 30) {
        choices.push({ text: "Stop. Sit down. You're so tired.", next: "ending_absorbed", sanityChange: -20, healthChange: 0 });
      }
      if (health <= 30) {
        choices.push({ text: "You can't run anymore. Find shelter.", next: "the_cave", sanityChange: -10, healthChange: -5 });
      }
      choices.push({ text: "Look for the cave entrance you saw on the topo map", next: "the_cave", sanityChange: -10, healthChange: 0 });
      return choices;
    }
  },
  the_cave: {
    id: "the_cave",
    art: "cave",
    choices: [
      { text: "Enter the cave", next: "ending_cave", sanityChange: -20, healthChange: -10 },
      { text: "Turn back. Find another way out.", next: "ending_escape", sanityChange: -10, healthChange: -15 },
      { text: "You came here to study bats. Study this.", next: "ending_cave", sanityChange: -30, healthChange: 0, addFlag: { chose_science: true } }
    ]
  },
  ending_escape: {
    id: "ending_escape",
    art: "ending_escape",
    choices: [
      { text: "Start a new survey [Play Again]", next: "__restart__", sanityChange: 0, healthChange: 0 }
    ]
  },
  ending_absorbed: {
    id: "ending_absorbed",
    art: "ending_absorbed",
    choices: [
      { text: "Wake up [Play Again]", next: "__restart__", sanityChange: 0, healthChange: 0 }
    ]
  },
  ending_cave: {
    id: "ending_cave",
    art: "ending_cave",
    choices: [
      { text: "Begin again [Play Again]", next: "__restart__", sanityChange: 0, healthChange: 0 }
    ]
  },
  ending_darkness: {
    id: "ending_darkness",
    art: "ending_darkness",
    choices: [
      { text: "Wake up [Play Again]", next: "__restart__", sanityChange: 0, healthChange: 0 }
    ]
  }
  };

export function getSceneText(sceneId, flags = {}) {
  const scene = SCENES[sceneId];
  if (!scene) return "The darkness swallows everything.";
  
  if (scene.getText) {
    return scene.getText(flags);
  }
  
  const variants = SCENE_VARIANTS[sceneId];
  if (variants) {
    let idx = Math.floor(Math.random() * variants.length);
    let text = variants[idx];
    
    // Add darkness flavor text if in darkness
    if (flags.in_darkness && !sceneId.startsWith('ending_')) {
      const darknessPrefix = [
        "In the absolute dark, ",
        "Without your headlamp, ",
        "The darkness is total. ",
        "You can't see anything. "
      ][Math.floor(Math.random() * 4)];
      text = darknessPrefix + text.charAt(0).toLowerCase() + text.slice(1);
    }
    
    return text;
  }
  
  return "The darkness presses closer.";
}

export function getSceneChoices(sceneId, health, sanity, inventory) {
  const scene = SCENES[sceneId];
  if (!scene) return [];
  
  let choices = scene.getChoices 
    ? scene.getChoices(health, sanity) 
    : [...scene.choices];
  
  // Filter by required items
  choices = choices.filter(c => {
    if (c.requiresItem) return inventory.includes(c.requiresItem);
    return true;
  });
  
  return choices;
}

export function getSceneArt(sceneId) {
  const scene = SCENES[sceneId];
  return scene?.art || "dark_forest";
}

export function getInitialState() {
  return {
    health: 100,
    sanity: 100,
    battery_level: 100,
    inventory: [...STARTING_INVENTORY],
    currentScene: "arrival",
    flags: {},
    turnCount: 0
  };
}

export function applyChoice(state, choice) {
  const newState = { ...state };
  newState.health = Math.max(0, Math.min(100, state.health + (choice.healthChange || 0)));
  newState.sanity = Math.max(0, Math.min(100, state.sanity + (choice.sanityChange || 0)));
  newState.turnCount = state.turnCount + 1;
  
  // Decrease battery by 10% each turn
  newState.battery_level = Math.max(0, state.battery_level - 10);
  
  // In darkness (0% battery), lose sanity
  if (newState.battery_level === 0) {
    newState.sanity = Math.max(0, newState.sanity - 10);
    newState.flags = { ...state.flags, in_darkness: true };
  }
  
  if (choice.removeItem) {
    newState.inventory = state.inventory.filter(i => i !== choice.removeItem);
  }
  if (choice.addFlag) {
    newState.flags = { ...newState.flags, ...choice.addFlag };
  }
  
  // Auto-endings based on stats
  if (newState.health <= 0) {
    newState.currentScene = "ending_absorbed";
  } else if (newState.sanity <= 0 && newState.flags.in_darkness) {
    newState.currentScene = "ending_darkness";
  } else if (newState.sanity <= 0) {
    newState.currentScene = "ending_absorbed";
  } else if (choice.next === "__restart__") {
    return getInitialState();
  } else {
    newState.currentScene = choice.next;
  }
  
  return newState;
}