import CustomCard from "../../components/@global/CustomCard";
import CustomModal from "../../components/@global/CustomModal";

export default function ViewCarDetails({ data, open, setOpen }) {
  console.log("data", data);
  return (
    <CustomModal open={open} setOpen={setOpen}>
      <CustomCard>
        <h1 className="text-3xl mb-5">View Car Details</h1>
        <p className="mb-5">
          Model: <span className="ml-5">{data.model}</span>
        </p>
        <p className="mb-5">
          Make: <span className="ml-5">{data.make}</span>
        </p>
        <p className="flex mb-5">
          Color:
          <div
            className="h-6 w-6 rounded-full ml-5"
            style={{ backgroundColor: data.color }}
          ></div>
        </p>
        <p className="mb-5">
          Registration #:{" "}
          <span className="ml-5">{data.registrationNumber}</span>
        </p>
        <p className="mb-5">
          Type:
          <span className="ml-5">{data?.category?.type}</span>
        </p>
      </CustomCard>
    </CustomModal>
  );
}
