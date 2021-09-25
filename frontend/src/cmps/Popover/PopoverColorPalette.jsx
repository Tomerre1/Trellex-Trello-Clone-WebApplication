import CheckIcon from '@material-ui/icons/Check';

export function PopoverColorPalette({ handleChange, selectedColor }) {

    const colors = [
        '#60bd4f',
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
    


    return <div className="color-palette">
        {colors.map(color => {
            return <label key={color} className="flex align-center justify-center" style={{ background: color }} name="label-color" htmlFor={`color-${color}`}>
                <input type="radio" name="color" id={`color-${color}`} value={color} onClick={handleChange} />
                {selectedColor === colorCode && <CheckIcon key={color} style={{ width: '16px', height: '16px', color: 'white' }} />}
            </label>
        })}
    </div>
}