export interface MealItem extends React.PropsWithChildren {
  timeOfMeal: string;
  description: string;
  calories: number;
  onDelete: (e: React.MouseEvent) => void;
  onEdit: (e: React.MouseEvent) => void;
  isDeleteLoading: boolean;
}
const MealItem: React.FC<MealItem> = ({
  timeOfMeal,
  description,
  calories,
  onDelete,
  onEdit,
  children,
  isDeleteLoading,
}) => {
  return (
    <div className="d-flex gap-2 mt-3 align-items-center border border-1 p-4 fs-3">
      <div className="col-7 text-start">
        <div className="mb-3 text-secondary">{timeOfMeal}</div>
        <div>{description}</div>
      </div>
      <div className="col-3 text-end me-auto">
        <strong>{calories} kkal</strong>
      </div>
      <div className="me-3">
        <button
          type="button"
          onClick={onEdit}
          className="d-block mb-2 button-edit buttons-ic "
        ></button>
        <button
          type="button"
          onClick={onDelete}
          className="d-block button-reset buttons-ic d-flex align-items-center pe-0"
          disabled={isDeleteLoading}
        >
          {children}
        </button>
      </div>
    </div>
  );
};

export default MealItem;
