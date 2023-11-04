

const ProgressItem = ({ id, isActive }) => {

const progItemHandler = () =>{
    
}

    return (
        // <div className="progress-item"></div>
        <div 
        onClick={progItemHandler}
        className={isActive ? 'progress-item active' : 'progress-item'}
        >

        </div>
    )
}
export default ProgressItem;