

const ProgressItem = ({ id, isActive }) => {



    return (
        // <div className="progress-item"></div>
        <div className={isActive ? 'progress-item active' : 'progress-item'}></div>
    )
}
export default ProgressItem;