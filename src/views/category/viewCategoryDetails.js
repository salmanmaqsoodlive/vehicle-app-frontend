import CustomCard from "../../components/@global/CustomCard";
import CustomModal from "../../components/@global/CustomModal";

export default function ViewCategoryDetails({ data, open, setOpen }) {
  return (
    <CustomModal open={open} setOpen={setOpen}>
      <CustomCard>
        <h1 className="text-3xl mb-5">View Category Details</h1>
        <p className="mb-5">
          Type: <span className="ml-5">{data.type}</span>
        </p>
        <p className="mb-5">
          Description: <span className="ml-5">{data.description}</span>
        </p>
      </CustomCard>
    </CustomModal>
  );
}
