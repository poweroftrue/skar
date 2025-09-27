// Zodiac Sign Calculator and Data
const zodiacData = {
    // Fire Signs (Red)
    'aries': {
        name: 'ARIES',
        subtitle: 'CARDINAL FIRE',
        verdict: 'First to fight, last to yield',
        element: 'fire',
        elementColor: '#8B0000',
        dateRange: { start: { month: 3, day: 21 }, end: { month: 4, day: 19 } },
        scents: ['IGNITION', 'WARRIOR\'S BLOOD', 'CARDINAL FLAME']
    },
    'leo': {
        name: 'LEO',
        subtitle: 'SOLAR',
        verdict: 'Born under fire, built to command',
        element: 'fire',
        elementColor: '#8B0000',
        dateRange: { start: { month: 7, day: 23 }, end: { month: 8, day: 22 } },
        scents: ['SOLAR THRONE', 'GOLDEN FURY', 'SOVEREIGN']
    },
    'sagittarius': {
        name: 'SAGITTARIUS',
        subtitle: 'MUTABLE FIRE',
        verdict: 'Wild flames cannot be tamed',
        element: 'fire',
        elementColor: '#8B0000',
        dateRange: { start: { month: 11, day: 22 }, end: { month: 12, day: 21 } },
        scents: ['NOMAD\'S FIRE', 'ARROW\'S FLIGHT', 'WANDERLUST']
    },
    
    // Earth Signs (Nude)
    'taurus': {
        name: 'TAURUS',
        subtitle: 'FIXED EARTH',
        verdict: 'Rooted in power, crowned in luxury',
        element: 'earth',
        elementColor: '#C4A57B',
        dateRange: { start: { month: 4, day: 20 }, end: { month: 5, day: 20 } },
        scents: ['TERRA FIRMA', 'BULL\'S BLOOD', 'ANCIENT SOIL']
    },
    'virgo': {
        name: 'VIRGO',
        subtitle: 'MUTABLE EARTH',
        verdict: 'Perfection is the only standard',
        element: 'earth',
        elementColor: '#C4A57B',
        dateRange: { start: { month: 8, day: 23 }, end: { month: 9, day: 22 } },
        scents: ['VIRGIN STONE', 'HARVEST MOON', 'PURE EARTH']
    },
    'capricorn': {
        name: 'CAPRICORN',
        subtitle: 'CARDINAL EARTH',
        verdict: 'The mountain bows to no one',
        element: 'earth',
        elementColor: '#C4A57B',
        dateRange: { start: { month: 12, day: 22 }, end: { month: 1, day: 19 } },
        scents: ['SUMMIT', 'GOAT\'S THRONE', 'BEDROCK']
    },
    
    // Air Signs (Black)
    'gemini': {
        name: 'GEMINI',
        subtitle: 'MUTABLE AIR',
        verdict: 'Two faces, infinite possibilities',
        element: 'air',
        elementColor: '#0a0a0a',
        dateRange: { start: { month: 5, day: 21 }, end: { month: 6, day: 20 } },
        scents: ['DUALITY', 'MERCURY\'S WHISPER', 'TWIN SHADOW']
    },
    'libra': {
        name: 'LIBRA',
        subtitle: 'CARDINAL AIR',
        verdict: 'Balance is power, power is balance',
        element: 'air',
        elementColor: '#0a0a0a',
        dateRange: { start: { month: 9, day: 23 }, end: { month: 10, day: 22 } },
        scents: ['EQUILIBRIUM', 'SCALE\'S EDGE', 'JUDGMENT']
    },
    'aquarius': {
        name: 'AQUARIUS',
        subtitle: 'FIXED AIR',
        verdict: 'The future belongs to the rebellious',
        element: 'air',
        elementColor: '#0a0a0a',
        dateRange: { start: { month: 1, day: 20 }, end: { month: 2, day: 18 } },
        scents: ['REVOLUTION', 'ELECTRIC AIR', 'PROMETHEUS']
    },
    
    // Water Signs (Dark Blue)
    'cancer': {
        name: 'CANCER',
        subtitle: 'CARDINAL WATER',
        verdict: 'Soft shell, iron soul',
        element: 'water',
        elementColor: '#001F3F',
        dateRange: { start: { month: 6, day: 21 }, end: { month: 7, day: 22 } },
        scents: ['LUNAR TIDE', 'SHELL\'S SECRET', 'DEEP CURRENT']
    },
    'scorpio': {
        name: 'SCORPIO',
        subtitle: 'FIXED WATER',
        verdict: 'In darkness, we find our truth',
        element: 'water',
        elementColor: '#001F3F',
        dateRange: { start: { month: 10, day: 23 }, end: { month: 11, day: 21 } },
        scents: ['VENOM', 'OBSIDIAN WATER', 'UNDERWORLD']
    },
    'pisces': {
        name: 'PISCES',
        subtitle: 'MUTABLE WATER',
        verdict: 'Dreams are the only reality',
        element: 'water',
        elementColor: '#001F3F',
        dateRange: { start: { month: 2, day: 19 }, end: { month: 3, day: 20 } },
        scents: ['NEPTUNE\'S DREAM', 'MYSTIC OCEAN', 'INFINITE DEPTH']
    }
};

// Calculate zodiac sign based on month and day
function getZodiacSign(month, day) {
    // Handle Capricorn edge case (crosses year boundary)
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
        return 'capricorn';
    }
    
    // Check all other signs
    for (const [sign, data] of Object.entries(zodiacData)) {
        const { start, end } = data.dateRange;
        
        if (month === start.month && day >= start.day) {
            return sign;
        } else if (month === end.month && day <= end.day) {
            return sign;
        } else if (month > start.month && month < end.month) {
            return sign;
        }
    }
    
    return null;
}

// Get zodiac data by sign
function getZodiacData(sign) {
    return zodiacData[sign] || null;
}

// Get element color
function getElementColor(element) {
    const colors = {
        'fire': '#8B0000',
        'earth': '#C4A57B',
        'air': '#0a0a0a',
        'water': '#001F3F'
    };
    return colors[element] || '#000000';
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getZodiacSign, getZodiacData, getElementColor, zodiacData };
}


