// Agricultural Knowledge Base
// This file contains the farming knowledge organized by topics

const farmingKnowledge = {
    // Vegetables
    vegetables: {
        keywords: ['tomato', 'carrot', 'lettuce', 'cucumber', 'pepper', 'spinach', 'broccoli', 'cauliflower', 'cabbage', 'vegetable', 'veggies'],
        responses: [
            {
                pattern: /tomato/i,
                answer: "Tomatoes love full sun (6-8 hours daily) and well-drained soil. Plant them deep, burying 2/3 of the stem. Water regularly but avoid wetting the leaves to prevent disease. They need support like cages or stakes as they grow."
            },
            {
                pattern: /carrot/i,
                answer: "Carrots prefer loose, sandy soil free of rocks. Sow seeds directly in the ground as they don't transplant well. Keep soil consistently moist during germination. Thin seedlings to 2-3 inches apart for best growth."
            },
            {
                pattern: /lettuce/i,
                answer: "Lettuce is a cool-season crop that grows quickly. Plant in early spring or fall. It needs consistent moisture and partial shade in hot weather. Harvest outer leaves for continuous production."
            }
        ],
        general: "Vegetables need good soil, adequate water, and proper spacing. Most vegetables prefer 6-8 hours of sunlight daily. What specific vegetable are you interested in growing?"
    },

    // Fruits
    fruits: {
        keywords: ['apple', 'strawberry', 'blueberry', 'grape', 'melon', 'watermelon', 'fruit', 'berry'],
        responses: [
            {
                pattern: /strawberry|strawberries/i,
                answer: "Strawberries are perfect for beginners! Plant in spring with crowns just above soil level. They love full sun and slightly acidic soil. Mulch around plants to keep berries clean. Harvest when fully red."
            },
            {
                pattern: /blueberry|blueberries/i,
                answer: "Blueberries need acidic soil (pH 4.5-5.5). Plant 2-3 different varieties for better pollination. They require consistent moisture and full sun. Mulch with pine needles or wood chips to maintain soil acidity."
            }
        ],
        general: "Fruit plants often need a year or two to establish before heavy production. They generally prefer full sun and well-drained soil. Which fruit are you interested in growing?"
    },

    // Herbs
    herbs: {
        keywords: ['basil', 'mint', 'rosemary', 'thyme', 'oregano', 'parsley', 'cilantro', 'herb', 'herbs'],
        responses: [
            {
                pattern: /basil/i,
                answer: "Basil loves warm weather and full sun. Plant after last frost when soil is warm. Pinch off flower buds to encourage leaf growth. Water regularly but don't overwater. Great in containers!"
            },
            {
                pattern: /mint/i,
                answer: "Mint grows vigorously - almost too well! Plant in containers to prevent it from taking over. It tolerates partial shade and needs consistent moisture. Perfect for beginners as it's nearly impossible to kill!"
            },
            {
                pattern: /rosemary/i,
                answer: "Rosemary is a Mediterranean herb that loves dry conditions and full sun. Don't overwater! It's drought-tolerant once established. Great in containers or as a small shrub in warm climates."
            }
        ],
        general: "Herbs are excellent for beginners! Most herbs prefer well-drained soil and regular harvesting to stay productive. Many grow well in containers. Which herb interests you?"
    },

    // Soil Care
    soil: {
        keywords: ['soil', 'compost', 'fertilizer', 'dirt', 'earth', 'ground', 'ph', 'nutrients'],
        responses: [
            {
                pattern: /compost/i,
                answer: "Compost is 'black gold' for gardens! Mix kitchen scraps (fruits, vegetables, coffee grounds) with yard waste (leaves, grass). Keep it moist and turn occasionally. Ready in 3-6 months. Avoid meat, dairy, and pet waste."
            },
            {
                pattern: /fertilizer/i,
                answer: "Fertilizer provides essential nutrients: Nitrogen (N) for leaves, Phosphorus (P) for roots, Potassium (K) for overall health. Organic options include compost, manure, and fish emulsion. Start with balanced 10-10-10 fertilizer."
            },
            {
                pattern: /ph/i,
                answer: "Soil pH affects nutrient availability. Most vegetables prefer pH 6.0-7.0 (slightly acidic to neutral). Test your soil with a kit. Add lime to raise pH or sulfur to lower it. Blueberries need acidic soil (pH 4.5-5.5)."
            }
        ],
        general: "Healthy soil is the foundation of a great garden! Good soil should be loose, rich in organic matter, and well-draining. What specific soil question do you have?"
    },

    // Watering
    water: {
        keywords: ['water', 'irrigation', 'watering', 'drought', 'moisture', 'drip', 'sprinkler'],
        responses: [
            {
                pattern: /how often|frequency|schedule/i,
                answer: "Most vegetables need 1-2 inches of water per week. Water deeply but less frequently to encourage deep roots. Morning watering is best to prevent disease. Stick your finger in soil - if top 2 inches are dry, it's time to water!"
            },
            {
                pattern: /drip|irrigation/i,
                answer: "Drip irrigation is highly efficient! It delivers water directly to plant roots, reducing waste and disease. Soaker hoses are a budget-friendly alternative. Both save water compared to sprinklers."
            },
            {
                pattern: /overwater|too much/i,
                answer: "Overwatering is a common mistake! Signs include yellow leaves, wilting (even when wet), and root rot. Ensure good drainage and let soil dry slightly between waterings. Most plants prefer deep, infrequent watering."
            }
        ],
        general: "Proper watering is crucial for healthy plants. The key is consistency and proper drainage. What watering question can I help with?"
    },

    // Pest Control
    pests: {
        keywords: ['pest', 'bug', 'insect', 'aphid', 'caterpillar', 'beetle', 'disease', 'fungus', 'mold'],
        responses: [
            {
                pattern: /aphid/i,
                answer: "Aphids are small, soft-bodied insects that cluster on new growth. Control them with: 1) Strong water spray, 2) Ladybugs (natural predators), 3) Neem oil spray, 4) Insecticidal soap. Check plants regularly!"
            },
            {
                pattern: /organic|natural/i,
                answer: "Organic pest control options: 1) Companion planting (marigolds repel many pests), 2) Hand-picking, 3) Neem oil, 4) Diatomaceous earth, 5) Beneficial insects, 6) Row covers. Prevention is best!"
            },
            {
                pattern: /yellow leaves|yellowing/i,
                answer: "Yellow leaves can indicate: 1) Overwatering/underwatering, 2) Nitrogen deficiency, 3) Poor drainage, 4) Root problems, 5) Natural aging (lower leaves). Check soil moisture and drainage first!"
            }
        ],
        general: "Pest problems are normal in gardening. The key is early detection and using integrated pest management. Prevention through healthy plants is your best defense. What pest issue are you facing?"
    },

    // Seasonal Planting
    seasons: {
        keywords: ['season', 'spring', 'summer', 'fall', 'winter', 'plant', 'month', 'calendar', 'when'],
        responses: [
            {
                pattern: /spring/i,
                answer: "Spring (March-May): Perfect for cool-season crops! Plant: lettuce, peas, carrots, broccoli, cabbage. After last frost, start warm-season crops: tomatoes, peppers, cucumbers, squash. Spring is planting season!"
            },
            {
                pattern: /summer/i,
                answer: "Summer (June-August): Maintain and harvest! Water regularly during heat. Plant quick-growing crops like beans, cucumbers, summer squash. Late summer, start fall crops like kale, broccoli, carrots."
            },
            {
                pattern: /fall|autumn/i,
                answer: "Fall (September-November): Second growing season! Plant cool-season crops: kale, lettuce, spinach, radishes, carrots. Many taste better after light frost. Perfect for garlic planting (October)."
            },
            {
                pattern: /winter/i,
                answer: "Winter (December-February): Planning and preparation time! Review last year, order seeds, prepare garden beds, start indoor seedlings (6-8 weeks before last frost). In mild climates, grow hardy greens!"
            }
        ],
        general: "Seasonal timing is crucial for gardening success! Cool-season crops prefer spring/fall, while warm-season crops need summer heat. What season are you planning for?"
    },

    // Tools
    tools: {
        keywords: ['tool', 'equipment', 'shovel', 'rake', 'hoe', 'trowel', 'pruner', 'gloves'],
        responses: [
            {
                pattern: /beginner|starter|basic/i,
                answer: "Essential beginner tools: 1) Hand trowel, 2) Garden gloves, 3) Watering can/hose, 4) Pruning shears, 5) Small shovel. Start simple and add tools as needed. Quality tools last longer!"
            },
            {
                pattern: /pruning|pruner|shears/i,
                answer: "Pruning shears (secateurs) are essential for trimming, harvesting, and deadheading. Bypass pruners (scissor-action) are best for live plants. Keep blades sharp and clean. Budget: $15-30 for good quality."
            }
        ],
        general: "Good tools make gardening easier and more enjoyable! Start with basics and invest in quality for tools you'll use frequently. What tools are you curious about?"
    }
};

// Seasonal information based on current month
const seasonalInfo = {
    0: { season: 'Winter', advice: 'Plan your garden and start seeds indoors!' },
    1: { season: 'Winter', advice: 'Start planning and ordering seeds!' },
    2: { season: 'Early Spring', advice: 'Plant cool-season crops and prepare beds!' },
    3: { season: 'Spring', advice: 'Main planting season - get growing!' },
    4: { season: 'Spring', advice: 'Plant warm-season crops after last frost!' },
    5: { season: 'Late Spring', advice: 'Maintain and watch for pests!' },
    6: { season: 'Summer', advice: 'Water regularly and harvest!' },
    7: { season: 'Summer', advice: 'Peak harvest time!' },
    8: { season: 'Late Summer', advice: 'Plant fall crops now!' },
    9: { season: 'Fall', advice: 'Perfect for cool-season crops!' },
    10: { season: 'Fall', advice: 'Plant garlic and prepare for winter!' },
    11: { season: 'Early Winter', advice: 'Clean up and plan next season!' }
};

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { farmingKnowledge, seasonalInfo };
}
