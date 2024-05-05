import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function CustomDataTable({ columns, rows }) {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      {rows?.length > 0 && (
        <DataGrid
          getRowId={(row) => row._id}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      )}
    </div>
  );
}
