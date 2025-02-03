interface ProgressItemProps {
  id: number;
  isActive: Boolean;
  changeIndexHandler: (newIndex: number) => void;
}

const ProgressItem = ({
  id,
  isActive,
  changeIndexHandler,
}: ProgressItemProps): JSX.Element => {
  const progItemHandler = (id: number) => {
    changeIndexHandler(id);
  };

  return (
    <button
      role="button"
      aria-label={`results page ${id + 1}`}
      aria-current="step"
      onClick={() => progItemHandler(id)}
      className={isActive ? "progress-item active" : "progress-item"}
    ></button>
  );
};

export default ProgressItem;
