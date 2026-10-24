// Plain-language details shown when a part label is clicked in the 3D AC viewer.
// General AC engineering knowledge only: no business claims, prices or guarantees.

export type Lang = 'english' | 'roman';

interface L {
  en: string;
  roman: string;
}

export interface PartInfo {
  name: L;
  unit: 'indoor' | 'outdoor' | 'wiring';
  does: L;
  fault: L;
  /** service slug in mockData to prefill the booking form (optional) */
  service?: string;
}

export const PART_INFO: Record<string, PartInfo> = {
  // ---- Indoor unit ----
  cover: {
    name: { en: 'Front Panel', roman: 'Front Panel (Samne ka Cover)' },
    unit: 'indoor',
    does: {
      en: 'Covers the internals, guides air in through the grille and carries the display and remote receiver.',
      roman: 'Andar ke parts ko dhakta hai, hawa ko grille se andar bhejta hai aur display aur remote receiver isi mein hota hai.',
    },
    fault: {
      en: 'Broken clips or cracks cause rattling and air leaks; a faulty display board shows wrong or no lights.',
      roman: 'Clips toot jayen to awaz aati hai aur hawa leak hoti hai; display board kharab ho to lights ghalat ya band hoti hain.',
    },
  },
  filters: {
    name: { en: 'Air Filters', roman: 'Air Filters' },
    unit: 'indoor',
    does: {
      en: 'Trap dust and hair before they reach the cooling coil so airflow stays strong and clean.',
      roman: 'Cooling coil tak pohanchne se pehle mitti aur baal rok leti hain taake hawa saaf aur tez rahe.',
    },
    fault: {
      en: 'Clogged filters reduce airflow, cooling and efficiency and can make the coil freeze. Clean them regularly.',
      roman: 'Filter band ho jaye to hawa aur cooling kam hoti hai aur coil par barf jam sakti hai. Inhe waqt par saaf karein.',
    },
    service: 'ac-general-service',
  },
  louver: {
    name: { en: 'Air Louver (Flap)', roman: 'Hawa ka Louver (Flap)' },
    unit: 'indoor',
    does: {
      en: 'Directs the cooled air up/down (and swings) to spread it across the room.',
      roman: 'Thandi hawa ko upar neeche ghuma kar poore kamre mein phailata hai.',
    },
    fault: {
      en: 'A stuck flap or failed swing motor leaves air blowing in one direction only.',
      roman: 'Flap atak jaye ya swing motor kharab ho to hawa sirf aik taraf aati hai.',
    },
  },
  swingMotor: {
    name: { en: 'Swing (Stepper) Motor', roman: 'Swing Motor' },
    unit: 'indoor',
    does: {
      en: 'A small stepper motor that moves the louver flap on command from the control board.',
      roman: 'Chhota stepper motor jo control board ke hukam par louver flap ko hilata hai.',
    },
    fault: {
      en: 'When it fails the flap does not move or makes a clicking noise.',
      roman: 'Kharab ho to flap nahi hilta ya click ki awaz aati hai.',
    },
  },
  evaporator: {
    name: { en: 'Evaporator Coil', roman: 'Evaporator Coil (Copper)' },
    unit: 'indoor',
    does: {
      en: 'Cold refrigerant flows through copper tubes and aluminium fins here, absorbing heat from room air so it comes out cool.',
      roman: 'Copper tubes aur aluminium fins mein thanda refrigerant behta hai jo kamre ki hawa se garmi kheench kar usay thanda karta hai.',
    },
    fault: {
      en: 'Dirt on the coil, low refrigerant or a leak reduces cooling and may cause ice or water dripping.',
      roman: 'Coil par mitti, gas kam hona ya leakage se cooling kam hoti hai aur barf ya paani tapakne lagta hai.',
    },
    service: 'ac-cooling-issue',
  },
  sensors: {
    name: { en: 'Temperature Sensors (Thermistors)', roman: 'Temperature Sensors (Thermistor)' },
    unit: 'indoor',
    does: {
      en: 'Measure room air and coil temperature and report it to the control board so the AC can cool correctly and protect itself.',
      roman: 'Kamre aur coil ka temperature naap kar control board ko batate hain taake AC theek cooling kare aur khud ko bachaye.',
    },
    fault: {
      en: 'A drifting or open sensor can cause wrong cooling, frequent on/off or error codes.',
      roman: 'Sensor kharab ho to cooling ghalat, baar baar on/off ya error code aata hai.',
    },
    service: 'ac-cooling-issue',
  },
  blower: {
    name: { en: 'Blower Fan', roman: 'Blower Fan' },
    unit: 'indoor',
    does: {
      en: 'A long cross-flow drum that pulls room air through the coil and pushes the cooled air out.',
      roman: 'Lambi drum jaisi fan jo kamre ki hawa ko coil se guzar kar thandi hawa bahar phenkti hai.',
    },
    fault: {
      en: 'Dust on the blades causes weak airflow, noise and bad smell; worn bearings cause rattling.',
      roman: 'Blades par mitti se hawa kam, shor aur badbu hoti hai; bearing ghis jaye to khatkhat ki awaz aati hai.',
    },
    service: 'ac-general-service',
  },
  fanMotor: {
    name: { en: 'Indoor Fan Motor', roman: 'Indoor Fan Motor' },
    unit: 'indoor',
    does: {
      en: 'Spins the blower fan. Its speed is controlled by the indoor control board.',
      roman: 'Blower fan ko ghumata hai. Iski speed indoor control board control karta hai.',
    },
    fault: {
      en: 'A weak or failed motor means little or no airflow, humming or burning smell.',
      roman: 'Motor kamzor ya kharab ho to hawa kam ya band, hum ki awaz ya jalne ki boo aati hai.',
    },
  },
  drainPan: {
    name: { en: 'Drain Pan', roman: 'Drain Pan' },
    unit: 'indoor',
    does: {
      en: 'Catches the water that condenses on the cold coil and sends it to the drain hose.',
      roman: 'Thande coil par jama hone wala paani pakar kar drain hose mein bhejta hai.',
    },
    fault: {
      en: 'A blocked drain or cracked pan makes water drip inside the room.',
      roman: 'Drain band ya pan toota ho to kamre mein paani tapakta hai.',
    },
    service: 'ac-water-leakage',
  },
  pcb: {
    name: { en: 'Indoor Control Board (PCB)', roman: 'Indoor PCB (Electronics Board)' },
    unit: 'indoor',
    does: {
      en: 'The brain of the indoor unit: reads sensors and the remote, runs the fan and louver, and talks to the outdoor unit.',
      roman: 'Indoor unit ka dimaagh: sensors aur remote parhta hai, fan aur louver chalata hai aur outdoor unit se rabta rakhta hai.',
    },
    fault: {
      en: 'Faults can cause no response to the remote, error codes or the AC not starting.',
      roman: 'Kharabi se remote ka jawab nahi milta, error code aata hai ya AC start nahi hota.',
    },
    service: 'inverter-pcb-repair',
  },
  terminal: {
    name: { en: 'Terminal Block', roman: 'Terminal Block' },
    unit: 'indoor',
    does: {
      en: 'Where the power and the inter-unit control cable are connected to the indoor unit.',
      roman: 'Yahan indoor unit ki bijli aur outdoor ki taraf jane wali cable judti hai.',
    },
    fault: {
      en: 'Loose or burnt terminals cause intermittent power and can be a fire risk; only a technician should handle them.',
      roman: 'Dheele ya jale terminals se bijli aati jaati hai aur aag ka khatra hota hai; ise sirf technician hi dekhe.',
    },
  },
  chassis: {
    name: { en: 'Main Body (Chassis)', roman: 'Main Body (Chassis)' },
    unit: 'indoor',
    does: {
      en: 'The frame that holds the coil, fan, motors and board in place.',
      roman: 'Wo dhancha jo coil, fan, motors aur board ko apni jagah rakhta hai.',
    },
    fault: {
      en: 'Rarely fails, but a loose mount can cause vibration noise.',
      roman: 'Kam hi kharab hota hai, lekin dheela hone par vibration ki awaz aa sakti hai.',
    },
    service: 'ac-installation',
  },
  bracket: {
    name: { en: 'Wall Mounting Bracket', roman: 'Deewar Bracket' },
    unit: 'indoor',
    does: {
      en: 'The plate fixed to the wall that the indoor unit hangs on.',
      roman: 'Deewar par lagi plate jis par indoor unit latakta hai.',
    },
    fault: {
      en: 'A poorly fixed bracket can make the unit tilt (causing water leaks) or vibrate.',
      roman: 'Bracket theek na laga ho to unit tirchha hota hai (paani leak) ya hilta hai.',
    },
    service: 'ac-installation',
  },

  // ---- Outdoor unit ----
  odCasing: {
    name: { en: 'Outdoor Unit Casing', roman: 'Outdoor Unit Casing' },
    unit: 'outdoor',
    does: {
      en: 'Protects the compressor, coil and electronics from rain, dust and sun.',
      roman: 'Compressor, coil aur electronics ko barish, mitti aur dhoop se bachata hai.',
    },
    fault: {
      en: 'Rust or damage lets water and dirt reach the electrical parts.',
      roman: 'Zang ya toot phoot se paani aur mitti bijli ke parts tak pohanch jati hai.',
    },
  },
  compressor: {
    name: { en: 'Compressor', roman: 'Compressor' },
    unit: 'outdoor',
    does: {
      en: 'The heart of the AC: it compresses the refrigerant gas and circulates it through the system.',
      roman: 'AC ka dil: refrigerant gas ko dabata hai aur poore system mein ghumata hai.',
    },
    fault: {
      en: 'If it will not start or trips, the AC blows warm air. Often related to capacitor, wiring or board faults.',
      roman: 'Start na ho ya trip kare to AC garam hawa deta hai. Aksar capacitor, wiring ya board ki kharabi hoti hai.',
    },
    service: 'ac-cooling-issue',
  },
  odCondenser: {
    name: { en: 'Condenser Coil', roman: 'Condenser Coil' },
    unit: 'outdoor',
    does: {
      en: 'Releases the heat collected from your room into the outside air.',
      roman: 'Kamre se kheenchi hui garmi ko bahar ki hawa mein chhor deta hai.',
    },
    fault: {
      en: 'A dirty coil makes the AC work harder, cool less and use more electricity. Jet washing helps.',
      roman: 'Coil ganda ho to AC zyada mehnat karta hai, cooling kam aur bijli zyada lagti hai. Jet wash se faida hota hai.',
    },
    service: 'ac-general-service',
  },
  odFan: {
    name: { en: 'Outdoor Fan', roman: 'Outdoor Fan' },
    unit: 'outdoor',
    does: {
      en: 'Blows outside air across the condenser coil to carry the heat away.',
      roman: 'Bahar ki hawa ko condenser coil par phenkti hai taake garmi nikal jaye.',
    },
    fault: {
      en: 'A slow or stopped fan leads to overheating and the AC shutting off.',
      roman: 'Fan slow ya band ho to unit garam hokar band ho jata hai.',
    },
  },
  odFanMotor: {
    name: { en: 'Outdoor Fan Motor', roman: 'Outdoor Fan Motor' },
    unit: 'outdoor',
    does: {
      en: 'Drives the outdoor fan.',
      roman: 'Outdoor fan ko chalata hai.',
    },
    fault: {
      en: 'A failing motor or weak capacitor gives a slow fan, humming or no spin.',
      roman: 'Motor ya capacitor kamzor ho to fan slow chalta hai, hum karta hai ya ghoomta hi nahi.',
    },
  },
  capacitor: {
    name: { en: 'Run Capacitor', roman: 'Run Capacitor' },
    unit: 'outdoor',
    does: {
      en: 'Gives motors the extra electrical push to start and run smoothly (found on many non-inverter ACs).',
      roman: 'Motors ko start hone aur theek chalne ke liye bijli ka dhakka deta hai (aksar non-inverter ACs mein hota hai).',
    },
    fault: {
      en: 'A weak capacitor is one of the most common reasons for a humming compressor or fan that will not start.',
      roman: 'Kamzor capacitor compressor ya fan ke hum karne aur start na hone ki aam wajah hai.',
    },
    service: 'ac-cooling-issue',
  },
  odBoard: {
    name: { en: 'Outdoor Control Board', roman: 'Outdoor Control Board' },
    unit: 'outdoor',
    does: {
      en: 'Controls the compressor and outdoor fan and follows instructions from the indoor unit.',
      roman: 'Compressor aur outdoor fan ko control karta hai aur indoor unit ke hukam par chalta hai.',
    },
    fault: {
      en: 'Board faults can stop the compressor or show error codes; moisture and power surges are common causes.',
      roman: 'Board kharab ho to compressor band ya error code aata hai; nami aur bijli ke jhatke aam wajah hain.',
    },
    service: 'inverter-pcb-repair',
  },
  valves: {
    name: { en: 'Service Valves (Gas & Liquid)', roman: 'Service Valves (Gas & Liquid)' },
    unit: 'outdoor',
    does: {
      en: 'The connection points for the two refrigerant pipes; technicians also use them for gas pressure checks and refilling.',
      roman: 'Dono refrigerant pipes yahan judti hain; technician gas pressure check aur refill bhi yahin se karta hai.',
    },
    fault: {
      en: 'Loose flare nuts or a damaged valve can leak refrigerant.',
      roman: 'Flare nut dheeli ho ya valve kharab ho to gas leak ho sakti hai.',
    },
    service: 'ac-cooling-issue',
  },

  // ---- Wiring / pipes ----
  harness: {
    name: { en: 'Indoor Wiring Harness', roman: 'Indoor Wiring (Taarein)' },
    unit: 'wiring',
    does: {
      en: 'Low-voltage wires from the control board to the fan motor, swing motor, sensors and display. Colours are examples only; real colours differ by brand.',
      roman: 'Control board se fan motor, swing motor, sensors aur display tak ki taarein. Rang sirf misaal hain; asal rang brand ke hisab se alag hote hain.',
    },
    fault: {
      en: 'Loose plugs or chewed wires cause random errors or parts not working.',
      roman: 'Dheeli plug ya chuhon se kati taar se aksar error aur parts band hone ka masla hota hai.',
    },
  },
  interconnect: {
    name: { en: 'Inter-Unit Cable (Indoor to Outdoor)', roman: 'Indoor se Outdoor Cable' },
    unit: 'wiring',
    does: {
      en: 'Carries power and control signals between the indoor and outdoor unit, plus the earth wire. Wire layout varies by model.',
      roman: 'Indoor aur outdoor unit ke darmiyan bijli aur control signals le jati hai, saath earth taar bhi. Layout model ke hisab se alag hota hai.',
    },
    fault: {
      en: 'A wrong connection or damaged cable can trigger a communication error and stop the AC.',
      roman: 'Ghalat connection ya kharab cable se communication error aata hai aur AC band ho jata hai.',
    },
  },
  compWires: {
    name: { en: 'Compressor Wiring', roman: 'Compressor ki Taarein' },
    unit: 'wiring',
    does: {
      en: 'Heavier wires that deliver power from the outdoor board to the compressor terminals.',
      roman: 'Mote taar jo outdoor board se compressor tak bijli pohanchate hain.',
    },
    fault: {
      en: 'Burnt or loose terminals cause the compressor to trip or not start.',
      roman: 'Jale ya dheele terminals se compressor trip karta hai ya start nahi hota.',
    },
  },
  pipes: {
    name: { en: 'Refrigerant Pipes', roman: 'Refrigerant Pipes (Copper)' },
    unit: 'wiring',
    does: {
      en: 'Two copper pipes join the indoor and outdoor units: the thicker insulated gas pipe and the thinner liquid pipe.',
      roman: 'Do copper pipes indoor aur outdoor ko jorti hain: mota insulated gas pipe aur patla liquid pipe.',
    },
    fault: {
      en: 'Leaks at joints lower cooling; damaged insulation causes sweating and dripping.',
      roman: 'Jorh par leak se cooling kam hoti hai; insulation kharab ho to pipe par paani aata hai.',
    },
    service: 'ac-cooling-issue',
  },
  drain: {
    name: { en: 'Drain Hose', roman: 'Drain Hose' },
    unit: 'wiring',
    does: {
      en: 'Carries condensed water from the drain pan to the outside.',
      roman: 'Drain pan ka jama paani bahar le jata hai.',
    },
    fault: {
      en: 'A kinked or blocked hose makes water overflow indoors.',
      roman: 'Hose mur jaye ya band ho to paani andar gir jata hai.',
    },
    service: 'ac-water-leakage',
  },
};

/** Order labels/legend appear in. */
export const PART_ORDER: string[] = Object.keys(PART_INFO);
