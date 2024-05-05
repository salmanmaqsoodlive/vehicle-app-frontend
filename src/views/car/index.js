import { useEffect, useState } from "react";
import CarListView from "./carListView";
import { useDispatch } from "react-redux";
import useApi from "../../utils/hooks/useApi";
import { logout } from "../../redux/authReducer";

export default function Car() {
  return (
    <div>
      <h1 className="text-5xl my-5">All Registered Cars</h1>
      <CarListView />
    </div>
  );
}
