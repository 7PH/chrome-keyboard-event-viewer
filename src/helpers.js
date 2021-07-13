

export const activate = () => {
    
    const KEY_DECAY = 1000;

    let $node = null;
    let keys = {};
    let blacklist = [];
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
     * Draw the given keys
     * @param {Array<string>} keys
     */
    const update = () => {
        const pressed = Object.keys(keys);
        $node.innerHTML = pressed.map(key => `<div class="keystroke">${formatKey(key)}</div>`).join('');
    };
    
    /**
     * Reset keys
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
     */
    const onKeyDown = event => {
        if (blacklist.indexOf(event.key) !== -1) {
            return;
        }
        clearTimeout(timeout);
        keys[event.key] = true;
        update();
    };
    
    /**
     * When any key is released
     */
    const onKeyUp = event => {
        if (blacklist.indexOf(event.key) !== -1) {
            return;
        }
        clearTimeout(timeout);
        delete keys[event.key];
        timeout = setTimeout(() => {
            update();
        }, KEY_DECAY);
    };

    build();
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', reset);
};
