
const ListPanelButton = ({listButton, setListButton}) => {

    const openListPanel = () => {
        listButton ? setListButton(false) : setListButton(true)
    }

    return (
        <>
            <button className='listPanelToggle' onClick={openListPanel}>
                <div className={listButton ? 'line1Active spinner diagonal part-1' : 'spinner diagonal part-1'}></div>
                <div className={listButton ? 'diagonalActive spinner horizontal' : 'spinner horizontal'}></div>
                <div className={listButton ? 'line2Active spinner diagonal part-2' : 'spinner diagonal part-2'}></div>
                <div className='listLabel'><h4>movie Lists</h4></div>
            </button>
        </>
    )
}


export default ListPanelButton;