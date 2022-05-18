// Set variables for elements from HTML page to manipulate later
const wordEl = document.getElementById("word");
const hintEl = document.getElementById("hint");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");

// Variable to determine if game has ended or not, to be used to control keydown events
let gameFinish = true;

// Variables for keeping score
let win = 0;
let lose = 0;

// Variable for Selected word and hint
let selectedHint;
let selectedWord;

// Declare empty arrays to store correct and wrong letters
const correctLetters = [];
const wrongLetters = [];

// Get all elements with a class of figure-part and store to array
const figureParts = document.querySelectorAll(".figure-part");

// Array of possible words for the game
const words = [
  "Abomasum",
  "Absquatulate",
  "Adagio",
  "Alfresco",
  "Alcazar",
  "Amok",
  "Amphisbaena",
  "Antimacassar",
  "Atingle",
  "Bailiwick",
  "Bafflegab",
  "Ballistic",
  "Bamboozle",
  "Bedlam",
  "Bugbear",
  "Bulbous",
  "Calamity",
  "Calliope",
  "Catamaran",
  "Convivial",
  "Cornucopia",
  "Crescendo",
  "Crestfallen",
  "Cryptozoology",
  "Demitasse",
  "Derecho",
  "Diphthong",
  "Doldrums",
  "Doohickey",
  "Doppelganger",
  "Dumfounded",
  "Earwig",
  "Elixir",
  "Ephemeral",
  "Ersatz",
  "Finagle",
  "Festooned",
  "Fez",
  "Flimflam",
  "Flummery",
  "Flyspeck",
  "Foofaraw",
  "Fracas",
  "Frangipani",
  "Futz",
  "Gadzooks",
  "Gambit",
  "Gazebo",
  "Gizmo",
  "Glabella",
  "Gossamer",
  "Guffaw",
  "Guru",
  "Haboob",
  "Halcyon",
  "Haphazard",
  "Headlong",
  "Heyday",
  "Hodgepodge",
  "Hokum",
  "Hooligan",
  "Hullabaloo",
  "Huzzah",
  "Ignoramus",
  "Infinitesimal",
  "Interrobang",
  "Izzard",
  "Jabberwocky",
  "Jalopy",
  "Jitney",
  "Juggernaut",
  "Juxtaposition",
  "Kaput",
  "Kerfuffle",
  "Kerplunk",
  "Kismet",
  "Kumquat",
  "Kvetch",
  "Lackadaisical",
  "Lampoon",
  "Limburger",
  "Lollapalooza",
  "Lollygag",
  "Lugubrious",
  "Lummox",
  "Machinations",
  "Maelstrom",
  "Manifesto",
  "Miffed",
  "Moocher",
  "Mnemonic",
  "Mufti",
  "Mulligatawny",
  "Murmuration",
  "Muumuu",
  "Nabob",
  "Nagware",
  "Nainsook",
  "Nesh",
  "Noctambulist",
  "Nonplussed",
  "Noyade",
  "Ogdoad",
  "Omphalos",
  "Operose",
  "Orrery",
  "Otalgia",
  "Oxymoron",
  "Pantagruelian",
  "Paraph",
  "Peterman",
  "Pilgarlic",
  "Pollex",
  "Pother",
  "Previse",
  "Pugnacious",
  "Quibble",
  "Quicksilver",
  "Quiddle",
  "Quinze",
  "Quirky",
  "Quixotic",
  "Raconteur",
  "Ragamuffin",
  "Razzia",
  "Razzmatazz",
  "Rejigger",
  "Rendezvous",
  "Resplendent",
  "Rickrack",
  "Ricochet",
  "Riffraff",
  "Rigmarole",
  "Roundabout",
  "Ruckus",
  "Ruffian",
  "Rugrat",
  "Rumper",
  "Rumpus",
  "Sabayon",
  "Sarmie",
  "Scofflaw",
  "Sassafras",
  "Saucier",
  "Saudade",
  "Scalawag",
  "Scatterbrain",
  "Schadenfreude",
  "Schlep",
  "Schmooze",
  "Scintillating",
  "Scrofulous",
  "Scrumdiddlyumptious",
  "Scuttlebutt",
  "Serendipity",
  "Sesquipedalian",
  "Shenanigans",
  "Skedaddle",
  "Skirmish",
  "Skullduggery",
  "Slapdash",
  "Slipshod",
  "Smithereens",
  "Smorgasbord",
  "Snollygoster",
  "Sobriquet",
  "Sockdolager",
  "Solander",
  "Spaghettification",
  "Spellbind",
  "Splendiferous",
  "Spitchcock",
  "Spurrier",
  "Sternutatory",
  "Stiction",
  "Struthious",
  "Stylite",
  "Supercilious",
  "Superfluous",
  "Surreptitious",
  "Switcheroo",
  "Synchronicity",
  "Syzygy",
  "Taniwha",
  "Tappen",
  "Taradiddle",
  "Tchotchke",
  "Teepee",
  "Telekinesis",
  "Thingamabob",
  "Thingamajig",
  "Tidbit",
  "Tintinnabulation",
  "Toadstool",
  "Tomfoolery",
  "Turducken",
  "Typhoon",
  "Ulu",
  "Umbriferous",
  "Umlaut",
  "Umpteen",
  "Uniped",
  "Usurp",
  "Uvula",
  "Vagabond",
  "Vamoose",
  "Velleity",
  "Verjuice",
  "Vertigo",
  "Verve",
  "Vicinal",
  "Virtuoso",
  "Vomitous",
  "Vuvuzela",
  "Wabbit",
  "Waitron",
  "Wallflower",
  "Wayzgoose",
  "Wanderlust",
  "Whatchamacallit",
  "Whirligig",
  "Whirlybird",
  "Whodunit",
  "Widget",
  "Wigwam",
  "Windbag",
  "Wisecrack",
  "Wittol",
  "Woebegone",
  "Wonky",
  "Wowser",
  "Woozy",
  "Wunderkind",
  "Wuthering",
  "Xanthic",
  "Xenophobic",
  "Xyloid",
  "Xylophone",
  "Ylem",
  "Yokel",
  "Zaftig",
  "Zeitgeist",
  "Zephyr",
  "Zeppelin",
  "Ziggurat",
  "Zorro"
];

// Array of hints to pair with counter-part words
const hints = [
  "— the fourth stomach of a ruminant, such as a cow or sheep (noun)",
  "— to leave somewhere abruptly (verb)",
  "— to perform in slow tempo (adverb)",
  "— taking place or located in the open air (adverb)",
  "— a Spanish palace or fortress (noun)",
  "— an episode of sudden mass assault against people or objects (noun)",
  "— a mythical serpent with a head at each end (noun)",
  "— a small covering (noun)",
  "— stimulated (adjective)",
  "— a persons area of skill, knowledge, authority, or work (noun)",
  "— confusing or generally unintelligible jargon (noun)",
  "— having its motion determined or describable by the laws of exterior (adjective)",
  "— to deceive or get the better of (someone) by trickery (verb)",
  "— a scene or state of wild uproar and confusion (noun)",
  "— any source, real or imaginary, of needless fright or fear (noun)",
  "— bulb-shaped (adjective)",
  "— a great misfortune or disaster (noun)",
  "— a musical instrument consisting of a set of harsh-sounding steam whistles that are activated by a keyboard(noun)",
  "— a vessel, usually propelled by sail, formed of two hulls or floats held side by side by a frame above them (noun)",
  "— friendly (adjective)",
  "— an endless supply (noun)",
  "— a gradual, steady increase in loudness (noun)",
  "— discouraged (adjective)",
  "— the study of evidence tending to substantiate the existence of, or the search for, creatures whose reported existence is unproven (noun)",
  "— a small cup for serving strong black coffee after dinner (noun)",
  "— a widespread and severe windstorm that moves rapidly along a fairly straight path and is associated with bands of rapidly moving thunderstorms (noun)",
  "— a sound formed by the combination of two vowels in a single syllable, in which the sound begins as one vowel and moves toward another(noun)",
  "— a state of inactivity (noun)",
  "— a gadget (noun)",
  "— a ghostly double or counterpart of a living person (noun)",
  "— speechless with amazement (adjective)",
  "— any of numerous elongate, nocturnal insects of the order Dermaptera, having a pair of large, movable pincers at the rear of the abdomen (noun)",
  "— a sweetened, aromatic solution of alcohol and water containing, or used as a vehicle for, medicinal substances (noun)",
  "— lasting a very short time (adjective)",
  "— serving as a substitute (adjective)",
  "— to cheat a person (verb)",
  "— a string or chain of flowers, foliage, ribbon, etc., suspended in a curve between two points (noun)",
  "— a felt cap (noun)",
  "— a trick or deception (noun)",
  "— oatmeal or flour boiled with water until thick (noun)",
  "— a tiny stain (noun)",
  "— a great fuss or disturbance about something very insignificant (noun)",
  "— a noisy, disorderly disturbance or fight (noun)",
  "— a perfume prepared from or imitating the odor of the flower of a tropical American tree or shrub (noun)",
  "— to pass time in idleness (verb)",
  "— an exclamation of surprise or annoyance (interjection)",
  "— a device, action, or opening remark (noun)",
  "— a freestanding roofed structure usually open on the sides (noun)",
  "— gadget (noun)",
  "— the flat area of bone between the eyebrows (noun)",
  "— a fine, filmy cobweb seen on grass or bushes or floating in calm weather (noun)",
  "— a loud, unrestrained burst of laughter (noun)",
  "— an intellectual or spiritual guide or leader (noun)",
  "— a thick dust storm or sandstorm that blows in the deserts of North Africa and Arabia or on the plains of India (noun)",
  "— calm (adjective)",
  "— characterized by lack of order or planning, by irregularity, or by randomness (adjective)",
  "— with the head foremost (adverb)",
  "— the stage or period of greatest vigor, strength, success (noun)",
  "— a heterogeneous mixture; jumble (noun)",
  "— out-and-out nonsense (noun)",
  "— a ruffian or hoodlum (noun)",
  "— a clamorous noise or disturbance (noun)",
  "— used as an exclamation of joy, applause, appreciation, etc. (interjection)",
  "— an extremely ignorant person (noun)",
  "— indefinitely or exceedingly small (adjective)",
  "— a printed punctuation mark (‽), available only in some typefaces, designed to combine the question mark (?) and the exclamation point (!) (noun)",
  "— the letter Z (noun)",
  "— a playful imitation of language consisting of invented, meaningless words (noun)",
  "— an old, decrepit, or unpretentious automobile (noun)",
  "— a small bus or car following a regular route along which it picks up and discharges passengers (noun)",
  "— any large, overpowering, destructive force or object, as war, a giant battleship, or a powerful football team (noun)",
  "— the state of being close together or side by side (noun)",
  "— ruined; done for; demolished (adjective)",
  "— a fuss; commotion (noun)",
  "— with or as if with a sudden muffled thud (adverb)",
  "— destiny (noun)",
  "— a small, round or oblong citrus fruit having a sweet rind and acid pulp, used chiefly for preserves (noun)",
  "— to complain, especially chronically (verb)",
  "— without interest, vigor, or determination; listless; lethargic (adjective)",
  "— a sharp, often virulent satire directed against an individual or institution (noun)",
  "— a variety of soft white cheese of strong odor and flavor (noun)",
  "— an extraordinary or unusual thing, person, or event (noun)",
  "— to spend time idly (verb)",
  "— mournful, dismal, or gloomy, especially in an affected, exaggerated, or unrelieved manner (adjective)",
  "— a clumsy, stupid person (noun)",
  "— an act or instance of a plot (noun)",
  "— a large, powerful, or violent whirlpool (noun)",
  "— a public declaration of intentions, opinions, objectives, or motives, as one issued by a government, sovereign, or organization (noun)",
  "— put into an irritable mood, especially by an offending incident (adjective)",
  "— to borrow (verb)",
  "— assisting or intended to assist the memory (adjective)",
  "— civilian clothes (noun)",
  "— a curry-flavored soup of East Indian origin, made with chicken or meat stock (noun)",
  "— an act or instance of sound (noun)",
  "— a long, loose-hanging dress, usually brightly colored or patterned, worn especially by Hawaiian women (noun)",
  "— any very wealthy, influential, or powerful person (noun)",
  "— computer software that is free for a trial period during which the user is frequently reminded on screen to register and pay (noun)",
  "— a fine, soft-finished cotton fabric, usually white, used for lingerie and infants wear (noun)",
  "— sensitive to the cold (adjective)",
  "— a sleepwalker (noun)",
  "—a person surprised and confused so much that they are unsure how to react (adjective)",
  "— an execution carried out by drowning (noun)",
  "— the number eight (noun)",
  "—the central point (noun)",
  "—done with or involving much labor (adjective)",
  "— an apparatus for representing the positions, motions, and phases of the planets, satellites, etc., in the solar system (noun)",
  "— earache (noun)",
  "— a figure of speech by which a locution produces an incongruous, seemingly self-contradictory effect, as in “cruel kindness” (noun)",
  "— the huge son of Gargantua, represented as dealing with serious matters in a spirit of broad and somewhat cynical good humor (noun)",
  "— a flourish made after a signature, as in a document, originally as a precaution against forgery (noun)",
  "— a safecracker (noun)",
  "— a person regarded with mild or pretended contempt or pity (noun)",
  "— the innermost digit of the forelimb; thumb (noun)",
  "— commotion (noun)",
  "— to foresee (verb)",
  "— inclined to quarrel or fight readily (adjective)",
  " — arguments to evade a point at issue (noun)",
  "— the metallic element mercury(noun)",
  "— to spend time in trifling employments (verb)",
  "— a card game with rules similar to those of vingt-et-un, except that the score aimed at is 15 rather than 21 (noun)",
  "— full of quirks (adjective)",
  "— extravagantly chivalrous or romantic (adjective)",
  "— a person who is skilled in relating stories and anecdotes interestingly (noun)",
  "— a ragged, disreputable person (noun)",
  "— a plundering raid (noun)",
  "— razzle-dazzle (noun)",
  "— to change or rearrange in a new or different way, especially by the use of techniques not always considered ethical (verb)",
  "— an agreement between two or more persons to meet at a certain time and place (noun)",
  "— shining brilliantly; gleaming; splendid (adjective)",
  "— a narrow, zigzag braid or ribbon used as a trimming on clothing, linens, etc.(noun)",
  "— a glancing rebound (as of a projectile off a flat surface) (verb)",
  "— people, or a group of people, regarded as disreputable or worthless (noun)",
  "— an elaborate or complicated procedure (noun)",
  "— circuitous or indirect (adjective)",
  "— a noisy, disorderly disturbance (noun)",
  "— a tough, lawless person (noun)",
  "— a child not yet old enough for school (noun)",
  "— the hind part of the body of an animal (noun)",
  "— a noisy or violent disturbance; commotion (noun)",
  "— French term for zabaglione (noun)",
  "— a sandwich (noun)",
  "— a person who flouts the law (noun)",
  "— an American tree (noun)",
  "— a chef or cook who specializes in making sauces (noun)",
  "— a deep emotional state of melancholic longing for a person or thing that is absent (noun)",
  "— a rascal (noun)",
  "— a person incapable of serious, connected thought (noun)",
  "— satisfaction or pleasure felt at someone else’s misfortune (noun)",
  "— to carry (verb)",
  "— to chat idly (verb)",
  "— animated (adjective)",
  "— morally tainted (adjective)",
  "— extremely tasty; delicious (adjective)",
  "— an open cask of drinking water (noun)",
  "— an aptitude for making desirable discoveries by accident (noun)",
  "— given to using long words (adjective)",
  "— mischief; prankishness (noun)",
  "— to run away hurriedly (verb)",
  "— any brisk conflict or encounter (noun)",
  "— dishonorable proceedings; mean dishonesty or trickery (noun)",
  "— in a hasty, haphazard manner (adverb)",
  "— careless (adjective)",
  "— small pieces (noun)",
  "— a buffet meal of various hot and cold hors d’oeuvres, salads, casserole dishes, meats, cheeses, etc. (noun)",
  "— a clever, unscrupulous person (noun)",
  "— a nickname (noun)",
  "— something unusually large, heavy, etc. (noun)",
  "— a case for maps, plates, etc., made to resemble a book and having the front cover and fore-edge hinged (noun)",
  "— the theoretical stretching of an object as it encounters extreme differences in gravitational forces, especially those associated with a black hole (noun)",
  "— to hold or bind by or as if by a spell; enchant; entrance; fascinate (verb)",
  "— splendid; magnificent; fine (adjective)",
  "— an eel that is split, cut into pieces, and broiled or fried (noun)",
  "— a maker of spurs (noun)",
  "— causing or tending to cause sneezing (adjective)",
  "— the frictional force to be overcome to set one object in motion when it is in contact with another (noun)",
  "— resembling or related to the ostriches or other ratite birds (adjective)", 
  "— one of a class of solitary ascetics who lived on the top of high pillars or columns (noun)",
  "— haughtily disdainful or contemptuous, as a person or a facial expression (adjective)",
  "— being more than is sufficient or required (adjective)",
  "— acting in a stealthy way (adjective)",
  "— an unexpected or sudden change or reversal in attitude, character, position, action, etc. (noun)",
  "— an apparently meaningful coincidence in time of two or more similar or identical events that are causally unrelated (noun)",
  "— an alignment of three celestial objects, as the sun, the earth, and either the moon or a planet (noun)",
  "— a legendary Māori monster (noun)",
  "— the plug by which the rectum of a bear is closed during hibernation (noun)",
  "— a small lie (noun)",
  "— an inexpensive souvenir, trinket, or ornament (noun)",
  "— a tent of the American Indians, made usually from animal skins laid on a conical frame of long poles and having an opening at the top for ventilation and a flap door (noun)",
  "— the supposed ability to move objects at a distance by mental power or other nonphysical means (noun)",
  "— used to refer to or address a person or thing whose name one has forgotten, does not know, or does not wish to mention (noun)",
  "— a gadget or other thing for which the speaker does not know or has forgotten the name (noun)",
  "— a delicate bit or morsel of food (noun)",
  "— the ringing or sound of bells (noun)",
  "— a poisonous mushroom, as distinguished from an edible one (noun)",
  "— a silly act, matter, or thing (noun)",
  "— a deboned turkey that is stuffed with a deboned duck that is stuffed with a deboned chicken (noun)",
  "— a tropical cyclone in the western Pacific Ocean or northern Indian Ocean, having sustained winds of at least 64 knots (noun)",
  "— a knife with a broad (noun)",
  "— casting or making shade (adjective)",
  "— a mark (¨) used as a diacritic over a vowel, as ä, ö, ü, to indicate a vowel sound different from that of the letter without the diacritic (noun)",
  "— indefinitely many; a lot of (adjective)",
  "— a person or animal having only one foot or leg (noun)",
  "— to seize and hold (a position, office, power, etc.) by force or without legal right (verb)",
  "— the small, fleshy, conical body projecting downward from the middle of the soft palate (noun)",
  "— wandering from place to place without any settled home (adjective)",
  "— to depart quickly (verb)",
  "— volition in its weakest form (noun)",
  "— an acid liquor made from the sour juice of crab apples, unripe grapes, etc. (noun)",
  "— a dizzying sensation of tilting within stable surroundings (noun)",
  "— enthusiasm or vigor (noun)",
  "— relating to, or substituted in adjacent sites (verb)",
  "— a person who has special knowledge or skill in a field (noun)",
  "— repugnant (adjective)",
  "— a long, plastic horn that makes a loud, monotone sound, typically blown by South African fans at soccer matches (noun)",
  "— exhausted (adjective)",
  "— a person who waits on tables; waiter or waitress (noun)",
  "— a person who, because of shyness, unpopularity, or lack of a partner, remains at the side at a party or dance (noun)",
  "— a works outing made annually by a printing house (noun)",
  "— a strong, innate desire to rove or travel about (noun)",
  "— an object or person whose name one does not know or cannot recall (noun)",
  "— Something that whirls or revolves (noun)",
  "— A helicopter (noun)",
  "— A narrative dealing with a murder or a series of murders and the detection of the criminal (noun)",
  "— A small mechanical device (noun)",
  "— An American Indian dwelling, usually of rounded or oval shape (noun)",
  "— An empty, voluble, pretentious talker (noun)",
  "— A smart or facetious remark (noun)",
  "— A man who knows of and tolerates his wife’s infidelity (noun)",
  "— Affected by woe (adjective)",
  "— A shaky, groggy or unsteady person (adjective)",
  "— An excessively puritanical person (noun)",
  "— Stupidly confused (adjective)",
  "— A wonder child or child prodigy (noun)",
  "— Wind blowing strongly with a roaring sound. (adjective)",
  "— Of or relating to a yellow or yellowish color (adjective)",
  "— Relating to or exhibiting fear or hatred of foreigners (adjective)",
  "— Resembling wood (adjective)",
  "— A musical instrument consisting of a graduated series of wooden bars (noun)",
  "— The hypothetical initial substance of the universe from which all matter is derived (noun)",
  "— An unsophisticated person from a rural area (noun)",
  "— Full-bodied; well-proportioned (adjective)",
  "— A spirit of the time (noun)",
  "— A gentle, mild breeze (noun)",
  "— A large dirigible balloon consisting of a long, cylindrical, covered framework containing compartments (noun)",
  "— A temple of Sumerian origin in the form of a pyramidal tower (noun)",
  "— A doglike fox found in the forests and savannah of South America (noun)"
];

/* Function to start the game.
    Picks a random number from the words array and use index to assign selectedWord and selectedHint */
function startGame() {
  let index = words.indexOf(words[Math.floor(Math.random() * words.length)]);
  selectedWord = words[index].toUpperCase();
  selectedHint = hints[index].toUpperCase();

  // Hide hangman figure on game start
  $(".figure-part").css("display", "none");

  // Hide start button on game start
  $("#start-btn").css("display", "none");

  // Display user input on game start
  $("#userInput").css("display", "block");

  displayWord();
}

// Function to display the word
function displayWord() {
  //set game finish to false to allow input for new game
  gameFinish = false;

  // Display hint
  $("#hint").html(`<p>Hint: ${selectedHint}</p>`);

  // Display word
  $("#word").html(`
        ${selectedWord
          .split("")
          .map(
            (letter) => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ""}
                </span>
            `
          )
          .join("")}
        `);

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  /* If the inner word matches the selected word, insert text to final-message saying "Congratulations! You Won!!!" 
    Popup will then display with final-message and a button so user can start again. */

  if (innerWord === selectedWord) {
    //set game finish to true to stop input guesses
    gameFinish = true;

    // Display final win status
    $("#final-message").html("Good Job!! You Won!!!");
    $("#final-message").css("color", "#62c962");
    $("#final-msg-container").css("display", "block");

    win = win + 1;
    $(".win").html(win);
  }
}

// Update the wrong letters
function updateWrongLettersEl() {
  // Display wrong letters into html
  wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? "<h3>Wrong Letter Input</h3>" : ""}
        ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;
  /* Loops through figureParts array for each element with an id of figure-part and displays one 'body part'
    each time an inccorect letter is guessed */
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
      // Display face only when head has been displayed
      if (index >= 4) {
        $(".start-face").css("display", "block");
      }
    } else {
      part.style.display = "none";
    }
  });

  /* Checks if wrongLetters array is equal to figureParts array. 
    If it is equal, it displays 'Sorry you lose!' into the h2 element with an id of final-message */
  if (wrongLetters.length === figureParts.length) {
    //set game finish to true to stop keydown events
    gameFinish = true;

    //Switch to lose face by hiding start face and displaying lose face
    $(".start-face").css("display", "none");
    $(".lose-face").css("display", "block");

    // Display final win status
    $("#final-message").html("Game Over! Nice Try!");
    $("#final-message").css("color", "#ff3333");
    $("#final-msg-container").css("display", "block");

    //After they lose, display the selectedWord
    wordEl.innerHTML = `
        ${selectedWord
          .split("")
          .map(
            (selectedWord) => `
                <span class="letter">
                    ${selectedWord}
                </span>
            `
          )
          .join("")}
        `;
    // Insert losing score to HTML
    lose = lose + 1;
    $(".lose").html(lose);
  }
}

/* Change display settings on letter-error to display block, then changes it back to none after 2000ms to temporarily display notifcation 
to user. This alerts the user that they have already used this letter. */
function showNotification() {
  $("#letter-error").css("display", "block");
  setTimeout(() => {
    $("#letter-error").css("display", "none");
  }, 2000);
}

/* Function to get form input and call validateLetter() if value is not undefined */
function validateForm() {
  const input = document.forms.userInput.guess.value;
  if (input != undefined) {
    validateLetter(input);
  }

  // Reset text in form
  document.getElementById("userInput").reset();
}

// Validate Letter if game is active
function validateLetter(input) {
  if (gameFinish === false) {
    const letter = input.toUpperCase();
    // Regex to verify variable is a letter
    if (/[a-zA-Z]/.test(letter)) {
      /* If letter is in selected word and correctLetters array doesnt already contain letter, 
            push it to array and display the letter else show notification letter has already been used.*/
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);      `-`

          displayWord();
        } else {
          showNotification();
        }
        /* If Letter guess is wrong and has not already been used, add to wrongLetters array and call updateWrongLettersEl to display letter. 
                    If it has already been used, showNotification() - Display to user that letter has already been used */
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);

          updateWrongLettersEl();
        } else {
          showNotification();
        }
      }
    }
  }
}

// Event listener on Play Again button to empty arrays and clear game board before starting a new game
playAgainBtn.addEventListener("click", () => {
  //Empty the arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  // Start a mew game
  startGame();

  // Hide wrong letters and figures
  updateWrongLettersEl();

  // Hide final message
  $("#final-msg-container").css("display", "none");

  //Hide faces when starting new game
  $(".start-face").css("display", "none");
  $(".lose-face").css("display", "none");
});

// Scroll to top button
// Set a variable for scroll to top button
const scrollToTop = document.querySelector("#scrollButton");

// Set up a function if the window scroll down to height 500px then show button
window.addEventListener("scroll", () => {
  // Get the current scroll height value
  const windowHeight = window.scrollY;

  // If the scroll height value is greater than the window height, add style inline-css in button
  if (windowHeight > 1000) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }
});

window.onscroll = function() {
  scrollFunction()
};
   
function scrollFunction() {
  if (document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50)
  {
      document.getElementById("header_ribbon")
                  .style.padding = "1px 0.5px";
           
      document.getElementById("Title")
              .style.fontSize = "24px";
  }
  else {
      document.getElementById("header_ribbon")
                  .style.padding = "2px 1px";
                   
      document.getElementById("Title")
                  .style.fontSize = "35px";
  }
}