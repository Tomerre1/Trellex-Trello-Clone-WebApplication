import CheckIcon from '@material-ui/icons/Check';

export function ColorPalette({ handleChange, selectedColor, isGradient }) {

    const colors = [
        '#61bd4f',
        '#f2d600',
        '#ff9e1a',
        '#eb5a46',
        '#c277e0',
        '#0279bf',
        '#52e898',
        '#ff78cb',
        '#334563',
        '#b3bac5',
    ]

    const gradients = [
        "linear-gradient(to bottom, #000000, #434343)",
        "linear-gradient(to right, #2980b9, #2c3e50)",
        "linear-gradient(to right, #3494e6, #ec6ead)",
        "linear-gradient(to left, #2f7336, #aa3a38)",
        "linear-gradient(to top, #0052d4, #4364f7, #6fb1fc)",
        "linear-gradient(to bottom, #e52d27, #b31217)",
    ]

    return <div className="color-palette">
        {colors.map(colorCode => {
            return <label key={colorCode} className="flex align-center justify-center" style={{ background: colorCode }} name="label-color" htmlFor={`color-${colorCode}`}>
                <input type="radio" name="color" id={`color-${colorCode}`} value={colorCode} onClick={handleChange} />
                {selectedColor === colorCode && <CheckIcon key={colorCode} style={{ width: '16px', height: '16px', color: 'white' }} />}
            </label>
        })}
        {isGradient && gradients.map(gradient => {
            return <label key={gradient} className="flex align-center justify-center" style={{ background: gradient }} name="label-color" htmlFor={`gradient-${gradient}`}>
                <input type="radio" name="color" id={`gradient-${gradient}`} value={gradient} onClick={handleChange} />
                {selectedColor === gradient && <CheckIcon key={gradient} style={{ width: '16px', height: '16px', color: 'white' }} />}
            </label>
        })}
    </div>
}