/* ===========================================
   PART 2: JAVASCRIPT FUNCTIONS
   Demonstrating Scope, Parameters & Return Values
   =========================================== */

// Global Variables (demonstrating global scope)
let globalCounter = 0;
const globalMessage = "This is a global variable";

/**
 * Mathematical Functions - Parameters and Return Values
 */

// Function with parameters that returns a value
function addNumbers(a, b) {
    // Local variable (demonstrating local scope)
    const result = a + b;
    return result; // Return value
}

// Function with multiple parameters and different operations
function performMathOperation(num1, num2, operation) {
    let result;
    
    // Local variables - only accessible within this function
    const localMultiplier = 2;
    
    switch(operation) {
        case 'add':
            result = addNumbers(num1, num2); // Calling another function
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'power':
            result = Math.pow(num1, num2);
            break;
        default:
            result = 0;
    }
    
    return {
        operation: operation,
        result: result,
        localNote: `Used local multiplier: ${localMultiplier}`
    };
}

// Function demonstrating scope concepts
function demonstrateScope() {
    // Local variables
    let localVariable = "This is local to demonstrateScope()";
    globalCounter++; // Accessing global variable
    
    // Nested function demonstrating nested scope
    function nestedFunction() {
        let nestedLocal = "This is local to nestedFunction()";
        return `Global: ${globalMessage}, Outer Local: ${localVariable}, Nested: ${nestedLocal}`;
    }
    
    // Update the display
    document.getElementById('global-var').textContent = globalMessage;
    document.getElementById('local-var').textContent = localVariable;
    document.getElementById('function-result').textContent = nestedFunction();
    
    return nestedFunction();
}

/**
 * String Processing Functions
 */

// Function to reverse a string
function reverseString(str) {
    return str.split('').reverse().join('');
}

// Function to count words
function countWords(str) {
    if (!str.trim()) return 0;
    return str.trim().split(/\s+/).length;
}

// Function to check if string is palindrome
function isPalindrome(str) {
    const cleaned = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    return cleaned === reverseString(cleaned);
}

// Main text processing function with parameter-based logic
function processText(operation) {
    const input = document.getElementById('text-input').value;
    const resultDiv = document.getElementById('text-result');
    let result;
    
    // Using parameters to determine function behavior
    switch(operation) {
        case 'reverse':
            result = `Reversed: "${reverseString(input)}"`;
            break;
        case 'uppercase':
            result = `Uppercase: "${input.toUpperCase()}"`;
            break;
        case 'count':
            result = `Word count: ${countWords(input)}`;
            break;
        case 'palindrome':
            result = `Is palindrome: ${isPalindrome(input) ? 'Yes! 🎉' : 'No'}`;
            break;
        default:
            result = 'Unknown operation';
    }
    
    resultDiv.textContent = result;
    
    // Add visual feedback with CSS class manipulation
    resultDiv.style.background = '#e6fffa';
    resultDiv.style.borderColor = '#48bb78';
    
    return result; // Return the result for potential reuse
}

// Calculator function called by HTML onclick
function performCalculation() {
    const num1 = parseFloat(document.getElementById('num1').value) || 0;
    const num2 = parseFloat(document.getElementById('num2').value) || 0;
    const operation = document.getElementById('operation').value;
    
    // Use our function with parameters
    const calculationResult = performMathOperation(num1, num2, operation);
    
    document.getElementById('calc-result').innerHTML = `
        <strong>Result:</strong> ${calculationResult.result}<br>
        <strong>Operation:</strong> ${calculationResult.operation}<br>
        <small>${calculationResult.localNote}</small>
    `;
}

/* ===========================================
   PART 3: CSS + JAVASCRIPT INTEGRATION
   JavaScript controlling CSS animations dynamically
   =========================================== */

/**
 * Animation Control Functions
 */

// Function to trigger CSS animations via class manipulation
function triggerAnimation(animationType) {
    const box = document.getElementById('animationBox');
    
    // Remove all animation classes first (cleanup)
    resetAnimations();
    
    // Add the specific animation class
    setTimeout(() => {
        box.classList.add(animationType);
    }, 50);
    
    // Remove the animation class after animation completes
    setTimeout(() => {
        box.classList.remove(animationType);
    }, getAnimationDuration(animationType));
}

// Helper function to get animation duration (returns value)
function getAnimationDuration(animationType) {
    const durations = {
        'bounce': 800,
        'spin': 1000,
        'shake': 600,
        'glow': 2000
    };
    return durations[animationType] || 1000;
}

// Reset all animations
function resetAnimations() {
    const box = document.getElementById('animationBox');
    box.classList.remove('bounce', 'spin', 'shake', 'glow');
}

/**
 * Card Flip Functions
 */

// Toggle card flip state
function flipCard() {
    const card = document.getElementById('flipCard');
    card.classList.toggle('flipped');
    
    // Return current state for potential use
    return card.classList.contains('flipped');
}

/**
 * Modal Control Functions
 */

// Show modal with CSS animation
function showModal() {
    const overlay = document.getElementById('modalOverlay');
    overlay.classList.add('show');
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

// Hide modal with CSS animation
function hideModal() {
    const overlay = document.getElementById('modalOverlay');
    overlay.classList.remove('show');
    
    // Restore body scrolling
    document.body.style.overflow = 'auto';
}

// Toggle loading spinner
function toggleSpinner() {
    const spinner = document.getElementById('spinner');
    spinner.classList.toggle('active');
    
    return spinner.classList.contains('active');
}

/**
 * Dynamic Theme Functions
 */

// Set theme by manipulating body classes
function setTheme(themeName) {
    const body = document.body;
    
    // Remove all theme classes
    body.classList.remove('theme-light', 'theme-dark', 'theme-colorful');
    
    // Add the selected theme class
    body.classList.add(`theme-${themeName}`);
    
    // Store theme preference (in a real app, this would use localStorage)
    // Note: localStorage not used due to Claude.ai environment restrictions
    console.log(`Theme changed to: ${themeName}`);
    
    // Animate the theme change with a temporary pulse effect
    body.style.transition = 'all 0.5s ease';
    
    return themeName; // Return selected theme
}

/**
 * Advanced Integration Functions
 */

// Function that combines multiple animations in sequence
function performComplexAnimation() {
    const box = document.getElementById('animationBox');
    
    // Chain multiple animations using setTimeout and promises
    triggerAnimation('bounce');
    
    setTimeout(() => {
        triggerAnimation('spin');
    }, 1000);
    
    setTimeout(() => {
        triggerAnimation('glow');
    }, 2000);
}

// Function to create dynamic CSS properties
function createDynamicStyle(element, property, value, duration = 300) {
    if (element) {
        element.style.transition = `${property} ${duration}ms ease`;
        element.style[property] = value;
    }
}

// Random color generator function
function generateRandomColor() {
    const colors = [
        '#667eea', '#764ba2', '#ff6b6b', '#feca57',
        '#48bb78', '#38a169', '#a8e6cf', '#88d8c0',
        '#ff9ff3', '#f368e0'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Function to apply random colors to animation box
function randomizeBoxColor() {
    const box = document.getElementById('animationBox');
    const randomColor1 = generateRandomColor();
    const randomColor2 = generateRandomColor();
    
    createDynamicStyle(box, 'background', `linear-gradient(45deg, ${randomColor1}, ${randomColor2})`);
    
    return { color1: randomColor1, color2: randomColor2 };
}

/**
 * Event Listeners and Initialization
 */

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Animation Playground loaded successfully!');
    
    // Add click listener to close modal when clicking outside
    document.getElementById('modalOverlay').addEventListener('click', function(e) {
        if (e.target === this) {
            hideModal();
        }
    });
    
    // Add keyboard listener for ESC to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideModal();
        }
    });
    
    // Add double-click functionality to animation box
    document.getElementById('animationBox').addEventListener('dblclick', function() {
        performComplexAnimation();
        randomizeBoxColor();
    });
    
    // Initialize with a welcome message
    setTimeout(() => {
        console.log('All functions initialized. Try interacting with the elements!');
    }, 1000);
});

/**
 * Utility Functions for Demonstration
 */

// Function to demonstrate parameter passing and return values
function calculateAreaAndPerimeter(length, width) {
    // Local calculations
    const area = length * width;
    const perimeter = 2 * (length + width);
    
    // Return multiple values as an object
    return {
        area: area,
        perimeter: perimeter,
        dimensions: `${length}x${width}`,
        isSquare: length === width
    };
}

// Function to demonstrate array manipulation with parameters
function processArray(arr, operation) {
    switch(operation) {
        case 'sum':
            return arr.reduce((sum, num) => sum + num, 0);
        case 'average':
            return arr.length ? arr.reduce((sum, num) => sum + num, 0) / arr.length : 0;
        case 'max':
            return Math.max(...arr);
        case 'min':
            return Math.min(...arr);
        case 'sort':
            return [...arr].sort((a, b) => a - b); // Return new sorted array
        default:
            return arr;
    }
}

// Function demonstrating closure concept
function createCounter(initialValue = 0) {
    let count = initialValue; // Private variable due to closure
    
    return {
        increment: () => ++count,
        decrement: () => --count,
        getValue: () => count,
        reset: () => { count = initialValue; return count; }
    };
}

// Example usage of closure-based counter (demonstrating advanced scope)
const pageCounter = createCounter(1);

/* ===========================================
   ADDITIONAL ENHANCEMENT FUNCTIONS
   Extra interactive features for better demo
   =========================================== */

// Function to add interactive hover effects programmatically
function addInteractiveEffects() {
    const cards = document.querySelectorAll('.demo-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            createDynamicStyle(this, 'transform', 'scale(1.02) translateY(-5px)');
        });
        
        card.addEventListener('mouseleave', function() {
            createDynamicStyle(this, 'transform', 'scale(1) translateY(0)');
        });
    });
}

// Call the enhancement function after DOM loads
document.addEventListener('DOMContentLoaded', addInteractiveEffects);

/**
 * SUMMARY OF CONCEPTS DEMONSTRATED:
 * 
 * PART 1 - CSS Animations & Transitions:
 * - @keyframes animations (titleGlow, float, rotate360, pulse, etc.)
 * - CSS transitions on hover effects
 * - Transform and animation properties
 * - Continuous and triggered animations
 * 
 * PART 2 - JavaScript Functions:
 * - Functions with parameters: addNumbers(a, b), performMathOperation(num1, num2, operation)
 * - Return values: All functions return meaningful data
 * - Local vs Global scope: globalCounter, localVariable examples
 * - Nested functions: nestedFunction() inside demonstrateScope()
 * - Function reusability: processText() handles multiple operations
 * 
 * PART 3 - CSS + JavaScript Integration:
 * - Adding/removing CSS classes: triggerAnimation(), setTheme()
 * - Dynamic style manipulation: createDynamicStyle()
 * - Event-driven animations: modal show/hide, card flip
 * - Chained animations: performComplexAnimation()
 * - State management: tracking animation states and theme preferences
 */