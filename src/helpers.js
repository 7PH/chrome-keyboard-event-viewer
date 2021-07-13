

export const activate = () => {
    
    /**
     * Allows to have a decay time in which the key is still rendered even when not pressed anymore for readibility purposes
     * Keys will decay after this duration in ms
     * @type {number}
     */
    const KEY_DECAY = 1000;

    /**
     * Node which contains the rendered keys
     * @type {HTMLDivElement}
     */
    let $node = null;

    /**
     * Currently pressed keys
     * @type {Object<string, true>}
     */
    let keys = {};

    /**
     * Render timeout uusing KEY_DECAY
     */
    let timeout = null;
    
    /**
     * Build the initial container
     */
    const build = () => {
        document.body.insertAdjacentHTML(
            'beforeend',
            `
                <div id="keystroke-container"></div>
                <style>
                    #keystroke-container {
                        z-index: 10000000000000000000;
                        position: fixed;
                        pointer-events: none;
                        left: calc(50% - 100px);
                        width: 200px;
                        top: -4px;
                        height: 60px;
                        display: flex;
                        justify-content: center;
                        font-size: 200%;
                    }
                    #keystroke-container .keystroke {
                        text-align: center;
                        margin: 6px;
                        padding-left: 10px;
                        padding-right: 10px;
                        height: 30px;
                        border-radius: 4px;
                        color: white;
                        background-color: #333;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        z-index: 10000000000000000000;
                        border: 1px solid white;
                    }
                </style>
            `);
        $node = document.getElementById('keystroke-container');
    };
    
    /**
     * Renders the given keys
     * @param {Array<string>} keys
     */
    const update = () => {
        const pressed = Object.keys(keys);
        $node.innerHTML = pressed.map(key => `<div class="keystroke">${formatKey(key)}</div>`).join('');
    };
    
    /**
     * Format a given key for display purposes
     */
    const formatKey = key => {
        if (key.length === 1) {
            return key.toUpperCase();
        } else {
            return key;
        }
    };
    
    /**
     * Reset keys
     */
    const reset = () => {
        keys = {};
        update();
    };
    
    /**
     * When any key is pressed
     * @param {KeyboardEvent} event
     */
    const onKeyDown = event => {
        clearTimeout(timeout);
        keys[event.key] = true;
        update();
    };
    
    /**
     * When any key is released
     * @param {KeyboardEvent} event
     */
    const onKeyUp = event => {
        clearTimeout(timeout);
        delete keys[event.key];
        timeout = setTimeout(() => {
            update();
        }, KEY_DECAY);
    };

    build();

    /*
     * Bind events to update rendered keys
     */
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', reset);
};
