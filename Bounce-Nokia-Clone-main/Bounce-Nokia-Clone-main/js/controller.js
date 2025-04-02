class Controller {
    constructor(game) {
        this.game = game;
        this.keys = {
            left: false,
            right: false,
            up: false
        };
        
        // Keyboard controls
        this.keyMap = {
            'ArrowLeft': 'left',
            'ArrowRight': 'right',
            'ArrowUp': 'up',
            'a': 'left',
            'd': 'right',
            'w': 'up',
            ' ': 'up' // Spacebar
        };

        // Setup event listeners
        this.setupKeyboardControls();
        this.setupTouchControls();

        this.isMobile = MobileUtils.isMobile();
        if (this.isMobile) {
            MobileUtils.preventDefaultTouchActions();
            this.setupMobileControls();
        }
    }

    setupKeyboardControls() {
        window.addEventListener('keydown', (e) => {
            const direction = this.keyMap[e.key];
            if (direction) {
                this.keys[direction] = true;
                e.preventDefault();
            }
        });

        window.addEventListener('keyup', (e) => {
            const direction = this.keyMap[e.key];
            if (direction) {
                this.keys[direction] = false;
                e.preventDefault();
            }
        });
    }

    setupTouchControls() {
        const leftBtn = document.getElementById('leftBtn');
        const rightBtn = document.getElementById('rightBtn');
        const jumpBtn = document.getElementById('jumpBtn');

        // Touch events for mobile
        const handleTouch = (element, direction, isDown) => {
            const touchStart = () => this.keys[direction] = isDown;
            const touchEnd = () => this.keys[direction] = !isDown;

            element.addEventListener('touchstart', touchStart);
            element.addEventListener('touchend', touchEnd);
            element.addEventListener('mousedown', touchStart);
            element.addEventListener('mouseup', touchEnd);
        };

        handleTouch(leftBtn, 'left', true);
        handleTouch(rightBtn, 'right', true);
        handleTouch(jumpBtn, 'up', true);
    }

    setupMobileControls() {
        const buttons = document.querySelectorAll('.control-btn');
        
        buttons.forEach(button => {
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const direction = this.getButtonDirection(button.id);
                if (direction) {
                    this.keys[direction] = true;
                }
            });
            
            button.addEventListener('touchend', (e) => {
                e.preventDefault();
                const direction = this.getButtonDirection(button.id);
                if (direction) {
                    this.keys[direction] = false;
                }
            });
        });
    }
    
    getButtonDirection(buttonId) {
        const directions = {
            'leftBtn': 'left',
            'rightBtn': 'right',
            'jumpBtn': 'up'
        };
        return directions[buttonId];
    }

    update() {
        // Update game input based on current key states
        if (this.game.input) {
            this.game.input.keys.left.hold = this.keys.left;
            this.game.input.keys.right.hold = this.keys.right;
            this.game.input.keys.up.hold = this.keys.up;
        }
    }
}