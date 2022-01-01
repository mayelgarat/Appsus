export function NoteColorPalette(props) {
    const { noteId, changeNoteColor } = props
    const colors = [#a6dcd0, #f2dce8, #f8f8b8, #d8b5f6, #c1d7fa, 'yellow']
    // console.log(onChangeNoteStyles);
    return (
        <div className="color-picker-modal">
            {colors.map(color => {
                return (
                    <div
                        onClick={() => changeNoteColor(color)}
                        style={{ backgroundColor: color }}
                        key={color}
                        className="note-color-div"
                    >
                    </div>
                );
            })}
        </div>
    );
}